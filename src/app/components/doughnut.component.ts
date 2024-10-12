import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { NgChartsModule, BaseChartDirective } from "ng2-charts";
import { ChartOptions } from "chart.js";
import { CustomLegendComponent } from "./custom-legend.component";
import chartDesign from "../patterns/chart-design";
import {
  centerTextPlugin,
  customLabelsPlugin,
} from "../plugins/doughnut-plugins";
import {
  DoughnutChartData,
  DoughnutData,
  DoughnutPlugin,
} from "../types/doughnut-data";
import { CommonModule } from "@angular/common";
import { DoughnutService } from "../services/doughnut.service";
import {
  Context,
  GenericTooltipService,
} from "../services/generic-tooltip.service";
import { formatWithThousandsSeprators } from "../services/format-utilities";
import { TooltipChartType } from "../types/tooltip-chart-type";

@Component({
  selector: "moz-angular-doughnut",
  standalone: true,
  imports: [NgChartsModule, CustomLegendComponent, CommonModule],
  providers: [DoughnutService],
  template: `
    <div class="container">
      <div class="main">
        <canvas
          baseChart
          [data]="doughnutChartData"
          [options]="doughnutChartOptions"
          [plugins]="doughnutPlugins"
          [type]="'doughnut'"
        >
        </canvas>
      </div>
    </div>
  `,
  styles: [
    `
      .container {
        font-weight: 400;
        font-family: "Roboto", sans-serif;
        width: 400px;
      }
    `,
  ],
})
export class DoughnutComponent implements OnInit {
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
   * Enable/Disable centered label in the middle of the <canvas> element
   */
  @Input() enableCenteredLabel: boolean = true;

  /**
   * Add centered label in the middle of the <canvas> element
   * - Default value is "Data"
   */
  @Input() centeredLabel: string = "Data";

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
   * Maximum number of data to be displayed in the Chart
   */
  @Input() maxValues: number = 5;

  /**
   * Value of the 'others' label if maxValue is reached
   */
  @Input() othersLabel: string = "others";

  /**
   * Enable hover feature (may cause strange behavior when used with width and height in %)
   */
  @Input() enableHoverFeature: boolean = false;

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  public doughnutPlugins: DoughnutPlugin[] = [];
  public readonly colors = chartDesign().colourSets[this.colourSet];

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
        display: true,
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

  constructor(
    private readonly doughnutService: DoughnutService,
    private readonly genericTooltipService: GenericTooltipService
  ) {}

  ngOnInit() {
    this.doughnutPlugins = [customLabelsPlugin()];
    if (this.enableHoverFeature) {
      this.doughnutChartOptions.onHover = (event, activeElements, chart) => {
        if (chart) {
          this.doughnutService.getOnHoverOptions(activeElements);
        }
      };
    }
    if (this.enableCenteredLabel) {
      this.doughnutPlugins.push(
        centerTextPlugin(this.data[0]?.unit ?? "", this.centeredLabel)
      );
    }
    this.doughnutChartData = {
      labels: this.doughnutService.getDoughnutLabels(
        this.labels,
        this.data,
        this.maxValues,
        this.othersLabel
      ),
      datasets: [
        {
          data: this.groupedData().map((x) => x.value),
          borderWidth: 3,
          borderColor: this.colors,
          backgroundColor: this.doughnutService.getBackgroundColor(
            this.getPatternColors(),
            this.patternsOrderedList(),
            this.disableAccessibility,
            this.enableHoverFeature
          ),
        },
      ],
    };
    this.doughnutChartOptions.spacing = this.data.length * 2;
    let animationFrameId: number | null = null;
    this.doughnutService.onHoverIndex.subscribe((index) => {
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }

      animationFrameId = requestAnimationFrame(() => {
        this.doughnutChartData.datasets[0].backgroundColor =
          this.doughnutService.getBackgroundColor(
            this.getPatternColors(),
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
            this.disableAccessibility
          );
        },
      },
    };
  }

  private groupedData(): DoughnutData[] {
    return this.doughnutService.groupDataAfterNthValue(
      this.data,
      this.maxValues
    );
  }

  private getPatternColors(): string[] {
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
    const value = formatWithThousandsSeprators(tooltipData.value);
    const unit = tooltipData.unit ?? "";
    return `${value}${unit}`;
  }
}
