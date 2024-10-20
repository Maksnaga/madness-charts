import { Injectable } from "@angular/core";
import { ChartOptions } from "chart.js/dist/types/index";
import { HTMLLegendPlugin } from "../types/chart";
import { BehaviorSubject } from "rxjs";
import { PatternService } from "./pattern.service";
import { FormatUtilitiesService } from "./format-utilities.service";

export const LEGEND_FONT_SIZE = 14;
export const LEGEND_LABEL_LEFT_MARGIN = "6px";
export const LEGEND_BOX_SIZE = "22px";
export const LEGEND_BOX_POINT_SIZE = 6;
export const LEGEND_BOX_BORDER = "2px";

export interface Chart {
  update(): void;
  toggleDataVisibility(datasetIndex: number): void;
  isDatasetVisible(datasetIndex: number): boolean;
  getDataVisibility(index: number): boolean;
  setDatasetVisibility(datasetIndex: number, visible: boolean): void;
  plugins: HTMLLegendPlugin;
  options:
    | ChartOptions<"radar">
    | ChartOptions<"doughnut">
    | ChartOptions<"bar">
    | ChartOptions<"line">;
  config: {
    type?: string;
    data: { labels: string[]; datasets: unknown[]; data?: unknown[] };
  };
}

export interface ChartItem {
  fontColor: string;
  hidden: boolean;
  text: string;
  fillStyle: string;
  strokeStyle: string;
  lineWidth: number;
  datasetIndex: number;
  index: number;
  lineCap?: string;
}

@Injectable({
  providedIn: "root",
})
export class ChartLegendService {
  constructor(
    private readonly patternService: PatternService,
    private readonly formatUtilitiesService: FormatUtilitiesService
  ) {}

  public getHtmlLegendPlugin(
    legendContainer: BehaviorSubject<HTMLElement | null>,
    selectMode: BehaviorSubject<boolean>,
    onHoverIndex: BehaviorSubject<number | null>,
    disableAccessibility: boolean,
    patternsColors: string[],
    patternsList: ((
      hover: boolean,
      color: string,
      disableAccessibility: boolean
    ) => CanvasPattern)[],
    enableHoverFeature: boolean,
    maxValueToDisplay?: number,
    chartData?: any
  ): HTMLLegendPlugin {
    const chartLegendService = this;
    return {
      id: "htmlLegend",
      afterUpdate(chart: any) {
        const isDoughnut: boolean = chart.config.type === "doughnut";
        const flexDirection = isDoughnut ? "column" : "row";
        const ul: HTMLUListElement = chartLegendService.getOrCreateLegendList(
          legendContainer,
          flexDirection
        );
        ul.style.margin = "1.375rem 1.0625rem";
        while (ul.firstChild) {
          ul.firstChild.remove();
        }
        const items: ChartItem[] =
          chart.options.plugins.legend.labels.generateLabels(chart);
        items.forEach((item: ChartItem): void => {
          const isDoughnut: boolean = chart.config.type === "doughnut";
          const index: number = isDoughnut ? item.index : item.datasetIndex;
          const li: HTMLElement =
            chartLegendService.createHtmlLegendListElement(
              chart,
              selectMode,
              index
            );
          if (isDoughnut) {
            const isOthersElement: boolean = index + 1 === maxValueToDisplay;
            li.style.marginTop = "12px";
            if (isOthersElement) {
              li.style.position = "relative";
            }
          } else {
            li.style.marginRight = "10px";
          }
          li.style.width = "max-content";
          li.style.cursor = "pointer";
          let liContent: HTMLElement;
          if (!selectMode.value) {
            liContent = chartLegendService.createLegendElementWithPatterns(
              item,
              chart,
              onHoverIndex,
              disableAccessibility,
              patternsColors,
              patternsList,
              enableHoverFeature
            );
          } else {
            liContent = chartLegendService.createLegendElementWithCheckbox(
              chart,
              item,
              selectMode,
              onHoverIndex,
              patternsColors,
              enableHoverFeature
            );
          }
          liContent.style.boxSizing = "border-box";
          li.appendChild(liContent);
          li.appendChild(chartLegendService.createHtmlLegendItemText(item));
          if (
            isDoughnut &&
            maxValueToDisplay &&
            chartLegendService.hasOthersTooltipToDisplay(
              chartData,
              maxValueToDisplay,
              index
            )
          ) {
            li.appendChild(
              chartLegendService.createTooltipAndItsIcon(
                chartData,
                maxValueToDisplay
              )
            );
          }
          ul.appendChild(li);
        });
      },
    };
  }

