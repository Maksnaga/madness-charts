import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from "@angular/core";
import { NgChartsModule } from "ng2-charts";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  Plugin,
  ChartOptions,
} from "chart.js";

import { CommonModule } from "@angular/common";

import { CheckboxModule } from "@mozaic-ds/angular/adeo";
import { BarChartData, BarData, BarPlugin } from "../../types/bar-data";
import chartDesign from "../../patterns/chart-design";
import { BarChartFunctionsService } from "../../services/bar-chart-functions.service";
import {
  Context,
  GenericTooltipService,
} from "../../services/generic-tooltip.service";
import { FormatUtilitiesService } from "../../services/format-utilities.service";
import { TooltipChartType } from "../../types/tooltip-chart-type";
import { BehaviorSubject } from "rxjs";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

@Component({
  selector: "moz-ng-bar-chart",
  standalone: true,
  imports: [NgChartsModule, CommonModule, CheckboxModule],
  templateUrl: "./bar-chart.component.html",
  styleUrl: "./bar-chart.component.scss",
})
export class BarChartComponent implements AfterViewInit {
  @ViewChild("legendContainer", { read: ElementRef })
  legendContainerElementRef?: ElementRef;

  selectMode = new BehaviorSubject<boolean>(false);
  legendContainer = new BehaviorSubject<HTMLElement | null>(null);

  public xValue?: string;
  public yValue?: string;
  public barChartData: BarChartData = {
    labels: [],
    datasets: [],
  };

  /**
   * Value of the id attribute present on the <canvas> tag element the chart
   */
  @Input() chartId: string = "radar-chart";

  /**
   * Unit of values on canvas Y axis
   */
  @Input() unit: string = "%";

  /**
   * Labels used to label the index axis (default x axes). See [Data structures documentation](https://www.chartjs.org/docs/latest/general/data-structures.html)
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
   * 6 patterns exist and are not randomly given but follow the order defined in [patternsStandardList](/src/services/patterns/ChartDesign.ts)
   * Additionally, a pattern has only one possible colour per colour set as defined in the Figma prototype.
   * In some use cases, the chart may need to show a different orders of these patterns, this can be changed using the props newPatternsOrder
   */
  @Input() newPatternsOrder: number[] = [0, 1, 2, 3, 4, 5];

  /**
   * Value of the `datasets` key present in the `data` object passed to the Chart config
   * If it's the stacked barchart (stacked : true in props), each dataset may contain the stack it belongs. stack Zero if not defined
   */
  @Input() datasets: BarData[] = [];

  /**
   * Value of the `width` css property used to define the width of the <canvas> element
   */
  @Input() width: string = "400px";

  /**
   * Value of the `height` css property used to define the height of the <canvas> element
   */
  @Input() height: string = "300px";

  /**
   * Add custom CSS styles to the <canvas> element
   */
  @Input() styles: Partial<CSSStyleDeclaration> = {};

  /**
   * Value of the `plugins` key passed to the Chart config
   */
  @Input() plugins: Plugin<"bar">[] = [];

  /**
   * Activates "stacked" mode
   */
  @Input() stacked: boolean = false;

  /**
   * Disable accessibility patterns
   */
  @Input() disableAccessibility: boolean = false;

  /**
   * Enable hover feature (may cause strange behavior when used with width and height in %)
   */
  @Input() enableHoverFeature: boolean = false;

  /**
   * X axis title
   */
  @Input() xAxisTitle: string | null = null;

  /**
   * Y axis title
   */
  @Input() yAxisTitle: string | null = null;

  /**
   * Label of the first line in the Tooltip
   */
  @Input() tooltipFirstLineLabel = "content";

  /**
   * Label of the second line in the Tooltip
   */
  @Input() tooltipSecondLineLabel = "content2";

  public barChartOptions!: ChartOptions<"bar">;

  public barChartPlugins: BarPlugin[] = [];

  private readonly colourSets = chartDesign().colourSets;
  private readonly patternsStandardList = chartDesign().patternsStandardList;

  constructor(
    private readonly barChartFunctionService: BarChartFunctionsService,
    private readonly formatUtilitiesService: FormatUtilitiesService,
    private readonly genericTooltipService: GenericTooltipService
  ) {}

