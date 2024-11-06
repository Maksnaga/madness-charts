import { CommonModule } from "@angular/common";
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from "@angular/core";
import { CheckboxModule } from "@mozaic-ds/angular/adeo";
import { NgChartsModule } from "ng2-charts";
import { LineChartData, LineData, LinePlugin } from "./models/line-chart";
import { ActiveElement, ChartEvent, Plugin } from "chart.js";
import chartDesign from "../../patterns/chart-design";
import {
  Context,
  GenericTooltipService,
} from "../../services/generic-tooltip.service";
import { BehaviorSubject } from "rxjs";
import {
  ChartCommonLegendService,
  ChartItem,
} from "../../services/chart-common-legend.service";
import { TooltipChartType } from "../../types/tooltip-chart-type";
import { FormatUtilitiesService } from "../../services/format-utilities.service";

@Component({
  selector: "moz-ng-line-chart",
  standalone: true,
  imports: [NgChartsModule, CommonModule, CheckboxModule],
  templateUrl: "./line-chart.component.html",
  styleUrl: "./line-chart.component.scss",
})
export class LineChartComponent implements AfterViewInit {
  @ViewChild("legendContainer", { read: ElementRef })
  legendContainerElementRef?: ElementRef;

  /**
   * Value of the id attribute present on the <canvas> tag element the chart
   */
  @Input() chartId: string = "radar-chart";

  /**
   * Label of the first line in the Tooltip
   */
  @Input() tooltipFirstLineLabel: string = "content";

  /**
   * Label of the second line in the Tooltip
   */
  @Input() tooltipSecondLineLabel: string = "content2";

  /**
   * Value of the `width` css property used to define the width of the <canvas> element
   */
  @Input() width: string = "200px";

  /**
   * Value of the `height` css property used to define the height of the <canvas> element
   */
  @Input() height: string = "400px";

  /**
   * Disable accessibility patterns
   */
  @Input() disableAccessibility: boolean = false;

  /**
   * Used to choose the colour set of the charts as defined in the Figma prototypes.
   * 7 colour sets are currently defined:
   * - Default 0 corresponds to the current one
   * - 1 to 6 corresponds to the "new" [colour sets](https://www.figma.com/file/Hn6PyvnR385Ta0XN3KqOI9/04.-Dataviz---Documentation-(read-only)?type=design&node-id=1-69316&mode=design&t=sDytQ5BipsryWkuA-0)
   * Note: All the sets are defined in /src/services/patterns/ChartDesign.ts
   */
  @Input() colourSet: number = 0;

  /**
   * 6 patterns exist and are not randomly given but follow the order defined in [patternsStandardList](/src/services/patterns/ChartDesign.ts)
   * Additionally, a pattern has only one possible colour per colour set as defined in the Figma prototype.
   * In some use cases, the chart may need to show a different orders of these patterns, this can be changed using the props newPatternsOrder
   */
  @Input() newPatternsOrder: number[] = [0, 1, 2, 3, 4, 5];

  /**
   * Line data _(can contain `label`, `data` and `unit` keys)_
   */
  @Input() lines: LineData[] = [];

  /**
   * Labels used to label the index axis (default x axes). See [Data structures documentation](https://www.chartjs.org/docs/latest/general/data-structures.html)
   */
  @Input() labels: string[] = [];

  /**
   * X axis title
   */
  @Input() xAxisTitle: string | null = null;

  /**
   * Y axis title
   */
  @Input() yAxisTitle: string | null = null;

  /**
   * Adjustment used when calculating the minimum data value.
   */
  @Input() suggestedMin: number | undefined = undefined;

  /**
   * Adjustment used when calculating the maximum data value.
   */
  @Input() suggestedMax: number | undefined = undefined;

  /**
   * Add custom CSS classes to the <canvas> element
   */
  @Input() cssClasses: string | undefined = undefined;

  /**
   * Add custom CSS styles to the <canvas> element
   */
  @Input() styles: Partial<CSSStyleDeclaration> = {};

  /**
   * Value of the `plugins` key passed to the Chart config
   */
  @Input() plugins: Plugin<"line">[] = [];

  public lineChartOptions: any;
  public lineChartPlugins: LinePlugin[] = [];

  public lineChartData: LineChartData = {
    labels: [],
    datasets: [
      {
        data: [],
      },
    ],
  };

  private readonly selectMode = new BehaviorSubject<boolean>(false);
  private readonly legendContainer = new BehaviorSubject<HTMLElement | null>(
    null
  );

  private readonly colourSets = chartDesign().colourSets;
  private readonly patternsStandardList = chartDesign().patternsStandardList;

  constructor(
    private readonly chartCommonLegendService: ChartCommonLegendService,
    private readonly genericTooltipService: GenericTooltipService,
    private readonly formatUtilitiesService: FormatUtilitiesService
  ) {}