  public hasOthersTooltipToDisplay(
    doughnutData: any,
    maxValueToDisplay: number,
    index: number
  ) {
    return (
      doughnutData.data.length > maxValueToDisplay &&
      index === maxValueToDisplay - 1
    );
  }

  public getOrCreateLegendList(
    legendContainer: BehaviorSubject<HTMLElement | null>,
    flexDirection: string
  ): HTMLUListElement {
    let listContainer = legendContainer?.value?.querySelector("ul");
    if (!listContainer) {
      listContainer = document.createElement("ul");
      listContainer.style.display = "flex";
      listContainer.style.flexDirection = flexDirection;
      listContainer.style.margin = "0";
      listContainer.style.padding = "0";
      legendContainer.value?.appendChild(listContainer);
    }
    return listContainer;
  }

  public createHtmlLegendListElement(
    chart: Chart,
    selectMode: BehaviorSubject<boolean>,
    elementIndex: number
  ) {
    const li: HTMLElement = document.createElement("li");
    li.style.alignItems = "center";
    li.style.cursor = selectMode.value ? "" : "pointer";
    li.style.display = "flex";
    li.style.flexDirection = "row";
    li.setAttribute("data-test-id", `legend-item-${elementIndex}`);
    li.onclick = () => {
      if (!selectMode.value) {
        this.hideAllButThis(chart, elementIndex, selectMode);
        chart.update();
      } else {
        this.switchItemVisibility(chart, elementIndex, selectMode);
      }
    };
    return li;
  }

  public hideAllButThis(
    chart: Chart,
    elementIndex: number,
    selectMode: BehaviorSubject<boolean>
  ) {
    if (!selectMode.value) {
      const dataSets: unknown[] = this.getChartsData(chart);
      selectMode.next(true);
      dataSets.forEach((_data, index) => {
        if (index !== elementIndex) {
          this.switchItemVisibility(chart, index);
        }
      });
    }
  }

  public switchItemVisibility(
    chart: Chart,
    elementIndex: number,
    selectMode?: BehaviorSubject<boolean>
  ): void {
    if (this.isMonoDataSetChart(chart)) {
      chart.toggleDataVisibility(elementIndex);
    } else {
      chart.setDatasetVisibility(
        elementIndex,
        !chart.isDatasetVisible(elementIndex)
      );
    }

    if (selectMode && this.allDataVisible(chart)) {
      selectMode.next(false);
    }
    chart.update();
  }

  public createLegendElementWithPatterns(
    item: ChartItem,
    chart: Chart,
    onHoverIndex: BehaviorSubject<number | null>,
    disableAccessibility: boolean,
    patternsColors: string[],
    patternsList: ((
      hover: boolean,
      color: string,
      disableAccessibility: boolean
    ) => CanvasPattern)[],
    enableHoverFeature: boolean
  ): HTMLElement {
    const isDoughnut: boolean = chart.config.type === "doughnut";
    const index: number = isDoughnut ? item.index : item.datasetIndex;
    const img: HTMLImageElement = new Image();
    const boxSpan: HTMLElement = this.createHtmlLegendLine(
      item,
      chart.config.type
    );
    const pattern: CanvasPattern = patternsList[index](
      false,
      patternsColors[index],
      disableAccessibility
    );
    const patternCanvas: HTMLCanvasElement =
      this.patternService.getPatternCanvas(pattern);
    img.src = patternCanvas.toDataURL();
    boxSpan.style.background = `url(${img.src})`;
    boxSpan.style.backgroundSize = "cover";
    boxSpan.style.borderColor = patternsColors[index];
    boxSpan.style.borderWidth = LEGEND_BOX_BORDER;

    if (enableHoverFeature) {
      boxSpan.onmouseover = (): void => {
        onHoverIndex.next(index);
        // isDoughnut
        //   ? (onHoverIndex.value = index)
        //   : (onHoverIndex.dataSetIndex = index);
      };
      boxSpan.onmouseleave = (): void => {
        onHoverIndex.next(null);
      };
    }
    return boxSpan;
  }

