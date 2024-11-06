import { ChartData } from "chart.js";

export interface LineData {
  label: string;
  data: number[];
  unit?: string;
}

export type LineChartData = ChartData<"bar", number[]>;
