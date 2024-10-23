import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { PatternService } from "./pattern.service";
import { ColorFunctionsService } from "./color-function.service";

interface Dataset {
  data: number[];
  label: any;
  stack?: number;
}

@Injectable({
  providedIn: "root",
})
export class BarChartFunctionsService {
  barChartRef = new BehaviorSubject<any>(null);
  onHoverIndex = new BehaviorSubject<{
    dataSetIndex: number;
    columnIndex: number;
  }>({
    dataSetIndex: -1,
    columnIndex: -1,
  });
  borderWidth = new BehaviorSubject<number>(3);

  constructor(
    private readonly patternService: PatternService,
    private readonly colorFunctionService: ColorFunctionsService
  ) {}

  public getStackedDatasets(
    datasets: Dataset[],
    stackDatasets: boolean,
    disableAccessibility: boolean,
    patternsColors: string[],
    patternsList: ((
      hover: boolean,
      color: string,
      disableAccessibility: boolean
    ) => CanvasPattern)[],
    patternShifting?: number
  ) {
    // Hack to force refresh
    const barChartFunctionService = this;
    const borderWithValue = this.borderWidth.value;
    return datasets.map((dataset, datasetIndex) => {
      return {
        borderColor: function (context: any) {
          return disableAccessibility
            ? "#00000000"
            : barChartFunctionService.getBorderColor(
                datasetIndex,
                context.index,
                patternsColors,
                patternShifting
              );
        },
        backgroundColor: function (context: any) {
          return barChartFunctionService.getPattern(
            datasetIndex,
            context.index,
            disableAccessibility,
            patternsColors,
            patternsList,
            patternShifting
          );
        },
        borderWidth: function () {
          return disableAccessibility ? 1 : borderWithValue;
        },

        data: dataset.data,
        label: dataset.label,
        stack: `Stack ${stackDatasets ? dataset.stack : datasetIndex}`,
      };
    });
  }

  // Hack to force the chart to reload on Hover
  private reloadChart() {
    this.borderWidth.next(4);
    this.borderWidth.next(3);
  }

  private getDatasets(
    firstDataSet: Dataset,
    secondDataSet: Dataset,
    patternsColors: string[],
    patternsList: ((
      hover: boolean,
      color: string,
      disableAccessibility: boolean
    ) => CanvasPattern)[],
    disableAccessibility: boolean
  ) {
    return this.getStackedDatasets(
      [firstDataSet, secondDataSet],
      false,
      disableAccessibility,
      patternsColors,
      patternsList
    );
  }

  private getBorderColor(
    dataSetIndex: number,
    contextIndex: number,
    patternsColors: string[],
    patternShifting?: number
  ) {
    const index = this.patternService.getPatternIndexWithShift(
      dataSetIndex,
      patternShifting
    );
    if (this.displayFullOpacity(dataSetIndex, contextIndex)) {
      return patternsColors[index];
    } else {
      return this.colorFunctionService.addAlpha(patternsColors[index], 0.2);
    }
  }

  private getPattern(
    dataSetIndex: number,
    contextIndex: number,
    disableAccessibility: boolean,
    patternsColors: string[],
    patternsList: ((
      hover: boolean,
      color: string,
      disableAccessibility: boolean
    ) => CanvasPattern)[],
    patternShifting?: number
  ) {
    const index = this.patternService.getPatternIndexWithShift(
      dataSetIndex,
      patternShifting
    );
    if (this.displayFullOpacity(dataSetIndex, contextIndex)) {
      return patternsList[index](
        false,
        patternsColors[index],
        disableAccessibility
      );
    } else {
      return patternsList[index](
        true,
        patternsColors[index],
        disableAccessibility
      );
    }
  }

  private nothingHovered(): boolean {
    return this.onHoverIndex.value.dataSetIndex < 0;
  }

  private columnHovered(dataSetIndex: number, contextIndex: number): boolean {
    return (
      this.onHoverIndex.value.dataSetIndex === dataSetIndex &&
      this.onHoverIndex.value.columnIndex === contextIndex
    );
  }

  private legendHovered(dataSetIndex: number): boolean {
    return (
      this.onHoverIndex.value.dataSetIndex === dataSetIndex &&
      this.onHoverIndex.value.columnIndex < 0
    );
  }

  private displayFullOpacity(
    dataSetIndex: number,
    contextIndex: number
  ): boolean {
    return (
      this.nothingHovered() ||
      this.columnHovered(dataSetIndex, contextIndex) ||
      this.legendHovered(dataSetIndex)
    );
  }

  private resetOnHoverIndex() {
    this.onHoverIndex.next({
      dataSetIndex: -1,
      columnIndex: -1,
    });
  }

  private getOnHoverOptions() {
    return (
      _ignore: unknown,
      activeElements: Array<{ index: number; datasetIndex: number }>
    ) => {
      if (activeElements[0] !== undefined) {
        this.onHoverIndex.value.dataSetIndex = activeElements[0].datasetIndex;
        this.onHoverIndex.value.columnIndex = activeElements[0].index;
      } else {
        this.resetOnHoverIndex();
      }
    };
  }
}