  public createHtmlLegendLine(
    item: ChartItem,
    type: string | undefined
  ): HTMLDivElement {
    const boxSpan = document.createElement("div");
    if (type !== "doughnut") {
      boxSpan.style.background = "rgba(0, 0, 0, 0.1)";
      boxSpan.style.borderColor = item.strokeStyle;
      boxSpan.style.borderWidth = LEGEND_BOX_BORDER;
    }
    boxSpan.style.borderRadius = "5px";
    boxSpan.style.borderStyle = "solid";
    boxSpan.style.display = "flex";
    boxSpan.style.justifyContent = "center";
    boxSpan.style.alignItems = "center";
    boxSpan.style.minWidth = LEGEND_BOX_SIZE;
    boxSpan.style.marginRight = LEGEND_LABEL_LEFT_MARGIN;
    boxSpan.style.minHeight = LEGEND_BOX_SIZE;
    return boxSpan;
  }

  public createLegendElementWithCheckbox(
    chart: Chart,
    item: ChartItem,
    selectMode: BehaviorSubject<boolean>,
    onHoverIndex: BehaviorSubject<number | null>,
    patternsColors: string[],
    enableHoverFeature: boolean
  ): HTMLElement {
    const isDoughnut: boolean = chart.config.type === "doughnut";
    const index: number = isDoughnut ? item.index : item.datasetIndex;
    const checkbox: HTMLElement = this.createLegendCheckbox(
      chart,
      item,
      patternsColors
    );
    const labels = chart.config.data.labels;
    const allCheckBoxesVisible: boolean = labels.every((_, index: number) =>
      chart.getDataVisibility(index)
    );
    if (allCheckBoxesVisible) {
      if (isDoughnut) {
        selectMode.next(false);
        onHoverIndex.next(-1);
      }
      return checkbox;
    }
    if (enableHoverFeature) {
      checkbox.onmouseover = (): void => {
        onHoverIndex.next(index);
        // isDoughnut
        //   ? (onHoverIndex.value = index)
        //   : (onHoverIndex.dataSetIndex = index);
        chart.update();
      };
      checkbox.onmouseleave = (): void => {
        onHoverIndex.next(null);
        // isDoughnut
        //   ? (onHoverIndex.value = null)
        //   : (onHoverIndex.dataSetIndex = -1);
        chart.update();
      };
    }
    return checkbox;
  }

  public createLegendCheckbox(
    chart: Chart,
    item: ChartItem,
    patternsColors: string[]
  ): any {
    const isDoughnut: boolean = chart.config.type === "doughnut";
    const index: number = isDoughnut ? item.index : item.datasetIndex;
    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("data-test-id", `legend-checkbox-${index}`);
    const isDataSetVisible = this.isChartDataVisible(chart, index);
    const patternColor = patternsColors ? patternsColors[index] : undefined;
    this.addCheckboxStyle(
      isDataSetVisible,
      item,
      checkbox,
      patternColor as string
    );
    return checkbox;
  }

  public addCheckboxStyle(
    isDataSetVisible: boolean,
    item: ChartItem,
    checkbox: Element,
    patternColor: string
  ): void {
    let backgroundColor = "#fff";
    let borderColor = "#666";
    if (isDataSetVisible) {
      //Default white for patterns chart
      backgroundColor = this.isDefaultWhiteColor(item.strokeStyle)
        ? patternColor
        : item.strokeStyle;
      borderColor = this.isDefaultWhiteColor(item.strokeStyle)
        ? patternColor
        : item.strokeStyle;
      checkbox.setAttribute("checked", "" + isDataSetVisible);
    }
    checkbox.setAttribute("class", "mc-checkbox__input");
    checkbox.setAttribute(
      "style",
      `background-color: ${backgroundColor};
      min-width: ${LEGEND_BOX_SIZE};
      min-height: ${LEGEND_BOX_SIZE};
      margin-right: ${LEGEND_LABEL_LEFT_MARGIN};
      border-color: ${borderColor};`
    );
  }

  public createHtmlLegendItemText(item: ChartItem): HTMLParagraphElement {
    const textContainer = document.createElement("p");
    textContainer.style.color = item.fontColor;
    textContainer.style.fontSize = `${LEGEND_FONT_SIZE}px`;
    textContainer.style.margin = "0";
    textContainer.style.padding = "0";

    const text = document.createTextNode(item.text);
    textContainer.appendChild(text);
    return textContainer;
  }

