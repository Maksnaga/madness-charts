import { formatWithThousandsSeprators } from "../services/format-utilities";
import { DoughnutPlugin } from "../types/doughnut-data";

export function centerTextPlugin(
  unit?: string,
  textCenterLabel?: string
): DoughnutPlugin {
  return {
    id: "centerText",
    afterDraw: (chart) => {
      const ctx = chart.ctx;
      const centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
      const centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2;

      ctx.save();
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const total = chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
      ctx.font = "bold 28px Roboto";

      ctx.fillText(
        formatWithThousandsSeprators(total) + unit,
        centerX,
        centerY - 10
      );

      ctx.font = "16px Roboto";
      ctx.fillText(textCenterLabel ?? "Data", centerX, centerY + 15);

      ctx.restore();
    },
  };
}

export function customLabelsPlugin(): DoughnutPlugin {
  return {
    id: "customSegmentsLabel",
    afterDraw: (chart) => {
      const ctx = chart.ctx;
      ctx.save();
      ctx.font = "12px Roboto";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const meta = chart.getDatasetMeta(0);
      meta.data.forEach((element: any, index) => {
        const data = chart.data.datasets[0].data[index];
        const total = chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
        const percentage = ((data / total) * 100).toFixed(1) + "%";

        const centerX = chart.width / 2;
        const centerY = chart.height / 2;
        const angle = element.circumference / 2 + element.startAngle;
        const radius = element.outerRadius + 30;

        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;

        ctx.fillText(percentage, x, y);
      });

      ctx.restore();
    },
  };
}
