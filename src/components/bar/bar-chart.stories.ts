// DoughnutChart.stories.ts;

import type { Meta, StoryObj } from "@storybook/angular";
import { BarChartComponent } from "./bar-chart.component";

const meta: Meta<BarChartComponent> = {
  title: "Charts/Bar",
  component: BarChartComponent,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<BarChartComponent>;

export const Default = {
  args: {
    width: "500px",
    height: "400px",
    tooltipFirstLineLabel: "content",
    tooltipSecondLineLabel: "content2",
    disableAccessibility: false,
    newPatternsOrder: [0, 4, 1, 2, 3, 5],
    labels: ["Data One", "Data Two", "Data Three"],
    colourSet: 0,
    xAxisTitle: "X Axis Title",
    yAxisTitle: "Y Axis Title",
    datasets: [
      {
        label: "Data One",
        data: [
          {
            amount: 163790.23,
            rate: 1.719528,
            amountUnit: "€",
          },
          {
            amount: 217064,
            rate: 2.278815,
            amountUnit: "€",
          },
          {
            amount: 9144447.23,
            rate: 96.0016569,
            amountUnit: "€",
          },
        ],
      },
      {
        label: "Data Two",
        data: [
          {
            amount: 103144.22,
            rate: 1.1232806,
            amountUnit: "€",
          },
          {
            amount: 297474.14,
            rate: 3.2396087,
            amountUnit: "€",
          },
          {
            amount: 8781791.1,
            rate: 95.6371107,
            amountUnit: "€",
          },
        ],
      },
    ],
    unit: "%",
  },
} satisfies Story;

export const MultipleData = {
  args: {
    width: "700px",
    height: "400px",
    tooltipFirstLineLabel: "content",
    tooltipSecondLineLabel: "content2",
    disableAccessibility: false,
    labels: [
      "Data One",
      "Data Two",
      "Data Three",
      "Data Four",
      "Data Five",
      "Data Six",
      "Data Seven",
      "Data Eight",
      "Data Nine",
      "Data Ten",
      "Data Eleven",
      "Data Twelve",
    ],
    colourSet: 1,
    datasets: [
      {
        label: "Data One",
        data: [
          {
            amount: 163790.23,
            rate: 1.719528,
            amountUnit: "€",
          },
          {
            amount: 217064,
            rate: 2.278815,
            amountUnit: "€",
          },
          {
            amount: 9144447.23,
            rate: 6.0016569,
            amountUnit: "€",
          },
          {
            amount: 9144447.23,
            rate: 46.0016569,
            amountUnit: "€",
          },
          {
            amount: 9144447.23,
            rate: 66.0016569,
            amountUnit: "€",
          },
          {
            amount: 9144447.23,
            rate: 9.0016569,
            amountUnit: "€",
          },
          {
            amount: 9144447.23,
            rate: 46.0016569,
            amountUnit: "€",
          },
          {
            amount: 9144447.23,
            rate: 26.0016569,
            amountUnit: "€",
          },
          {
            amount: 9144447.23,
            rate: 81.0016569,
            amountUnit: "€",
          },
          {
            amount: 9144447.23,
            rate: 11.0016569,
            amountUnit: "€",
          },
          {
            amount: 9144447.23,
            rate: 90.0016569,
            amountUnit: "€",
          },
          {
            amount: 9144447.23,
            rate: 50.0016569,
            amountUnit: "€",
          },
        ],
      },
      {
        label: "Data Two",
        data: [
          {
            amount: 103144.22,
            rate: 1.1232806,
            amountUnit: "€",
          },
          {
            amount: 297474.14,
            rate: 3.2396087,
            amountUnit: "€",
          },
          {
            amount: 8781791.1,
            rate: 95.6371107,
            amountUnit: "€",
          },
          {
            amount: 8781791.1,
            rate: 45.6371107,
            amountUnit: "€",
          },
          {
            amount: 8781791.1,
            rate: 40.6371107,
            amountUnit: "€",
          },
          {
            amount: 8781791.1,
            rate: 6.6371107,
            amountUnit: "€",
          },
          {
            amount: 8781791.1,
            rate: 7.6371107,
            amountUnit: "€",
          },
          {
            amount: 8781791.1,
            rate: 39.6371107,
            amountUnit: "€",
          },
          {
            amount: 8781791.1,
            rate: 30.6371107,
            amountUnit: "€",
          },
          {
            amount: 8781791.1,
            rate: 50.6371107,
            amountUnit: "€",
          },
          {
            amount: 8781791.1,
            rate: 59.6371107,
            amountUnit: "€",
          },
          {
            amount: 8781791.1,
            rate: 4.6371107,
            amountUnit: "€",
          },
        ],
      },
    ],
    unit: "%",
  },
} satisfies Story;

export const StackedBarChart = {
  args: {
    width: "700px",
    height: "400px",
    tooltipFirstLineLabel: "content",
    tooltipSecondLineLabel: "content2",
    disableAccessibility: false,
    stacked: true,
    labels: ["Category One", "Category Two", "Category Three"],
    colourSet: 3,
    datasets: [
      {
        label: "Dataset One",
        stack: 0,
        data: [
          {
            amount: 103144.22,
            rate: 100.1232806,
            amountUnit: "€",
          },
          {
            amount: 297474.14,
            rate: 3.2396087,
            amountUnit: "€",
          },
          {
            amount: 8781791.1,
            rate: 95.6371107,
            amountUnit: "€",
          },
        ],
      },
      {
        label: "Dataset Two",
        stack: 1,
        data: [
          {
            amount: 103144.22,
            rate: 1.1232806,
            amountUnit: "€",
          },
          {
            amount: 297474.14,
            rate: 3.2396087,
            amountUnit: "€",
          },
          {
            amount: 8781791.1,
            rate: 95.6371107,
            amountUnit: "€",
          },
        ],
      },
      {
        label: "Dataset Three",
        stack: 1,
        data: [
          {
            amount: 103144.22,
            rate: 1.1232806,
            amountUnit: "€",
          },
          {
            amount: 297474.14,
            rate: 3.2396087,
            amountUnit: "€",
          },
          {
            amount: 8781791.1,
            rate: 95.6371107,
            amountUnit: "€",
          },
        ],
      },
    ],
    unit: "%",
  },
} satisfies Story;