  ngAfterViewInit(): void {
    this.initializeChartData();
    this.legendContainer.next(this.legendContainerElementRef?.nativeElement);
    const htmlLegendPlugin = this.getHtmlLegendPlugin(
      this.legendContainer,
      this.selectMode,
      this.chartCommonLegendService
    );
    this.lineChartPlugins.push(...htmlLegendPlugin);
    this.lineChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
        datalabels: {
          display: false,
        },
        tooltip: {
          enabled: false,
          external: (context: Context) => {
            this.genericTooltipService.createTooltip(
              context,
              this.getTooltipData.bind(this),
              {
                chartType: TooltipChartType.LINE_CHART,
                firstLineLabel: this.tooltipFirstLine(),
                secondLineLabel: this.tooltipSecondLine(),
              },
              this.patternsColors(),
              this.patternsOrderedList(),
              this.disableAccessibility
            );
          },
        },
      },
      scales: {
        x: {
          offset: true,
          title: {
            display: this.xAxisTitle !== null,
            text: this.xAxisTitle,
          },
        },
        y: {
          type: "linear" as const,
          display: true,
          title: {
            display: this.yAxisTitle !== null,
            text: this.yAxisTitle,
          },
          suggestedMin: this.suggestedMin,
          suggestedMax: this.suggestedMax,
          position: "left" as const,
          grid: {
            drawOnChartArea: true,
          },
          ticks: {
            callback: (val: number | string) => {
              const unit = this.lines[0].unit;
              return `${this.formatUtilitiesService.formatWithThousandsSeparators(
                val as number
              )} ${unit ?? ""}`;
            },
          },
        },
      },
    };

    this.lineChartOptions.onHover = (
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

  public initializeChartData() {
    this.lineChartData = {
      labels: this.labels.map((label: string) => label),
      datasets: this.lines.map((line: any, index) => {
        return {
          type: "line" as const,
          borderColor: this.patternsColors()[index],
          pointStyle: this.getLinePointStyle(index),
          pointBackgroundColor: this.patternsColors()[index],
          pointRadius: 6,
          pointHoverRadius: 8,
          label: line.label,
          data: line.data,
          borderWidth: 2,
          fill: false,
        };
      }),
    };
  }

  public getHtmlLegendPlugin(
    legendContainer: BehaviorSubject<HTMLElement | null>,
    selectMode: BehaviorSubject<boolean>,
    chartCommonLegendService: ChartCommonLegendService
  ) {
    const createLegendElementWithCheckbox =
      this.createLegendElementWithCheckbox.bind(this);
    return [
      {
        id: "htmlLegend",
        afterUpdate(chart: any) {
          const ul = chartCommonLegendService.getOrCreateLegendList(
            legendContainer,
            "column"
          );
          ul.style.display = "flex";
          ul.style.flexDirection = "row";
          ul.style.margin = "1.375rem 1.0625rem";
          while (ul.firstChild) {
            ul.firstChild.remove();
          }
          const items =
            chart.options.plugins.legend.labels.generateLabels(chart);
          items.forEach((item: ChartItem) => {
            const li = chartCommonLegendService.createHtmlLegendListElement(
              chart,
              selectMode,
              item.datasetIndex
            );
            let liContent: HTMLElement;
            if (!selectMode.value) {
              liContent =
                chartCommonLegendService.createLegendElementWithSquareArea(
                  item
                );
            } else {
              liContent = createLegendElementWithCheckbox(chart, item);
            }
            liContent.style.boxSizing = "border-box";
            li.style.marginRight = "10px";
            li.appendChild(liContent);
            li.appendChild(
              chartCommonLegendService.createHtmlLegendItemText(item)
            );
            ul.appendChild(li);
          });
        },
      },
    ];
  }

  public createLegendElementWithCheckbox(chart: any, item: ChartItem) {
    const liContent = this.chartCommonLegendService.createLegendCheckbox(
      chart,
      item,
      null as unknown as string[]
    );
    liContent.onclick = (e: Event) => {
      this.chartCommonLegendService.switchItemVisibility(
        chart,
        item.datasetIndex,
        this.selectMode
      );
      e.stopPropagation();
    };
    return liContent;
  }

  // computed to make the colors list reactive to the props
  private patternsColors(): string[] {
    return this.newPatternsOrder.length !== 6
      ? this.colourSets[this.colourSet]
      : this.newPatternsOrder.map((id) => {
          return this.colourSets[this.colourSet][id];
        });
  }

  // computed to make the patterns list reactive to the props
  private patternsOrderedList(): ((
    hover: boolean,
    color: string,
    disableAccessibility: boolean
  ) => CanvasPattern)[] {
    return this.newPatternsOrder.length !== this.patternsStandardList.length
      ? this.patternsStandardList
      : this.newPatternsOrder.map((id) => {
          return this.patternsStandardList[id];
        });
  }

  private getTooltipData(context: Context): string {
    const datasetIndex = context.tooltip.dataPoints[0].datasetIndex as number;
    const dataIndex = context.tooltip.dataPoints[0].dataIndex as number;
    const formattedValue = this.lines[datasetIndex].data[dataIndex].toFixed(2);
    return this.lines[datasetIndex].unit
      ? formattedValue + " " + this.lines[datasetIndex].unit
      : formattedValue;
  }

  private tooltipFirstLine(): string {
    return this.tooltipFirstLineLabel;
  }

  private tooltipSecondLine(): string {
    return this.tooltipSecondLineLabel;
  }

  private getLinePointStyle(index: number): string {
    if (index === 1) {
      return "circle";
    } else {
      return "rectRot";
    }
  }
}
