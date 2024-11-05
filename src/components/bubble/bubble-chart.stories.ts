// DoughnutChart.stories.ts;

import type { Meta, StoryObj } from "@storybook/angular";
import { BubbleChartComponent } from "./bubble-chart.component";

const meta: Meta<BubbleChartComponent> = {
  title: "Charts/Bubble",
  component: BubbleChartComponent,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<BubbleChartComponent>;

export const Default = {
  args: {
    width: "800px",
    height: "500px",
    labels: ["Serie 1", "Serie 2", "Serie 3", "Serie 4"],
    colours: [0, 4, 1, 2],
    shapes: ["rectRot", "triangle", "circle", "rect"],
    colourSet: 4,
    datasets: [
      [
        {
          x: 20000,
          y: 25,
          r: 5,
        },
        {
          x: 10000,
          y: 505,
          r: 15,
        },
      ],
      [
        {
          x: 10000,
          y: 30,
          r: 20,
        },
        {
          x: 10,
          y: 300,
          r: 200,
        },
      ],
      [
        {
          x: 5000,
          y: 320,
          r: 100,
        },
      ],
      [
        {
          x: 18000,
          y: 8,
          r: 30,
        },
      ],
    ],
    xAxis: { title: "Data 1", unit: "€" },
    yAxis: { title: "Data 2", unit: "D" },
    rAxis: { title: "Data 3", unit: "%" },
  },
} satisfies Story;
