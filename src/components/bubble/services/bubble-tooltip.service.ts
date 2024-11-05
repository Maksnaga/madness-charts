import { Injectable } from "@angular/core";
import {
  Context,
  GenericTooltipService,
} from "../../../services/generic-tooltip.service";

export type BubbleTooltipLine = {
  label: string;
  value: string;
  unit: string;
};
const tooltipLineStyle =
  "background: white; border-bottom: 1px solid #CCCCCC; border-radius: 5px; padding: 10px 20px";

@Injectable({
  providedIn: "root",
})
export class BubbleTooltipService extends GenericTooltipService {
  fontProperties = "font-family: Arial; font-size: 16px";

  public createBubbleTooltip(
    context: Context,
    lines: BubbleTooltipLine[],
    title: string
  ) {
    if (!title || title === "") {
      return;
    }
    let tooltipEl = document.querySelector(
      "#chartjs-tooltip"
    ) as HTMLElement | null;
    if (!tooltipEl) {
      tooltipEl = this.createNewTooltipElement();
    }
    const tooltipModel = context.tooltip;
    if (tooltipModel.opacity === 0) {
      tooltipEl.style.opacity = "0";
      return;
    }
    if (tooltipModel.body) {
      this.titleLines = tooltipModel.title || [];
      const bodyLines = tooltipModel.body.map(this.getBody);
      const body = bodyLines[0];
      this.addBubbleLegendToDom(lines, body, tooltipEl, title);
    }
    this.handleTooltipPosition(context, tooltipModel, tooltipEl);
  }

  public addBubbleLegendToDom(
    lines: BubbleTooltipLine[],
    body: Array<string>,
    tooltipEl: HTMLElement,
    title: string
  ) {
    const legendText = body[0].split(":")[0];
    const spanText = `<span style="${this.fontProperties}">${title}</span>`;
    let innerHtml = `<div style="${tooltipLineStyle}; font-weight: bold" class="tooltipTitle">${spanText}</div>`;
    const innerHtmlToAdd = this.getBubbleInnerHtml(lines);
    innerHtml += innerHtmlToAdd;
    const tableRoot = tooltipEl?.querySelector(".tooltipCtn") as HTMLElement;
    tableRoot.innerHTML = innerHtml;
  }

  public getBubbleInnerHtml(lines: BubbleTooltipLine[]): string {
    let innerLinesHtml = "";
    lines.forEach((line) => {
      innerLinesHtml += `<div style="${this.fontProperties}; ${tooltipLineStyle}; display:flex; justify-content: space-between;">`;
      innerLinesHtml += `<div>${line.label}</div>`;
      innerLinesHtml += `<div>${line.value}${line.unit}</div>`;
      innerLinesHtml += `</div>`;
    });
    return `<div>${innerLinesHtml}</div>`;
  }
}
