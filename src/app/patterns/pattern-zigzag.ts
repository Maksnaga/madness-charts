export default function PatternZigzag(
  hover: boolean,
  color: string = "#00A3B2",
  disableAccessibility: boolean = false
): CanvasPattern {
  const canvasPattern: HTMLCanvasElement = document.createElement("canvas");
  const ctx: CanvasRenderingContext2D | null = canvasPattern.getContext("2d");
  if (!ctx) {
    return new CanvasPattern();
  }

  const patternSize = 50;

  canvasPattern.width = patternSize;
  canvasPattern.height = patternSize;

  if (disableAccessibility === true) {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.rect(0.0, 0.0, patternSize, patternSize);
    ctx.fill();
  } else {
    // background
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

    // #path4
    ctx.beginPath();
    ctx.globalAlpha = 0.7;
    ctx.strokeStyle = color;
    ctx.lineWidth = 0.08 * patternSize;
    ctx.moveTo(-patternSize / 2, patternSize / 2);
    ctx.lineTo(0.0, 0.0);
    ctx.lineTo(patternSize / 2, patternSize / 2);
    ctx.lineTo(patternSize, 0.0);
    ctx.stroke();

    // #path6
    ctx.beginPath();
    ctx.globalAlpha = 0.3;
    ctx.strokeStyle = color;
    ctx.lineWidth = 0.08 * patternSize;
    ctx.moveTo(-patternSize / 2, patternSize);
    ctx.lineTo(0.0, patternSize / 2);
    ctx.lineTo(patternSize / 2, patternSize);
    ctx.lineTo(patternSize, patternSize / 2);
    ctx.lineTo(patternSize + patternSize / 2, patternSize);
    ctx.stroke();

    // #path6-6
    ctx.beginPath();
    ctx.globalAlpha = 0.3;
    ctx.strokeStyle = color;
    ctx.lineWidth = 0.08 * patternSize;
    ctx.moveTo(-patternSize / 2, 0.000111);
    ctx.lineTo(0.000004 * patternSize, -patternSize / 2);
    ctx.lineTo(patternSize / 2, 0.000111);
    ctx.lineTo(patternSize, -patternSize / 2);
    ctx.lineTo(patternSize + patternSize / 2, 0.000111);
    ctx.stroke();

    // #path6-5
    ctx.beginPath();
    ctx.globalAlpha = 0.7;
    ctx.strokeStyle = color;
    ctx.lineWidth = 0.08 * patternSize;
    ctx.moveTo(-patternSize / 2, patternSize + patternSize / 2);
    ctx.lineTo(0.0, patternSize);
    ctx.lineTo(patternSize / 2, patternSize + patternSize / 2);
    ctx.lineTo(patternSize, patternSize);
    ctx.lineTo(patternSize + patternSize / 2, patternSize + patternSize / 2);
    ctx.stroke();
  }

  // Hover Style
  if (hover) {
    ctx.beginPath();
    ctx.globalAlpha = 0.5;
    ctx.fillStyle = "#FFFFFF";
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

  return pattern;
}
