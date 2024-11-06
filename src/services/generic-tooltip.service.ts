import { Injectable } from "@angular/core";
import { TooltipChartType } from "../types/tooltip-chart-type";
import { PatternService } from "./pattern.service";

type BodyItem = {
  after: string[];
  before: string[];
  lines: string[];
};

export type TooltipElements = {
  chartType: TooltipChartType;
  firstLineLabel?: string;
  secondLineLabel?: string;
  patternShifting?: number;
};

type LabelColors = {
  backgroundColor: unknown;
  borderColor: unknown;
};

type PointStyle = {
  pointStyle: unknown;
  rotation: number;
};

export type Context = {
  chart: {
    canvas: HTMLElement;
    tooltip?: {
      x: number;
      y: number;
    };
  };
  replay?: unknown;
  tooltip: {
    dataPoints: {
      dataset?: {
        type?: string;
      };
      dataIndex?: number;
      datasetIndex?: number;
      raw: any;
    }[];
    opacity: number;
    body: {
      after: string[];
      before: string[];
      lines: string[];
    }[];
    title: string[];
    labelColors: Array<LabelColors>;
    labelPointStyles: Array<PointStyle>;
    caretX: number;
    caretY: number;
  };
};

@Injectable({
  providedIn: "root",
})
export class GenericTooltipService {
  chartType = "";
  datasetIndex = 0;
  dataIndex = 0;
  titleLines = [""];
  dataToDisplay = "";
  xValue = "";
  yValue = "";
  patternShifting = 0;

  constructor(private readonly patternService: PatternService) {}

  createTooltip(
    context: Context,
    retrieveData: (context: Context) => string,
    tooltipInputElements: TooltipElements,
    patternsColors: string[],
    patternsList: ((
      hover: boolean,
      color: string,
      disableAccessibility: boolean
    ) => CanvasPattern)[],
    disableAccessibility: boolean = false
  ) {
    if (!context.tooltip.dataPoints) {
      return;
    }
    this.datasetIndex = context.tooltip?.dataPoints[0].datasetIndex ?? 0;
    this.dataIndex = context.tooltip.dataPoints[0].dataIndex ?? 0;
    this.xValue = tooltipInputElements.firstLineLabel ?? "";
    this.yValue = tooltipInputElements.secondLineLabel ?? "";
    this.chartType = tooltipInputElements.chartType;
    this.dataToDisplay = retrieveData(context);
    this.patternShifting = tooltipInputElements.patternShifting ?? 0;
    let tooltipEl: HTMLElement | null =
      document.querySelector("#chartjs-tooltip");

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
      let style = "background: white;";
      style += "border-bottom: 1px solid #CCCCCC;";
      style += "border-radius: 5px;";
      style += "padding: 10px 20px";

      const innerHtml = `<div style="${style}" class="tooltipTitle">`;
      const body =
        this.chartType === "DOUGHNUT"
          ? [tooltipModel.title[0].split("(")[0].trim()]
          : bodyLines[0];
      let legendIconStyle = "";
      let legendInnerStyle = "";
      const datasetType = context.tooltip?.dataPoints[0]?.dataset?.type;
      if (this.chartType === "RADAR" || this.chartType === "LINE_CHART") {
        legendIconStyle = this.createLegendStyle(context);
        legendInnerStyle = this.createLegendInnerStyle(context);
      } else if (
        this.chartType === "BAR_CHART" ||
        this.chartType === "DETAILS_BAR_CHART" ||
        this.chartType === "DOUGHNUT"
      ) {
        legendIconStyle = this.createPatternLegendStyle(context);
      } else if (this.chartType === "MIXED_BAR_LINE_CHART") {
        if (datasetType === "bar") {
          legendIconStyle = this.createPatternLegendStyle(context);
        } else {
          legendIconStyle = this.createLegendStyle(context);
          legendInnerStyle = this.createLegendInnerStyle(context);
        }
      }

      this.addLegendToDom(
        innerHtml,
        legendIconStyle,
        legendInnerStyle,
        body,
        style,
        tooltipEl,
        patternsColors,
        patternsList,
        disableAccessibility,
        datasetType
      );
    }

