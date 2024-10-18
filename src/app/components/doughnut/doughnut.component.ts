import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { NgChartsModule, BaseChartDirective } from "ng2-charts";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Plugin,
  ChartOptions,
} from "chart.js";
import chartDesign from "../../patterns/chart-design";
import {
  DoughnutChartData,
  DoughnutData,
  DoughnutPlugin,
} from "../../types/doughnut-data";
import { CommonModule } from "@angular/common";
import {
  Context,
  GenericTooltipService,
} from "../../services/generic-tooltip.service";
import { TooltipChartType } from "../../types/tooltip-chart-type";
import { DoughnutChartFunctionsService } from "../../services/doughnut-chart-functions.service";
import { FormatUtilitiesService } from "../../services/format-utilities.service";
import { CustomLegendComponent } from "./custom-legend.component";
ChartJS.register(Title, Tooltip, Legend, ArcElement);

@Component({
  selector: "moz-angular-doughnut",
  standalone: true,
  imports: [NgChartsModule, CustomLegendComponent, CommonModule],
  providers: [DoughnutChartFunctionsService, FormatUtilitiesService],
  templateUrl: "./doughnut.component.html",
  styleUrl: "./doughnut.component.scss",
})
export class DoughnutComponent implements OnInit {
  public json = JSON;
  /**
   * Value of the id attribute present on the <canvas> element containing the chart
   */
  @Input() chartId: string = "doughnut-chart";

  /**
   * Data to be passed to Chart
   */
  @Input() data: DoughnutData[] = [];

  /**
   * Labels used to label the index axis (default x axes). See [Data structures documentation](https://www.chartjs.org/docs/latest/general/data-structures.html)
   */
  @Input() labels: string[] = [];

  /**
   * Add custom CSS classes to the <canvas> element
   */
  @Input() cssClasses: string | undefined = undefined;

  /**
   * Enable/Disable centered label in the middle of the <canvas> element
   */
  @Input() enableCenteredLabel: boolean = true;

  /**
   * Disable accessibility patterns
   */
  @Input() disableAccessibility: boolean = false;

  /**
   * Enable hover feature (may cause strange behavior when used with width and height in %)
   */
  @Input() enableHoverFeature: boolean = false;

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
   * Value of the `width` css property used to define the width of the <canvas> element
   */
  @Input() width: string = "400px";

  /**
   * Value of the `height` css property used to define the height of the <canvas> element
   */
  @Input() height: string = "400px";

  /**
   * Maximum number of data to be displayed in the Chart
   */
  @Input() maxValues: number = 5;

  /**
   * Add custom CSS styles to the <canvas> element
   */
  @Input() styles: Partial<CSSStyleDeclaration> = {};

  /**
   * Value of the `plugins` key passed to the Chart config
   */
  @Input() plugins: Plugin<"doughnut">[] = [];

  /**
   * Value of the 'others' label if maxValue is reached
   */
  @Input() othersLabel: string = "others";

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  public doughnutPlugins: DoughnutPlugin[] = [];

  public doughnutChartData: DoughnutChartData = {
    labels: [],
    datasets: [
      {
        data: [],
      },
    ],
  };

  public doughnutChartOptions: ChartOptions<"doughnut"> = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: "bottom",
        align: "start",
        labels: {
          pointStyle: "rectRounded",
          usePointStyle: true,
        },
      },
      title: {
        display: false,
      },
    },
    spacing: 0,
    cutout: "70%",
    layout: {
      padding: {
        top: 50,
        right: 50,
        bottom: 50,
        left: 50,
      },
    },
  };
  public readonly colors = this.patternsColors();

  constructor(
    public readonly doughnutChartFunctionsService: DoughnutChartFunctionsService,
    private readonly genericTooltipService: GenericTooltipService,
    private readonly formatUtilitiesService: FormatUtilitiesService
  ) {}

  ngOnInit() {
    if (this.enableHoverFeature) {
      this.doughnutChartOptions.onHover = (chart) => {
        if (chart) {
          this.doughnutChartFunctionsService.getOnHoverOptions();
        }
      };
    }
    this.doughnutPlugins.push(
      this.doughnutChartFunctionsService.getCenteredLabelPlugin(this.data)
    );

    this.doughnutChartData = {
      labels: this.doughnutChartFunctionsService.getDoughnutLabels(
        this.labels,
        this.data,
        this.maxValues,
        this.othersLabel
      ),
      datasets: [
        {
          data: this.groupedData().map((x) => x.value),
          backgroundColor:
            this.doughnutChartFunctionsService.getBackgroundColor(
              this.patternsColors(),
              this.patternsOrderedList(),
              this.disableAccessibility,
              this.enableHoverFeature
            ),
          borderColor: this.doughnutChartFunctionsService.getBorderColor(
            this.patternsColors(),
            this.enableHoverFeature
          ),
        },
      ],
    };
    (this.doughnutChartData as any).datasets[0].raw_value =
      this.groupedData().map((x) => x.value);
    this.doughnutChartOptions.spacing = this.data.length * 2;
    let animationFrameId: number | null = null;
    this.doughnutChartFunctionsService.onHoverIndex.subscribe((index) => {
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }

      animationFrameId = requestAnimationFrame(() => {
        this.doughnutChartData.datasets[0].backgroundColor =
          this.doughnutChartFunctionsService.getBackgroundColor(
            this.patternsColors(),
            this.patternsOrderedList(),
            this.disableAccessibility,
            this.enableHoverFeature
          );
        this.chart?.update();
      });
    });

    this.doughnutChartOptions.plugins = {
      ...this.doughnutChartOptions.plugins,
      tooltip: {
        enabled: false,
        external: (context: Context) => {
          this.genericTooltipService.createTooltip(
            context,
            this.getTooltipData.bind(this),
            {
              chartType: TooltipChartType.DOUGHNUT,
            },
            this.colors,
            this.patternsOrderedList(),
            this.disablePattern()
          );
        },
      },
    };
  }

  private disablePattern(): boolean {
    return this.disableAccessibility;
  }

  private groupedData(): DoughnutData[] {
    return this.doughnutChartFunctionsService.groupDataAfterNthValue(
      this.data,
      this.maxValues
    );
  }

  private patternsColors(): string[] {
    return this.newPatternsOrder.length !== 6
      ? chartDesign().colourSets[this.colourSet]
      : this.newPatternsOrder.map((id) => {
          return chartDesign().colourSets[this.colourSet][id];
        });
  }

  private patternsOrderedList() {
    return this.newPatternsOrder.length !== 6
      ? chartDesign().patternsStandardList
      : this.newPatternsOrder.map((id) => {
          return chartDesign().patternsStandardList[id];
        });
  }

  private getTooltipData(context: Context): string {
    const dataIndex = context.tooltip.dataPoints[0].dataIndex as number;
    const tooltipData = this.groupedData()[dataIndex];
    const rate = this.formatUtilitiesService.formatWithThousandsSeparators(
      tooltipData.rate
    );
    const value = this.formatUtilitiesService.formatWithThousandsSeparators(
      tooltipData.value
    );
    const unit = tooltipData.unit ?? "";
    return `${value}${unit} (${rate})%`;
  }
}
