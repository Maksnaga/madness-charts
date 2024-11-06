import { ChartData, Plugin } from "chart.js";
type AnyObject = Record<string, any>;

export interface LineData {
  label: string;
  data: number[];
  unit?: string;
}

export type LinePlugin = Plugin<"line", AnyObject>;
export type LineChartData = ChartData<"line", number[]>;
