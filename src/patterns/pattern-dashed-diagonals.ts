export default function PatternDashedDiagonals(
  hover: boolean,
  color: string = "#F255A3",
  disableAccessibility: boolean = false
): CanvasPattern {
  const canvasPattern: HTMLCanvasElement = document.createElement("canvas");
  const ctx: CanvasRenderingContext2D | null = canvasPattern.getContext("2d");

  if (!ctx) {
    return new CanvasPattern();
  }

  const matrix = new DOMMatrix();

  const patternSize = 21;
  const lineWidth = 0.1 * patternSize;

  canvasPattern.width = patternSize;
  canvasPattern.height = patternSize;

  if (disableAccessibility === true) {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.rect(0.0, 0.0, patternSize, patternSize);
    ctx.fill();
  } else {
    // Background
    ctx.beginPath();
    ctx.fillStyle = "#FFFFFF";
    ctx.lineWidth = 0.005 * patternSize;
    ctx.rect(0.0, 0.0, patternSize, patternSize);
    ctx.fill();
    ctx.beginPath();
    ctx.globalAlpha = 0.1;
    ctx.fillStyle = color;
    ctx.lineWidth = 0.005 * patternSize;
    ctx.rect(0.0, 0.0, patternSize, patternSize);
    ctx.fill();

    // #path991
    ctx.beginPath();
    ctx.globalAlpha = 0.3;
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.moveTo(lineWidth, 0);
    ctx.lineTo(lineWidth, 0.5 * patternSize);
    ctx.stroke();

    // #path991
    ctx.beginPath();
    ctx.globalAlpha = 0.7;
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.moveTo(patternSize / 2 + lineWidth, 0);
    ctx.lineTo(patternSize / 2 + lineWidth, 0.5 * patternSize);
    ctx.stroke();
  }

  // Hover Style
  if (hover) {
    ctx.beginPath();
    ctx.fillStyle = "#FFFFFF";
    ctx.globalAlpha = 0.5;
    ctx.lineWidth = 0.006 * patternSize;
    ctx.rect(0.0, 0.0, patternSize, patternSize);
    ctx.fill();
  }

  const canvas: HTMLCanvasElement = document.createElement("canvas");
  const context: CanvasRenderingContext2D | null = canvas.getContext("2d");
  if (!context) {
    return new CanvasPattern();
  }
  const pattern: CanvasPattern | null = context.createPattern(
    canvasPattern,
    "repeat"
  );
  if (!pattern) {
    return new CanvasPattern();
  }

  context.fillStyle = pattern;
  context.fillRect(0, 0, canvas.width, canvas.height);
  pattern.setTransform(matrix.rotate(45));

  return pattern;
}
