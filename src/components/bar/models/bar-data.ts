import { ChartData, Plugin } from "chart.js";
type AnyObject = Record<string, any>;

export interface DataBarData {
  amount: number;
  amountUnit: string;
  rate: number;
}

export interface BarData {
  label: string;
  backgroundColor?: string;
  data: DataBarData[];
  stack?: number;
}
export type BarPlugin = Plugin<"bar", AnyObject>;
export type BarChartData = ChartData<"bar", number[]>;
