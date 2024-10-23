import { ChartData } from "chart.js";

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

export type BarChartData = ChartData<"bar", number[]>;
