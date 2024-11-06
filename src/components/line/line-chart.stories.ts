import type { Meta, StoryObj } from "@storybook/angular";
import { LineChartComponent } from "./line-chart.component";

const meta: Meta<LineChartComponent> = {
  title: "Charts/Line",
  component: LineChartComponent,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<LineChartComponent>;

export const Default = {
  args: {
    width: "600px",
    height: "400px",
    labels: ["Data One", "Data Two", "Data Three"],

    lines: [
      {
        label: "Data One",
        data: [-22, 34, 11],
        unit: "%",
      },
      {
        label: "Data Two",
        data: [-3, 28, 35],
        unit: "%",
      },
    ],

    xAxisTitle: "X Axis Title",
    yAxisTitle: "Y Axis Title",
    colourSet: 0
  },
} satisfies Story;

export const MultipleData = {
  args: {
    width: "600px",
    height: "400px",
    labels: [
      "Data One",
      "Data Two",
      "Data Three",
      "Data Four",
      "Data Five",
      "Data Six",
    ],
    lines: [
      {
        label: "Data One",
        data: [-22, 34, 11, 1, 22, 21],
        unit: "%",
      },
      {
        label: "Data Two",
        data: [-3, 28, 35, 10, 3, 18],
        unit: "%",
      },
    ],
  },
} satisfies Story;

export const LineChartWithSuggestedMinAndSuggestedMax = {
  args: {
    width: "600px",
    height: "400px",
    labels: ["Data One", "Data Two", "Data Three"],
    lines: [
      {
        label: "Data One",
        data: [20, 34, 11],
        unit: "€",
      },
      {
        label: "Data Two",
        data: [45, 28, 35],
        unit: "€",
      },
    ],
    xAxisTitle: "X Axis Title",
    yAxisTitle: "Y Axis Title",
    suggestedMin: 0,
    suggestedMax: 50,
  },
} satisfies Story;
