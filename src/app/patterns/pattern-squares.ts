export default function PatternSquares(
  hover: boolean,
  color: string = "#A274FF",
  disableAccessibility: boolean = false
): CanvasPattern {
  const patternCanvas: HTMLCanvasElement = document.createElement("canvas");
  const ctx: CanvasRenderingContext2D | null = patternCanvas.getContext("2d");
  if (!ctx) {
    return new CanvasPattern();
  }

  const patternSize = 50;
  const squareSize = patternSize * 0.15;

  patternCanvas.width = patternSize;
  patternCanvas.height = patternSize;

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
    ctx.globalAlpha = 0.7;
    ctx.fillStyle = color;
    ctx.lineWidth = 0.006 * patternSize;
    ctx.rect(0.5 * patternSize, 0.0, squareSize, squareSize);
    ctx.fill();

    // #rect54
    ctx.beginPath();
    ctx.globalAlpha = 0.7;
    ctx.fillStyle = color;
    ctx.lineWidth = 0.006 * patternSize;
    ctx.rect(0.75 * patternSize, patternSize / 2, squareSize, squareSize);
    ctx.fill();

    // #rect104
    ctx.beginPath();
    ctx.globalAlpha = 0.3;
    ctx.fillStyle = color;
    ctx.lineWidth = 0.006 * patternSize;
    ctx.rect(0.0, 0.0, squareSize, squareSize);
    ctx.fill();

    // #rect154
    ctx.beginPath();
    ctx.globalAlpha = 0.3;
    ctx.fillStyle = color;
    ctx.lineWidth = 0.006 * patternSize;
    ctx.rect(0.25 * patternSize, patternSize / 2, squareSize, squareSize);
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
  // Create our primary canvas and fill it with the pattern
  const canvas: HTMLCanvasElement = document.createElement("canvas");
  const context: CanvasRenderingContext2D | null = canvas.getContext("2d");
  if (!context) {
    return new CanvasPattern();
  }
  const pattern: CanvasPattern | null = context.createPattern(
    patternCanvas,
    "repeat"
  );
  if (!pattern) {
    return new CanvasPattern();
  }

  return pattern;
}
