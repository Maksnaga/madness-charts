import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { NgChartsModule, BaseChartDirective } from "ng2-charts";
import { ChartOptions } from "chart.js";
import { CustomLegendComponent } from "./custom-legend.component";
import chartDesign from "./patterns/chart-design";
import {
  centerTextPlugin,
  customLabelsPlugin,
} from "./plugins/doughnut-plugins";
import { DoughnutChartData, DoughnutData } from "./types/doughnut-data";
import {
  getDoughnutLabels,
  groupDataAfterNthValue,
} from "./services/doughnut.service";
import { CommonModule } from "@angular/common";

@Component({
  selector: "moz-angular-doughnut",
  standalone: true,
  imports: [NgChartsModule, CustomLegendComponent, CommonModule],
  template: `<div style="width:400px">
    <canvas
      baseChart
      [data]="doughnutChartData"
      [options]="doughnutChartOptions"
      [plugins]="chartPlugins"
      [type]="'doughnut'"
    >
    </canvas>
  </div>`,
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
   * Add centered label in the middle of the <canvas> element
   */
  @Input() enableCenteredLabel: boolean = true;

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

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  private hoverIndex: number | null = null;

  public chartPlugins = [centerTextPlugin("Total"), customLabelsPlugin()];
  public legendItems: any[] = [];

  public readonly patterns: CanvasPattern[] = [];
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
    spacing: 12,
    cutout: "70%",
    layout: {
      padding: {
        top: 50,
        right: 50,
        bottom: 50,
        left: 50,
      },
    },
    onHover: (event, activeElements, chart) => {
      const target = event.native?.target as HTMLElement;

      if (chart) {
        chart.canvas.addEventListener("mousemove", (event: MouseEvent) => {
          const points = chart.getElementsAtEventForMode(
            event,
            "nearest",
            { intersect: true },
            false
          );
          if (points.length) {
            const firstPoint = points[0];
            this.updateHoverPattern(firstPoint.index);
          } else {
            this.resetPatterns();
          }
        });
      }
      if (activeElements && activeElements.length > 0) {
        target.style.cursor = "pointer";
      } else {
        target.style.cursor = "default";
      }
    },
  };

  ngOnInit() {
    this.initLegendItems();
    this.doughnutChartData = {
      labels: getDoughnutLabels(
        this.labels,
        this.data,
        this.maxValues,
        this.othersLabel
      ),
      datasets: [
        {
          data: [300, 240, 180, 120, 360, 222],
          borderWidth: 3,
          borderColor: this.colors,
          backgroundColor: (context: any) => {
            const index = context.dataIndex;
            const value = context.dataset.data[index];
            const hover = index === this.hoverIndex;

            return value > 0
              ? this.getPatternForIndex(index, hover)
              : "transparent";
          },
        },
      ],
    };
  }

  private groupedData(): DoughnutData[] {
    return groupDataAfterNthValue(this.data, this.maxValues);
  }

  private updateHoverPattern(index: number) {
    if (this.hoverIndex !== index) {
      this.hoverIndex = index;
    }
  }

  private resetPatterns() {
    if (this.hoverIndex !== null) {
      this.hoverIndex = null;
    }
  }

  public onLegendToggle(index: number): void {
    this.legendItems[index].active = !this.legendItems[index].active;
    this.chart?.chart?.toggleDataVisibility(index);
    this.chart?.update();
  }

  private initLegendItems(): void {
    this.legendItems = this.doughnutChartData.labels!.map((label, index) => ({
      text: label,
      active: true,
      pattern: this.patterns[index],
    }));
  }

  private getPatternForIndex(
    index: number,
    hover: boolean,
    disabledAccessibility: boolean = false
  ): CanvasPattern | string {
    const patterns = chartDesign().patternsStandardList;

    if (index >= 0 && index < patterns.length) {
      return patterns[index](hover, this.colors[index], disabledAccessibility);
    }

    return "transparent";
  }
}
