import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Chart, Plugin } from "chart.js";
import { ColorFunctionsService } from "../../../services/color-function.service";
import { FormatUtilitiesService } from "../../../services/format-utilities.service";
import { DoughnutData } from "../models/doughnut-data";
import { ChartCommonLegendService } from "../../../services/chart-common-legend.service";

@Injectable({
  providedIn: "root",
})
export class DoughnutChartFunctionsService {
  doughnutRef = new BehaviorSubject<any>(null);
  onHoverIndex = new BehaviorSubject<any>(null);
  backgroundColor = new BehaviorSubject<CanvasPattern[] | null>(null);
  centeredLabel = new BehaviorSubject<string | null>(null);

  constructor(
    private readonly formatUtilitiesService: FormatUtilitiesService,
    private readonly colorFunctionsService: ColorFunctionsService,
    private readonly chartCommonLegendService: ChartCommonLegendService
  ) {}

  public privateGetHtmlLegendPlugin(
    legendContainer: BehaviorSubject<HTMLElement | null>,
    selectMode: BehaviorSubject<boolean>,
    disableAccessibility: boolean,
    patternsColors: string[],
    patternsList: Array<
      (
        hover: boolean,
        color: string,
        disableAccessibility: boolean
      ) => CanvasPattern
    >,
    maxValueToDisplay: number,
    doughnutData: any,
    enableHoverFeature: boolean
  ): Plugin<"doughnut"> {
    return this.chartCommonLegendService.getHtmlLegendPlugin(
      legendContainer,
      selectMode,
      this.onHoverIndex,
      disableAccessibility,
      patternsColors,
      patternsList,
      enableHoverFeature,
      maxValueToDisplay,
      doughnutData
    );
  }

  public getBackgroundColor(
    patternsColors: string[],
    patternsList: Array<
      (
        hover: boolean,
        color: string,
        disableAccessibility: boolean
      ) => CanvasPattern
    >,
    disableAccessibility: boolean,
    enableHoverFeature: boolean
  ): CanvasPattern[] {
    if (this.onHoverIndex.value !== null && enableHoverFeature) {
      return patternsList.map((pattern, index) =>
        this.onHoverIndex.value === index
          ? pattern(false, patternsColors[index], disableAccessibility)
          : pattern(true, patternsColors[index], disableAccessibility)
      );
    } else {
      return patternsList.map((pattern, index) =>
        pattern(false, patternsColors[index], disableAccessibility)
      );
    }
  }

  public getBorderColor(
    patternsColors: string[],
    enableHoverFeature: boolean
  ): string[] {
    if (this.onHoverIndex.value !== null && enableHoverFeature) {
      return patternsColors.map((color, index) =>
        this.onHoverIndex.value === index
          ? color
          : this.colorFunctionsService.addAlpha(color, 0.2)
      );
    } else {
      return patternsColors;
    }
  }

  public getOnHoverOptions() {
    return (_ignore: unknown, activeElements: any[]): void => {
      if (activeElements[0] !== undefined) {
        this.onHoverIndex.next(activeElements[0].index);
      } else {
        this.onHoverIndex.next(null);
      }
    };
  }

  public getFormattedText(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  public getCenteredLabelPlugin(
    doughnutData: DoughnutData[]
  ): Plugin<"doughnut"> {
    return {
      id: "centeredLabelPlugin",
      afterDatasetDraw: (chart: Chart<"doughnut">) => {
        const selectedIndexes: number[] = [];
        const arcElements = chart.getDatasetMeta(0).data;

        arcElements.forEach((arcElement: any, index: number) => {
          if (arcElement.startAngle !== arcElement.endAngle) {
            selectedIndexes.push(index);
          }
        });

        const total = (chart as any)._metasets[0]?._dataset?.raw_value
          ?.filter((_: any, index: number) => selectedIndexes.includes(index))
          .reduce((acc: number, currentValue: any) => acc + currentValue, 0);
        const unit = doughnutData[0].unit ?? "";
        this.centeredLabel.next(
          `${this.formatUtilitiesService.formatWithThousandsSeparators(
            total
          )}${unit}`
        );
      },
    };
  }

  public getDoughnutLabels(
    labels: string[],
    data: DoughnutData[],
    maxValues: number,
    othersLabel: string
  ): string[] {
    let truncatedLabels = labels.slice(0);
    let truncatedData = data.slice(0);

    if (labels.length > maxValues) {
      truncatedData = this.groupDataAfterNthValue(data, maxValues);
      truncatedLabels = truncatedLabels.slice(0, maxValues - 1);
      truncatedLabels.push(othersLabel);
    }

    return truncatedLabels.map((label: string, index: number) => {
      const rate = truncatedData[index].rate;
      return rate !== undefined
        ? `${this.getFormattedText(
            label
          )} (${this.formatUtilitiesService.formatWithThousandsSeparators(
            rate
          )}%)`
        : this.getFormattedText(label);
    });
  }

  public groupDataAfterNthValue(
    data: DoughnutData[],
    maxValues: number
  ): DoughnutData[] {
    if (maxValues < 1) {
      return data;
    }
    let truncatedData = data.slice(0);
    if (data.length > maxValues) {
      truncatedData = truncatedData.slice(0, maxValues);
      truncatedData[maxValues - 1] = data.slice(maxValues).reduce(
        (result, current) => {
          if (result.rate && current.rate) {
            result.rate += current.rate;
          }
          result.value += current.value;
          return result;
        },
        { ...data[maxValues - 1] }
      );
    }
    return truncatedData;
  }
}
