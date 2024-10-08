export default function PatternCircles(
  hover: boolean,
  color: string = "#095359",
  disableAccessibility: boolean = false
): CanvasPattern {
  const canvasPattern: HTMLCanvasElement = document.createElement("canvas");
  const ctx: CanvasRenderingContext2D | null = canvasPattern.getContext("2d");

  if (!ctx) {
    return new CanvasPattern();
  }

  const patternSize = 50;
  const lineWidthPattern = 0.04 * patternSize;

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
    ctx.lineWidth = 0.1005 * patternSize;
    ctx.rect(0.0, 0.0, patternSize, patternSize);
    ctx.fill();
    ctx.beginPath();
    ctx.globalAlpha = 0.1;
    ctx.fillStyle = color;
    ctx.lineWidth = 0.1005 * patternSize;
    ctx.rect(0.0, 0.0, patternSize, patternSize);
    ctx.fill();

    // #circle4
    ctx.beginPath();
    ctx.globalAlpha = 0.3;
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidthPattern;
    ctx.arc(
      lineWidthPattern + 0.06 * patternSize,
      lineWidthPattern + 0.06 * patternSize,
      0.06 * patternSize,
      0,
      2 * Math.PI
    );
    ctx.stroke();

    // #circle6
    ctx.beginPath();
    ctx.globalAlpha = 0.7;
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidthPattern;
    ctx.arc(
      lineWidthPattern + 0.56 * patternSize,
      lineWidthPattern + 0.06 * patternSize,
      0.06 * patternSize,
      0,
      2 * Math.PI
    );
    ctx.stroke();

    // #circle104
    ctx.beginPath();
    ctx.globalAlpha = 0.3;
    ctx.strokeStyle = color;
    ctx.lineWidth = 0.04 * patternSize;
    ctx.arc(
      -lineWidthPattern + 0.44 * patternSize,
      lineWidthPattern + 0.56 * patternSize,
      0.06 * patternSize,
      0,
      2 * Math.PI
    );
    ctx.stroke();

    // #circle106
    ctx.beginPath();
    ctx.globalAlpha = 0.7;
    ctx.strokeStyle = color;
    ctx.lineWidth = 0.04 * patternSize;
    ctx.arc(
      -lineWidthPattern + 0.94 * patternSize,
      lineWidthPattern + 0.56 * patternSize,
      0.06 * patternSize,
      0,
      2 * Math.PI
    );
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

  context.fillStyle = pattern;
  context.fillRect(0, 0, canvas.width, canvas.height);

  return pattern;
}