  ngAfterViewInit(): void {
    this.legendContainer.next(this.legendContainerElementRef?.nativeElement);
    const chartsLabels = this.getChartLabels(this.indexOfOthersLabelIfNull());
    this.gettooltipContent();
    this.initializeChartOptions();
    this.barChartData = {
      labels: chartsLabels,
      datasets: this.barChartFunctionService.getStackedDatasets(
        this.datasets.map((dataset, index) => ({
          data: this.getChartData(index, this.indexOfOthersLabelIfNull()),
          label: this.datasets[index].label,
          stack: dataset.stack ?? 0,
        })),
        this.stacked,
        this.disableAccessibility,
        this.patternsColors(),
        this.patternsOrderedList(),
        0
      ),
    };
    this.barChartPlugins.push(
      this.barChartFunctionService.privateGetHtmlLegendPlugin(
        this.legendContainer,
        this.selectMode,
        this.disablePattern(),
        this.patternsColors(),
        this.patternsOrderedList(),
        this.enableHover()
      ) as unknown as BarPlugin
    );
  }

  // Méthode privée pour initialiser les options du graphique
  private initializeChartOptions(): void {
    this.barChartOptions = {
      elements: {
        bar: {
          borderSkipped: false,
        },
      },
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: false,
        },
        tooltip: {
          enabled: false,
          external: (context: Context) => {
            const dataIndex: number =
              context.tooltip.dataPoints?.[0].dataIndex ?? 0;
            if (!this.labels[dataIndex] || this.labels[dataIndex] === "") {
              return;
            }
            this.genericTooltipService.createTooltip(
              context,
              this.getTooltipData.bind(this),
              {
                chartType: TooltipChartType.BAR_CHART,
                firstLineLabel: this.xValue,
                secondLineLabel: this.yValue,
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
          stacked: this.stacked,
          title: {
            display: this.xAxisTitle !== null,
            text: this.xAxisTitle ?? "",
          },
        },
        y: {
          stacked: this.stacked,
          title: {
            display: this.yAxisTitle !== null,
            text: this.yAxisTitle ?? "",
          },
          ticks: {
            callback: (val: string | number): string => {
              return this.unit === "%"
                ? this.formatUtilitiesService.formatTicks(
                    val as number,
                    this.unit
                  )
                : this.formatUtilitiesService.formatWithThousandsSeparators(
                    val as number
                  ) +
                    " " +
                    this.unit;
            },
          },
        },
      },
    };
  }

  private getChartLabels(indexOfValueToHide: number | null): string[] {
    const labels = Object.assign([], this.labels);
    if (indexOfValueToHide) {
      labels.splice(indexOfValueToHide, 1);
    }

    return labels.map((label: string) => label);
  }

  private indexOfOthersLabelIfNull(): number | null {
    const labels = this.labels;
    if (labels.includes("other")) {
      const index = labels.indexOf("other");
      if (
        this.datasets[0].data[index].rate + "" === "0" &&
        this.datasets[1].data[index].rate + "" === "0"
      ) {
        return index;
      }
    }
    return null;
  }

  // computed to make the colors list reactive to the props
  private patternsColors(): string[] {
    return this.newPatternsOrder.length !== this.patternsStandardList.length
      ? this.colourSets[this.colourSet]
      : this.newPatternsOrder.map((id) => {
          return this.colourSets[this.colourSet][id];
        });
  }

  // computed to make the patterns list reactive to the props
  private patternsOrderedList() {
    return this.newPatternsOrder.length !== this.patternsStandardList.length
      ? this.patternsStandardList
      : this.newPatternsOrder.map((id) => {
          return this.patternsStandardList[id];
        });
  }

  private disablePattern(): boolean {
    return this.disableAccessibility;
  }

  private enableHover(): boolean {
    return this.enableHoverFeature;
  }

  private gettooltipContent(): void {
    this.xValue = this.tooltipFirstLineLabel;
    this.yValue = this.tooltipSecondLineLabel;
  }

  private getChartData(
    index: number,
    indexOfValueToHide: number | null,
    isStacked: boolean = false
  ): number[] {
    const data = Object.assign([], this.datasets[index].data);
    if (indexOfValueToHide) {
      data.splice(indexOfValueToHide, 1);
    }

    return data.map(
      (data: { rate?: number; amount?: number }) =>
        (this.unit === "%" ? data.rate : data.amount) as number
    );
  }

  private getTooltipData(context: Context): string {
    const datasetIndex = context.tooltip.dataPoints[0].datasetIndex as number;
    const dataIndex = context.tooltip.dataPoints[0].dataIndex as number;
    const rate: string = context.tooltip.body[0].lines[0].split(":")[1];
    const rawdata = this.datasets[datasetIndex].data[dataIndex];
    const percent = rawdata.rate
      ? parseFloat(rate.replace(",", ".")).toFixed(2) + "% "
      : "";
    const amountUnit = rawdata.amountUnit ? rawdata.amountUnit : "";
    const data = rawdata.amount
      ? this.formatUtilitiesService.formatWithThousandsSeparators(
          rawdata.amount
        )
      : "";
    return percent + (percent && data ? "/ " : "") + data + amountUnit;
  }
}
