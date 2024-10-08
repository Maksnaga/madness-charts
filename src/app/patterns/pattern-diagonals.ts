export default function PatternDiagonals(
  hover: boolean,
  color: string = "#143666",
  disableAccessibility: boolean = false
): CanvasPattern {
  const patternCanvas: HTMLCanvasElement = document.createElement("canvas");
  const ctx: CanvasRenderingContext2D | null = patternCanvas.getContext("2d");
  if (!ctx) {
    return new CanvasPattern();
  }

  const patternSize = 50;

  patternCanvas.width = patternSize;
  patternCanvas.height = patternSize;

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

    // #rect2744
    ctx.save();
    ctx.beginPath();
    ctx.transform(0.708293, 0.705919, -0.666352, 0.745637, 0.0, 0.0);
    ctx.globalAlpha = 0.7;
    ctx.fillStyle = color;
    ctx.lineWidth = 0.075 * patternSize;
    ctx.miterLimit = 4;
    ctx.rect(
      -patternSize * 0.03,
      -0.01 * patternSize,
      patternSize + patternSize / 2,
      0.04 * patternSize
    );
    ctx.fill();
    ctx.restore();

    // #rect2744-5
    ctx.save();
    ctx.beginPath();
    ctx.transform(0.708293, 0.705919, -0.666352, 0.745637, 0.0, 0.0);
    ctx.globalAlpha = 0.3;
    ctx.fillStyle = color;
    ctx.lineWidth = 0.075 * patternSize;
    ctx.miterLimit = 4;
    ctx.rect(
      0.29 * patternSize,
      0.33 * patternSize,
      patternSize + patternSize / 2,
      0.04 * patternSize
    );
    ctx.fill();
    ctx.restore();

    // #rect2744-5-3
    ctx.save();
    ctx.beginPath();
    ctx.transform(0.708293, 0.705919, -0.666352, 0.745637, 0.0, 0.0);
    ctx.globalAlpha = 0.7;
    ctx.fillStyle = color;
    ctx.lineWidth = 0.075 * patternSize;
    ctx.miterLimit = 4;
    ctx.rect(
      0.63 * patternSize,
      0.69 * patternSize,
      patternSize + patternSize / 2,
      0.04 * patternSize
    );
    ctx.fill();
    ctx.restore();

    // #rect2744-6
    ctx.save();
    ctx.beginPath();
    ctx.transform(0.708293, 0.705919, -0.666352, 0.745637, 0.0, 0.0);
    ctx.globalAlpha = 0.3;
    ctx.fillStyle = color;
    ctx.lineWidth = 0.075 * patternSize;
    ctx.miterLimit = 4;
    ctx.rect(
      0.33 * patternSize,
      -0.37 * patternSize,
      patternSize + patternSize / 2,
      0.04 * patternSize
    );
    ctx.fill();
    ctx.restore();

    // #rect2744-6-7
    ctx.save();
    ctx.beginPath();
    ctx.transform(0.708293, 0.705919, -0.666352, 0.745637, 0.0, 0.0);
    ctx.globalAlpha = 0.7;
    ctx.fillStyle = color;
    ctx.lineWidth = 0.075 * patternSize;
    ctx.miterLimit = 4;
    ctx.rect(
      0.71 * patternSize,
      -0.72 * patternSize,
      patternSize + patternSize / 2,
      0.04 * patternSize
    );
    ctx.fill();
    ctx.restore();
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
