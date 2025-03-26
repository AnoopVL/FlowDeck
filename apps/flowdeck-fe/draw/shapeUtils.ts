export type Shape =
  | {
      type: "rect";
      x: number;
      y: number;
      width: number;
      height: number;
      id?: string;
    }
  | {
      type: "circle";
      centerX: number;
      centerY: number;
      radius: number;
      id?: string;
    }
  | {
      type: "arrow";
      startX: number;
      startY: number;
      endX: number;
      endY: number;
      id?: string;
    }
  | {
      type: "text";
      x: number;
      y: number;
      content: string;
      fontSize: number;
      id?: string;
    }
  | { type: "eraser"; x: number; y: number; size: number };

export function findShapeAtPoint(
  shapes: Shape[],
  x: number,
  y: number
): Shape | null {
  for (const shape of shapes.slice().reverse()) {
    switch (shape.type) {
      case "rect":
        if (
          x >= shape.x &&
          x <= shape.x + shape.width &&
          y >= shape.y &&
          y <= shape.y + shape.height
        )
          return shape;
        break;
      case "circle":
        const dx = x - shape.centerX;
        const dy = y - shape.centerY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance <= shape.radius) return shape;
        break;
      case "text":
        // Approximate text hit area
        if (
          x >= shape.x &&
          x <= shape.x + shape.content.length * 10 &&
          y >= shape.y - 20 &&
          y <= shape.y
        )
          return shape;
        break;
      case "arrow":
        // Simple point-to-line distance calculation
        const { startX, startY, endX, endY } = shape;
        const A = x - startX;
        const B = y - startY;
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
        const distanceToLine = Math.sqrt(
          Math.pow(x - xx, 2) + Math.pow(y - yy, 2)
        );
        if (distanceToLine <= 10) return shape;
        break;
    }
  }
  return null;
}

export function eraseShapes(
  shapes: Shape[],
  x: number,
  y: number,
  size: number = 20
): {
  remainingShapes: Shape[];
  erasedShapes: Shape[];
} {
  const erasedShapes: Shape[] = [];
  const remainingShapes = shapes.filter((shape) => {
    const isErased = isShapeErased(shape, x, y, size);
    if (isErased) {
      erasedShapes.push(shape);
      return false;
    }
    return true;
  });

  return { remainingShapes, erasedShapes };
}

function isShapeErased(
  shape: Shape,
  eraserX: number,
  eraserY: number,
  eraserSize: number
): boolean {
  switch (shape.type) {
    case "rect":
      return isRectErased(shape, eraserX, eraserY, eraserSize);
    case "circle":
      return isCircleErased(shape, eraserX, eraserY, eraserSize);
    case "arrow":
      return isArrowErased(shape, eraserX, eraserY, eraserSize);
    case "text":
      return isTextErased(shape, eraserX, eraserY, eraserSize);
    default:
      return false;
  }
}

function isRectErased(
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

function isCircleErased(
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

function isArrowErased(
  arrow: Shape & { type: "arrow" },
  eraserX: number,
  eraserY: number,
  eraserSize: number
): boolean {
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

function isTextErased(
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

export function moveShape(shape: Shape, dx: number, dy: number): Shape {
  switch (shape.type) {
    case "rect":
      return { ...shape, x: shape.x + dx, y: shape.y + dy };
    case "circle":
      return {
        ...shape,
        centerX: shape.centerX + dx,
        centerY: shape.centerY + dy,
      };
    case "text":
      return { ...shape, x: shape.x + dx, y: shape.y + dy };
    case "arrow":
      return {
        ...shape,
        startX: shape.startX + dx,
        startY: shape.startY + dy,
        endX: shape.endX + dx,
        endY: shape.endY + dy,
      };
    default:
      return shape;
  }
}
