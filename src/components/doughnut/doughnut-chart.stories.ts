// DoughnutChart.stories.ts;

import type { Meta, StoryObj } from "@storybook/angular";
import { DoughnutChartComponent } from "./doughnut-chart.component";

const meta: Meta<DoughnutChartComponent> = {
  title: "Charts/Doughnut",
  component: DoughnutChartComponent,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<DoughnutChartComponent>;

export const Default = {
  args: {
    height: "400px",
    width: "400px",
    labels: ["Data One", "Data Two"],
    enableCenteredLabel: true,
    disableAccessibility: false,
    data: [
      {
        value: 2771824.19,
        unit: "€",
        rate: 30.186240355262925,
      },
      {
        value: 1715453.65,
        unit: "€",
        rate: 18.68195550931139,
      },
    ],
    maxValues: 2,
    colourSet: 5,
  },
} satisfies Story;

export const MultipleData = {
  args: {
    height: "400px",
    width: "400px",

    labels: [
      "Data One",
      "Data Two",
      "Data Three",
      "Data Four",
      "Data Five",
      "Data Six",
    ],

    maxValues: 3,
    disableAccessibility: false,

    data: [
      {
        value: 2771824.19,
        unit: "€",
        rate: 30.186240355262925,
      },
      {
        value: 1715453.65,
        unit: "€",
        rate: 18.68195550931139,
      },
      {
        value: 1651575.28,
        unit: "€",
        rate: 17.986295287685856,
      },
      {
        value: 1168958.3,
        unit: "€",
        rate: 12.730409214402426,
      },
      {
        value: 949837.87,
        unit: "€",
        rate: 10.34410275579238,
      },
      {
        value: 924760.17,
        unit: "€",
        rate: 10.070996877545035,
      },
    ],

    colourSet: 0,
  },
} satisfies Story;
