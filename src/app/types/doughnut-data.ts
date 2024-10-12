import { ChartData, Plugin } from "chart.js";

type AnyObject = Record<string, any>;

export interface DoughnutData {
  tooltipLabel?: number;
  value: number;
  unit?: string;
}

export type DoughnutPlugin = Plugin<"doughnut", AnyObject>;

export type DoughnutChartData = ChartData<"doughnut", number[]>;
