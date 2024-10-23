export default function PatternVerticalLines(
  hover: boolean,
  color: string = "#8C1551",
  disableAccessibility: boolean = false
): CanvasPattern {
  const canvasPattern: HTMLCanvasElement = document.createElement("canvas");
  const ctx: CanvasRenderingContext2D | null = canvasPattern.getContext("2d");
  if (!ctx) {
    return new CanvasPattern();
  }

  const patternSize = 50;
  const lineSize = patternSize * 0.15;

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

    // #rect4
    ctx.beginPath();
    ctx.globalAlpha = 0.3;
    ctx.fillStyle = color;
    ctx.lineWidth = 0.005 * patternSize;
    ctx.rect(0.0, 0.0, lineSize, patternSize);
    ctx.fill();

    // #rect6
    ctx.beginPath();
    ctx.globalAlpha = 0.7;
    ctx.fillStyle = color;
    ctx.lineWidth = 0.005 * patternSize;
    ctx.rect(patternSize / 2, 0.0, lineSize, patternSize);
    ctx.fill();
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

  context.fillStyle = pattern;
  context.fillRect(0, 0, patternSize, patternSize);

  return pattern;
}
