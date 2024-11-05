import { AfterViewInit, Component, Input } from "@angular/core";
import { ActiveElement, ChartEvent, Plugin } from "chart.js";
import { AxisDefinition } from "../../types/axis-definition";
import { NgChartsModule } from "ng2-charts";
import chartDesign from "../../patterns/chart-design";
import { ColorFunctionsService } from "../../services/color-function.service";
import { Context } from "../../services/generic-tooltip.service";
import { FormatUtilitiesService } from "../../services/format-utilities.service";
import { BubbleTooltipService } from "./services/bubble-tooltip.service";

@Component({
  selector: "moz-ng-bubble",
  standalone: true,
  imports: [NgChartsModule],
  templateUrl: "./bubble-chart.component.html",
  styleUrl: "./bubble-chart.component.scss",
})
export class BubbleChartComponent implements AfterViewInit {
  /**
   * Value of the id attribute present on the <canvas> tag element the chart
   */
  @Input() chartId = "bubble-chart";

  /**
   * Labels used to label the series. See [Data structures documentation](https://www.chartjs.org/docs/latest/general/data-structures.html)
   */
  @Input() labels: string[] = [];
  /**
   * Used to choose the colour set of the charts as defined in the Figma prototypes.
   * 7 colour sets are currently defined:
   * - Default 0 corresponds to the current one
   * - 1 to 6 corresponds to the "new" [colour sets](https://www.figma.com/file/Hn6PyvnR385Ta0XN3KqOI9/04.-Dataviz---Documentation-(read-only)?type=design&node-id=1-69316&mode=design&t=sDytQ5BipsryWkuA-0)
   * Note: All the sets are defined in /src/services/patterns/ChartDesign.ts
   */
  @Input() colourSet: number = 0;

  /**
   * 6 colors exist in the colourSet (0 to 5)
   * In some use cases, you may need to specify the colours for each dataset
   */
  @Input() colours: number[] = [];

  /**
   * In some use cases, you may need to specify the shapes for each dataset
   * Default shape is circle, implementation is done using the Point Styles of chartjs :
   * cf. https://www.chartjs.org/docs/latest/configuration/elements.html#point-styles
   */
  @Input() shapes: string[] = [];

  /**
   * Value of the `datasets` key present in the `data` object passed to the Chart config
   */
  @Input() datasets: any = [];

  /**
   * Value of the `width` css property used to define the width of the <canvas> element
   */
  @Input() width: string = "400px";

  /**
   * Value of the `height` css property used to define the height of the <canvas> element
   */
  @Input() height: string = "300px";

  /**
   * Add custom CSS classes to the <canvas> element
   */
  @Input() cssClasses: string | undefined = undefined;

  /**
   * Add custom CSS styles to the <canvas> element
   */
  @Input() styles: Partial<CSSStyleDeclaration> = {};

  /**
   * Minimum size for a bubble
   */
  @Input() bubbleMin: number = 10;

  /**
   * Maximum size for a bubble
   */
  @Input() bubbleMax: number = 40;

  /**
   * Value of the `plugins` key passed to the Chart config
   */
  @Input() plugins: Plugin<any>[] = [];

  /**
   * If set to true the label of the dataserie will be shown on top of the bubble
   */
  @Input() displayBubbleLabel: boolean = false;

  /**
   * X axis data : title and unit
   */
  @Input() xAxis: AxisDefinition | null = null;

  /**
   * Y axis data : title and unit
   */
  @Input() yAxis: AxisDefinition | null = null;

  /**
   * X axis data : title and unit
   */
  @Input() rAxis: AxisDefinition | null = null;

  /**
   * Show axis labels
   */
  @Input() displayAxisLabels: boolean = true;
  public bubbleChartOptions: any;

  private readonly colourSets = chartDesign().colourSets;
  private readonly patternsStandardList = chartDesign().patternsStandardList;

  constructor(
    private readonly bubbleTooltipService: BubbleTooltipService,
    private readonly colorFunctionService: ColorFunctionsService,
    private readonly formatUtilitiesService: FormatUtilitiesService
  ) {}

