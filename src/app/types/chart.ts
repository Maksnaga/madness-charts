import { Plugin } from "chart.js";

export interface ChartData {
  data: any;
  loading: boolean;
  error: boolean;
}

export type HTMLLegendPlugin = Plugin<
  "bar" | "doughnut" | "line",
  Record<string, any>
>;
