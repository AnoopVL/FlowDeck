import { Tool } from "@/components/Canvas";
import { getExistingShapes } from "./http";

type Shape =
  | { type: "rect"; x: number; y: number; width: number; height: number }
  | { type: "circle"; centerX: number; centerY: number; radius: number }
  | {
      type: "arrow";
      startX: number;
      startY: number;
      endX: number;
      endY: number;
    }
  | {
      fontSize: any;
      type: "text";
      x: number;
      y: number;
      content: string;
    }
  | { type: "eraser"; x: number; y: number; size: number };

export class Game {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private existingShapes: Shape[];
  private roomId: string;
  private clicked: boolean;
  private startX = 0;
  private startY = 0;
  private selectedTool: Tool = "circle";
  private textSize = 16;

  socket: WebSocket;

  constructor(canvas: HTMLCanvasElement, roomId: string, socket: WebSocket) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d")!;
    this.existingShapes = [];
    this.roomId = roomId;
    this.socket = socket;
    this.clicked = false;
    this.init();
    this.initHandlers();
    this.initMouseHandlers();
  }

  destroy() {
    this.canvas.removeEventListener("mousedown", this.mouseDownHandler);

    this.canvas.removeEventListener("mouseup", this.mouseUpHandler);

    this.canvas.removeEventListener("mousemove", this.mouseMoveHandler);
  }

  setTool(
    tool: "circle" | "arrow" | "rect" | "eraser" | "text",
    textSize = 30
  ) {
    this.selectedTool = tool;
    if (tool === "text") {
      this.textSize = textSize;
    }
  }

  async init() {
    this.existingShapes = await getExistingShapes(this.roomId);
    console.log(this.existingShapes);
    this.clearCanvas();
  }
  // UPdated init handler
  initHandlers() {
    this.socket.onmessage = (event) => {
      const message = JSON.parse(event.data);

      if (message.type === "chat") {
        const parsedShape = JSON.parse(message.message);
        this.existingShapes.push(parsedShape.shape);
        this.clearCanvas();
      } else if (message.type === "erase") {
        const parsedEraseMessage = JSON.parse(message.message);
        const erasedShapeIds = parsedEraseMessage.shapes.map((shape: Shape) =>
          JSON.stringify(shape)
        );
        // Remove erased shapes from existing shapes
        this.existingShapes = this.existingShapes.filter(
          (shape) => !erasedShapeIds.includes(JSON.stringify(shape))
        );
        this.clearCanvas();
      }
    };
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = "rgba(0, 0, 0)";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.existingShapes.map((shape) => {
      this.ctx.strokeStyle = "rgba(255, 255, 255)";
      if (shape.type === "rect") {
        this.ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
      } else if (shape.type === "circle") {
        this.ctx.beginPath();
        this.ctx.arc(
          shape.centerX,
          shape.centerY,
          Math.abs(shape.radius),
          0,
          Math.PI * 2
        );
        this.ctx.stroke();
        this.ctx.closePath();
      } else if (shape.type === "arrow") {
        this.drawArrow(shape.startX, shape.startY, shape.endX, shape.endY);
      } else if (shape.type === "text") {
        this.ctx.font = `${shape.fontSize}px Arial`;
        this.ctx.fillStyle = "white";
        this.ctx.fillText(shape.content, shape.x, shape.y);
      }
    });
  }

  drawArrow(startX: number, startY: number, endX: number, endY: number) {
    const headLength = 10; // Arrowhead size
    const angle = Math.atan2(endY - startY, endX - startX);

    this.ctx.beginPath();
    this.ctx.moveTo(startX, startY);
    this.ctx.lineTo(endX, endY);

    this.ctx.lineTo(
      endX - headLength * Math.cos(angle - Math.PI / 6),
      endY - headLength * Math.sin(angle - Math.PI / 6)
    );
    this.ctx.moveTo(endX, endY);
    this.ctx.lineTo(
      endX - headLength * Math.cos(angle + Math.PI / 6),
      endY - headLength * Math.sin(angle + Math.PI / 6)
    );

    this.ctx.stroke();
  }

  mouseDownHandler = (e: { clientX: number; clientY: number }) => {
    this.clicked = true;
    this.startX = e.clientX;
    this.startY = e.clientY;
  };

  mouseUpHandler = (e: { clientX: number; clientY: number }) => {
    this.clicked = false;
    const width = e.clientX - this.startX;
    const height = e.clientY - this.startY;

    let shape: Shape | null = null;
    if (this.selectedTool === "rect") {
      shape = { type: "rect", x: this.startX, y: this.startY, width, height };
    } else if (this.selectedTool === "circle") {
      const radius = Math.max(width, height) / 2;
      shape = {
        type: "circle",
        centerX: this.startX + radius,
        centerY: this.startY + radius,
        radius,
      };
    } else if (this.selectedTool === "arrow") {
      shape = {
        type: "arrow",
        startX: this.startX,
        startY: this.startY,
        endX: e.clientX,
        endY: e.clientY,
      };
    } else if (this.selectedTool === "text") {
      const text = prompt("Enter text:") || "Sample Text";
      shape = {
        type: "text",
        x: this.startX,
        y: this.startY,
        content: text,
        fontSize: this.textSize,
      };
    } else if (this.selectedTool === "eraser") {
      // Erase functionality
      const erasedShapes = this.eraseShapes(this.startX, this.startY);

      // Send erased shapes to other users
      if (erasedShapes.length > 0) {
        this.socket.send(
          JSON.stringify({
            type: "erase",
            message: JSON.stringify({ shapes: erasedShapes }),
            roomId: this.roomId,
          })
        );
      }

      return;
    }
    if (!shape) return;
    this.existingShapes.push(shape);
    this.socket.send(
      JSON.stringify({
        type: "chat",
        message: JSON.stringify({ shape }),
        roomId: this.roomId,
      })
    );
  };

  mouseMoveHandler = (e: { clientX: number; clientY: number }) => {
    if (this.clicked) {
      const width = e.clientX - this.startX;
      const height = e.clientY - this.startY;
      this.clearCanvas();
      this.ctx.strokeStyle = "rgba(255, 255, 255)";
      const selectedTool = this.selectedTool;
      console.log(selectedTool);
      if (selectedTool === "rect") {
        this.ctx.strokeRect(this.startX, this.startY, width, height);
      } else if (selectedTool === "circle") {
        const radius = Math.max(width, height) / 2;
        const centerX = this.startX + radius;
        const centerY = this.startY + radius;
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, Math.abs(radius), 0, Math.PI * 2);
        this.ctx.stroke();
        this.ctx.closePath();
      }
    }
  };

  // New method to handle shape erasing
  private eraseShapes(x: number, y: number, size: number = 20): Shape[] {
    const erasedShapes: Shape[] = [];
    // Filter out shapes that intersect with the eraser
    this.existingShapes = this.existingShapes.filter((shape) => {
      const isErased = this.isShapeErased(shape, x, y, size);
      if (isErased) {
        erasedShapes.push(shape);
        return false;
      }
      return true;
    });
    // Redraw the canvas without the erased shapes
    this.clearCanvas();
    return erasedShapes;
  }
  // Helper method to determine if a shape is erased
  private isShapeErased(
    shape: Shape,
    eraserX: number,
    eraserY: number,
    eraserSize: number
  ): boolean {
    switch (shape.type) {
      case "rect":
        return this.isRectErased(shape, eraserX, eraserY, eraserSize);
      case "circle":
        return this.isCircleErased(shape, eraserX, eraserY, eraserSize);
      case "arrow":
        return this.isArrowErased(shape, eraserX, eraserY, eraserSize);
      case "text":
        return this.isTextErased(shape, eraserX, eraserY, eraserSize);
      default:
        return false;
    }
  }
  // Collision detection methods for different shape types
  private isRectErased(
    rect: Shape & { type: "rect" },
    eraserX: number,
    eraserY: number,
    eraserSize: number
  ): boolean {
    return (
      eraserX >= rect.x &&
      eraserX <= rect.x + rect.width &&
      eraserY >= rect.y &&
      eraserY <= rect.y + rect.height
    );
  }
  private isCircleErased(
    circle: Shape & { type: "circle" },
    eraserX: number,
    eraserY: number,
    eraserSize: number
  ): boolean {
    const dx = eraserX - circle.centerX;
    const dy = eraserY - circle.centerY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance <= circle.radius;
  }
  private isArrowErased(
    arrow: Shape & { type: "arrow" },
    eraserX: number,
    eraserY: number,
    eraserSize: number
  ): boolean {
    // Simple point-to-line distance calculation
    const { startX, startY, endX, endY } = arrow;
    const A = eraserX - startX;
    const B = eraserY - startY;
    const C = endX - startX;
    const D = endY - startY;
    const dot = A * C + B * D;
    const lenSq = C * C + D * D;
    let param = -1;
    if (lenSq !== 0) {
      param = dot / lenSq;
    }
    let xx, yy;
    if (param < 0) {
      xx = startX;
      yy = startY;
    } else if (param > 1) {
      xx = endX;
      yy = endY;
    } else {
      xx = startX + param * C;
      yy = startY + param * D;
    }
    const dx = eraserX - xx;
    const dy = eraserY - yy;
    return Math.sqrt(dx * dx + dy * dy) <= eraserSize / 2;
  }
  private isTextErased(
    text: Shape & { type: "text" },
    eraserX: number,
    eraserY: number,
    eraserSize: number
  ): boolean {
    return (
      eraserX >= text.x &&
      eraserX <= text.x + text.content.length * 10 && // Approximate text width
      eraserY >= text.y - 20 && // Approximate text height
      eraserY <= text.y
    );
  }

  initMouseHandlers() {
    this.canvas.addEventListener("mousedown", this.mouseDownHandler);

    this.canvas.addEventListener("mouseup", this.mouseUpHandler);

    this.canvas.addEventListener("mousemove", this.mouseMoveHandler);
  }
}