  public createTooltipAndItsIcon(
    doughnutData: any,
    maxValueToDisplay: number
  ): HTMLDivElement {
    const iconTopWrapper = document.createElement("div");
    const iconWrapper = document.createElement("div");
    const icon = document.createElement("img");
    iconTopWrapper.style.position = "absolute";
    iconTopWrapper.style.right = "-32px";
    // icon.src = QuestionMarkSvg;
    icon.style.top = "0";
    icon.style.width = "1.5rem";
    icon.style.filter =
      "invert(38%) sepia(19%) saturate(18%) hue-rotate(337deg) brightness(97%) contrast(85%)";
    iconWrapper.style.position = "relative";
    iconWrapper.style.display = "flex";
    const tooltip = this.createLegendOthersTooltip(
      doughnutData,
      maxValueToDisplay
    );
    icon.onmouseover = () => {
      (iconWrapper.firstElementChild as HTMLElement).style.visibility =
        "visible";
    };
    icon.onmouseleave = () => {
      (iconWrapper.firstElementChild as HTMLElement).style.visibility =
        "hidden";
    };
    iconTopWrapper.appendChild(iconWrapper);
    iconWrapper.appendChild(tooltip);
    iconWrapper.appendChild(icon);
    return iconTopWrapper;
  }

  private createLegendOthersTooltip(
    doughnutData: any,
    maxValueToDisplay: number
  ): HTMLDivElement {
    const tooltip = document.createElement("div");
    tooltip.style.visibility = "hidden";
    tooltip.style.position = "absolute";
    tooltip.style.zIndex = "10";
    tooltip.style.width = "350px";
    tooltip.style.bottom = "100%";
    tooltip.style.left = "50%";
    tooltip.style.marginLeft = "-150px";
    tooltip.style.background = "#FFFFFF";
    tooltip.style.boxShadow = "0px 1px 5px rgba(0, 0, 0, 0.2)";
    tooltip.style.borderRadius = "0.5rem";
    tooltip.style.fontSize = "14px";
    tooltip.style.overflow = "hidden";
    this.addOthersTooltipLines(doughnutData, maxValueToDisplay, tooltip);
    return tooltip;
  }

  private addOthersTooltipLines(
    doughnutData: any,
    maxValueToDisplay: number,
    tooltip: HTMLDivElement
  ): void {
    const startIndex = maxValueToDisplay - 1;
    doughnutData.data
      .slice(startIndex)
      .forEach((_ignore: any, index: number) => {
        const dataIndex = startIndex + index;
        const textWrapper = document.createElement("div");
        textWrapper.style.display = "flex";
        textWrapper.style.justifyContent = "space-between";
        textWrapper.style.padding = "0.5rem";
        textWrapper.style.border = "1px solid #CCCCCC";
        const label = document.createElement("span");
        label.appendChild(
          document.createTextNode(doughnutData.labels[dataIndex])
        );
        const value = document.createElement("span");
        value.appendChild(
          document.createTextNode(
            this.formatUtilitiesService.formatValueAndRate(
              doughnutData,
              dataIndex
            )
          )
        );
        textWrapper.appendChild(label);
        textWrapper.appendChild(value);
        tooltip.appendChild(textWrapper);
      });
  }

  private getChartsData(chart: any): unknown[] {
    let dataSets: unknown[] = chart.config.data.datasets;
    if (this.isMonoDataSetChart(chart)) {
      dataSets = chart.config.data.datasets[0].data;
    }
    return dataSets;
  }

  private isMonoDataSetChart(chart: Chart): boolean {
    const { type } = chart.config;
    return type === "pie" || type === "doughnut";
  }

  private allDataVisible(chart: Chart): boolean {
    let allVisible = true;
    const chartsData: unknown[] = this.getChartsData(chart);
    chartsData.forEach((_data, dataIndex) => {
      allVisible = allVisible && this.isChartDataVisible(chart, dataIndex);
    });
    return allVisible;
  }

  private isChartDataVisible(chart: Chart, dataIndex: number): boolean {
    if (this.isMonoDataSetChart(chart)) {
      return chart.getDataVisibility(dataIndex);
    } else {
      return chart.isDatasetVisible(dataIndex);
    }
  }

  private isDefaultWhiteColor(color: string): boolean {
    return color === "#00000000";
  }
}
