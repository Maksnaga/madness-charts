import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class PatternService {
  constructor() {}

  getPatternCanvas(
    pattern: CanvasPattern,
    width = 50,
    height = 50
  ): HTMLCanvasElement {
    const canvas: HTMLCanvasElement = document.createElement("canvas");
    const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");
    if (!ctx) {
      return canvas;
    }
    canvas.width = width;
    canvas.height = height;
    ctx.fillStyle = pattern;
    ctx.fillRect(0, 0, width, height);
    return canvas;
  }

  getPatternIndexWithShift(
    dataSetIndex: number,
    patternShifting?: number
  ): number {
    return (
      (patternShifting ? dataSetIndex + patternShifting : dataSetIndex) % 6
    );
  }
}
