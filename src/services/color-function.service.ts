import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ColorFunctionsService {
  constructor() {}

  /**
   * Adds alpha transparency to a color.
   * @param color The color in hex format (e.g., '#FF5733').
   * @param opacity The opacity value between 0 and 1.
   * @returns The color with the added alpha value as a hex code (e.g., '#FF573380').
   */
  addAlpha(color: string, opacity: number): string {
    const _opacity = Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255);
    return color + _opacity.toString(16).toUpperCase();
  }
}