    this.handleTooltipPosition(context, tooltipModel, tooltipEl);
  }

  protected handleTooltipPosition(
    context: Context,
    tooltipModel: { caretX: number; caretY: number },
    tooltipEl: HTMLElement
  ) {
    const position = context.chart.canvas.getBoundingClientRect();
    const screenWidth = window.innerWidth;
    const left = position.left + window.scrollX + tooltipModel.caretX;
    const top = position.top + window.scrollY + tooltipModel.caretY;

    tooltipEl.style.left = left + "px";
    tooltipEl.style.top = top + "px";
    tooltipEl.style.height = "auto";
    tooltipEl.style.minWidth = "17rem";
    tooltipEl.style.opacity = "1";
    tooltipEl.style.position = "absolute";
    tooltipEl.style.zIndex = "99";
    tooltipEl.style.backgroundColor = "white";
    tooltipEl.style.pointerEvents = "none";

    if (tooltipEl.getBoundingClientRect().width + left > screenWidth) {
      tooltipEl.style.left =
        left - tooltipEl.getBoundingClientRect().width + "px";
    }
  }

  protected createNewTooltipElement() {
    const tooltipEl = document.createElement("div");
    tooltipEl.id = "chartjs-tooltip";
    tooltipEl.style.backgroundColor = "white";
    tooltipEl.style.borderRadius = "5px";
    tooltipEl.style.transition = "opacity .5s";
    tooltipEl.style.boxShadow = "0px 1px 5px rgba(0, 0, 0, 0.2)";
    tooltipEl.innerHTML = '<div class="tooltipCtn"></div>';
    document.body.appendChild(tooltipEl);
    return tooltipEl;
  }

  private createPatternLegendStyle(context: Context) {
    return this.createCommonLegendSquareStyle(context);
  }

  private createLegendStyle(context: Context) {
    let legendIconStyle = `background-color:${context.tooltip.labelColors[0].backgroundColor}`;
    legendIconStyle += this.createCommonLegendSquareStyle(context);
    return legendIconStyle;
  }

  private createCommonLegendSquareStyle(context: Context): string {
    let style = `;border: 2px solid ${context.tooltip.labelColors[0].borderColor}`;
    style += ";min-height: 20px";
    style += ";min-width: 20px";
    style += ";border-radius: 5px";
    style += ";margin-right: 10px";
    style += ";display: flex";
    style += ";align-items: center";
    style += ";justify-content: center";
    style += ";background: rgba(0, 0, 0, 0.1);";
    return style;
  }

  createLegendInnerStyle(context: Context): string {
    let legendIconInnerStyle = "height: 12px";
    legendIconInnerStyle += ";width: 12px";
    legendIconInnerStyle += ";background-color: #FFF";
    legendIconInnerStyle += `;border: 2px solid ${context.tooltip.labelColors[0].borderColor};`;

    if (context.tooltip.labelPointStyles[0].pointStyle === "circle") {
      legendIconInnerStyle += "border-radius: 25px;";
    } else if (context.tooltip.labelPointStyles[0].pointStyle === "rectRot") {
      legendIconInnerStyle += "transform: rotate(45deg);";
    }
    return legendIconInnerStyle;
  }

  private addLegendToDom(
    innerHTMLtext: string,
    legendIconStyle: string,
    legendIconInnerStyle: string,
    body: Array<string>,
    style: string,
    tooltipEl: HTMLElement,
    patternsColors: string[],
    patternsList: ((
      hover: boolean,
      color: string,
      disableAccessibility: boolean
    ) => CanvasPattern)[],
    disableAccessibility: boolean = false,
    datasetType?: string
  ) {
    let innerHtml = innerHTMLtext;
    let legendImage = `<div class="legendIcon" style="${legendIconStyle}">`;
    const legendSubImage = `<div style="${legendIconInnerStyle}"></div>`;
    legendImage += `${legendSubImage}</div>`;

    const innerHtmlToAdd = this.setInnerHtmlToAdd(body, style, legendImage);
    innerHtml += innerHtmlToAdd;
    const tableRoot: HTMLElement | null =
      tooltipEl?.querySelector(".tooltipCtn");
    if (tableRoot?.innerHTML != null) {
      datasetType
        ? this.setInnerHtmlAndPattern(
            tableRoot,
            innerHtml,
            patternsColors,
            patternsList,
            disableAccessibility,
            datasetType
          )
        : this.setInnerHtmlAndPattern(
            tableRoot,
            innerHtml,
            patternsColors,
            patternsList,
            disableAccessibility
          );
    }
  }

  setInnerHtmlToAdd(body: Array<string>, style: string, legendImage: string) {
    const legendText = body[0].split(":")[0];
    const fontProperties = "font-family: Arial; font-size: 16px";
    const spanText = `<span style="${fontProperties}">${legendText}</span>`;
    if (this.chartType === "RADAR") {
      return this.returnRadarHtml(style, legendImage, spanText);
    } else if (this.chartType === "DOUGHNUT") {
      return this.returnDoughnutHtml(legendImage, spanText);
    } else {
      return this.returnDetailsBarchartHtml(style, legendImage, spanText);
    }
  }

  returnDoughnutHtml(legendImage: string, spanText: string) {
    const fontProperties = "font-family: Arial; font-size: 16px";
    const legendText = `<span style="${fontProperties}">${
      spanText.split("(")[0]
    }</span>`;
    let doughnutHtml = `<div style="${fontProperties}; display: flex; align-items: center; justify-content: space-between">`;
    doughnutHtml += `<div style="display:flex; align-items: center;" >${
      legendImage + legendText
    }</div>`;
    doughnutHtml += `<div style="${fontProperties}; margin-left:3rem;">${this.dataToDisplay}</div>`;
    doughnutHtml += "</div></div>";
    return doughnutHtml;
  }

  returnRadarHtml(style: string, legendImage: string, spanText: string) {
    const fontProperties = "font-family: Arial; font-size: 16px";
    let radarHtml = `<div style="${fontProperties}; display: flex; align-items: center;">${
      legendImage + spanText
    }</div>`;
    radarHtml += "</div>";
    radarHtml += `<div style="${fontProperties}; ${style}; border: none; display:flex; justify-content: space-between;">`;
    radarHtml += `<div>${this.titleLines[0]}</div>`;
    radarHtml += `<div style="margin-left: 20px;">${this.dataToDisplay}</div>`;
    radarHtml += "</div>";
    radarHtml += "</div><div>";

    return radarHtml;
  }

  returnDetailsBarchartHtml(
    style: string,
    legendImage: string,
    spanText: string
  ) {
    const fontProperties = "font-family: Arial; font-size: 16px";
    let barChartHtml = `<div style="${fontProperties}; display: flex; align-items: center;">${
      legendImage + spanText
    }</div>`;
    barChartHtml += "</div>";
    barChartHtml += `<div style="${fontProperties}; ${style}; display:flex; justify-content: space-between;">`;
    barChartHtml += `<div>${this.xValue}</div>`;
    barChartHtml += `<div style="margin-left: 20px;">${this.titleLines[0]}</div>`;
    barChartHtml += "</div>";

    barChartHtml += `<div style="${fontProperties}; ${style}; border-: none; display:flex; justify-content: space-between;">`;
    barChartHtml += `<div>${this.yValue}</div>`;
    barChartHtml += `<div style="margin-left: 20px;">${this.dataToDisplay}</div>`;
    barChartHtml += "</div>";

    return barChartHtml;
  }

  setInnerHtmlAndPattern(
    tableRoot: HTMLElement,
    innerHtml: string,
    patternsColors: string[],
    patternsList: ((
      hover: boolean,
      color: string,
      disableAccessibility: boolean
    ) => CanvasPattern)[],
    disableAccessibility: boolean = false,
    datasetType?: string
  ) {
    tableRoot.innerHTML = innerHtml;
    const legendIconHtml = document.querySelector(".legendIcon") as HTMLElement;
    const img: HTMLImageElement = new Image();

    let index: number;

    if (this.chartType === "DOUGHNUT") {
      index = this.dataIndex + 1;
    } else {
      index = this.datasetIndex + 1;
    }
    const patternIndex = this.patternService.getPatternIndexWithShift(
      index,
      this.patternShifting
    );
    if (
      this.chartType !== "LINE_CHART" &&
      this.chartType !== "RADAR" &&
      datasetType !== "line"
    ) {
      const pattern: CanvasPattern = patternsList[patternIndex - 1](
        false,
        patternsColors[patternIndex - 1],
        disableAccessibility
      );
      const patternCanvas: HTMLCanvasElement =
        this.patternService.getPatternCanvas(pattern, 22, 22);
      img.src = patternCanvas.toDataURL();
      legendIconHtml.style.backgroundImage = `url(${img.src})`;
    }
  }

  getBody(bodyItem: BodyItem) {
    return bodyItem.lines;
  }
}
