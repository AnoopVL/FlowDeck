import { Shape } from "./shapeUtils";

export function renderShapes(
  ctx: CanvasRenderingContext2D,
  shapes: Shape[],
  selectedShape?: Shape | null
) {
  // This will clear the canvas with black background
  ctx.fillStyle = "rgba(0,0,0)";
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  //   Below thing is to render shapes
  shapes.forEach((shape) => {
    ctx.strokeStyle = "rgba(255, 255, 255)";
    ctx.fillStyle = "white";

    switch (shape.type) {
      case "rect":
        ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
        break;
      case "circle":
        ctx.beginPath();
        ctx.arc(
          shape.centerX,
          shape.centerY,
          Math.abs(shape.radius),
          0,
          Math.PI * 2
        );
        ctx.stroke();
        ctx.closePath();
        break;
      case "arrow":
        drawArrow(ctx, shape.startX, shape.startY, shape.endX, shape.endY);
        break;
      case "text":
        ctx.font = `${shape.fontSize}px Arial`;
        ctx.fillText(shape.content, shape.x, shape.y);
        break;
    }
  });

  //   This Highlights the selected shape
  if (selectedShape) {
    ctx.strokeStyle = "rgba(0, 255, 0, 0.5)";
    ctx.lineWidth = 2;
    switch (selectedShape.type) {
      case "rect":
        ctx.strokeRect(
          selectedShape.x - 5,
          selectedShape.y - 5,
          selectedShape.width + 10,
          selectedShape.height + 10
        );
        break;
      case "circle":
        ctx.beginPath();
        ctx.arc(
          selectedShape.centerX,
          selectedShape.centerY,
          selectedShape.radius + 5,
          0,
          Math.PI * 2
        );
        ctx.stroke();
        ctx.closePath();
        break;
      case "arrow":
        drawArrow(
          ctx,
          selectedShape.startX,
          selectedShape.startY,
          selectedShape.endX,
          selectedShape.endY
        );
        break;
      case "text":
        ctx.font = `${selectedShape.fontSize}px Arial`;
        const textWidth = ctx.measureText(selectedShape.content).width;
        ctx.strokeRect(
          selectedShape.x - 5,
          selectedShape.y - selectedShape.fontSize,
          textWidth + 10,
          selectedShape.fontSize + 10
        );
        break;
    }
  }
}

function drawArrow(
  ctx: CanvasRenderingContext2D,
  startX: number,
  startY: number,
  endX: number,
  endY: number
) {
  const headLength = 10;
  /**
   * Calculates the angle between two points.
   *
   * @param startX - The x-coordinate of the starting point.
   * @param startY - The y-coordinate of the starting point.
   * @param endX - The x-coordinate of the ending point.
   * @param endY - The y-coordinate of the ending point.
   * @returns The angle in radians between the two points.
   */
  const angle = Math.atan2(endY - startY, endX - startX);

  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(endX, endY);

  ctx.lineTo(
    endX - headLength * Math.cos(angle - Math.PI / 6),
    endY - headLength * Math.sin(angle - Math.PI / 6)
  );
  ctx.moveTo(endX, endY);
  ctx.lineTo(
    endX - headLength * Math.cos(angle + Math.PI / 6),
    endY - headLength * Math.sin(angle + Math.PI / 6)
  );

  ctx.stroke();
  ctx.closePath();
}