  ngAfterViewInit(): void {
    this.initializeChartOptions();
    this.bubbleChartOptions.onHover = (
      event: ChartEvent,
      elements: ActiveElement[],
      chart: any
    ) => {
      if (chart) {
        chart.canvas.style.cursor =
          elements.length !== 0 ? "pointer" : "default";
      }
    };
  }

  public chartData(): {
    datasets: {
      data: {
        x: any;
        y: any;
        r: number;
      }[];
      pointStyle: string;
      backgroundColor: string;
      borderColor: string;
      label: string;
    }[];
  } {
    const chartColourSet = this.colourSets[this.colourSet];
    return {
      datasets: this.normalizeDatasets(this.datasets).map((data, index) => ({
        data: data,
        pointStyle: this.shapes[index],
        backgroundColor: this.colorFunctionService.addAlpha(
          chartColourSet[this.colours[index]],
          0.2
        ),
        borderColor: chartColourSet[this.colours[index]],
        label: this.labels[index],
      })),
    };
  }

  private initializeChartOptions(): void {
    this.bubbleChartOptions = {
      responsive: true,
      scales: {
        x: {
          offset: true,
          title: {
            display: this.displayAxisLabels,
            text: this.xAxis?.title,
          },
        },
        y: {
          offset: true,
          title: {
            display: this.displayAxisLabels,
            text: this.yAxis?.title,
          },
        },
      },
      plugins: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false,
        },
        title: {
          display: false,
        },
        datalabels: {
          display: this.displayBubbleLabel,
          anchor: "end" as const,
          align: "end" as const,
          color: "black",
          formatter: function <T extends { dataset: any }>(
            _value: any,
            context: T
          ) {
            return context.dataset.label;
          },
          padding: 0,
        },
        tooltip: {
          enabled: false,
          position: "nearest" as const,
          external: (context: Context) => {
            const datasetIndex: number =
              context.tooltip?.dataPoints?.[0].datasetIndex || 0;
            const dataIndex: number =
              context.tooltip.dataPoints?.[0].dataIndex || 0;
            const currentBubble: { x: number; y: number; r: number } =
              this.datasets[datasetIndex][dataIndex];
            this.bubbleTooltipService.createBubbleTooltip(
              context,
              [
                {
                  label: this.xAxis?.title ?? "",
                  value: `${this.formatUtilitiesService.formatWithThousandsSeparators(
                    currentBubble.x
                  )}`,
                  unit: this.xAxis?.unit ?? "",
                },
                {
                  label: this.yAxis?.title ?? "",
                  value: `${this.formatUtilitiesService.formatWithThousandsSeparators(
                    currentBubble.y
                  )}`,
                  unit: this.yAxis?.unit ?? "",
                },
                {
                  label: this.rAxis?.title ?? "",
                  value: `${this.formatUtilitiesService.formatWithThousandsSeparators(
                    currentBubble.r
                  )}`,
                  unit: this.rAxis?.unit ?? "",
                },
              ],
              this.labels[datasetIndex]
            );
          },
        },
      },
    };
  }

  private normalizeDatasets(dataSets: Array<Array<any>>): {
    x: any;
    y: any;
    r: number;
  }[][] {
    const rValues: Array<number> = [];
    dataSets.forEach((dataSerie: Array<any>) => {
      dataSerie.forEach((item: any) => {
        rValues.push(item.r);
      });
    });
    const max = Math.max(...rValues);
    const min = Math.min(...rValues);
    const rMax = this.bubbleMax;
    const rMin = this.bubbleMin;

    return dataSets.map((dataSerie: Array<any>) => {
      if (max === min) {
        return dataSerie.map((item) => {
          return {
            x: item.x,
            y: item.y,
            r: rMin + (rMax - rMin) / 2,
          };
        });
      } else {
        return dataSerie.map((item) => {
          return {
            x: item.x,
            y: item.y,
            r: rMin + ((item.r - min) * (rMax - rMin)) / (max - min),
          };
        });
      }
    });
  }
}
