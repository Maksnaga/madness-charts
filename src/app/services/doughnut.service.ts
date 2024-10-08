import { DoughnutData } from "../types/doughnut-data";
import { formatWithThousandsSeprators } from "./format-utilities";

export function groupDataAfterNthValue(
  data: DoughnutData[],
  maxValues: number
): DoughnutData[] {
  if (maxValues < 1) {
    return data;
  }
  let truncatedData = data.slice(0);
  if (data.length > maxValues) {
    truncatedData = truncatedData.slice(0, maxValues);
    truncatedData[maxValues - 1] = data.slice(maxValues).reduce(
      (result, current) => {
        result.rate += current.rate;
        result.value += current.value;
        return result;
      },
      { ...data[maxValues - 1] }
    );
  }
  return truncatedData;
}

const getFormatedText = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export function getDoughnutLabels(
  labels: string[],
  data: DoughnutData[],
  maxValues: number,
  othersLabel: string
) {
  let truncatedLabels = labels.slice(0);
  let truncatedData = data.slice(0);
  if (labels.length > maxValues) {
    truncatedData = groupDataAfterNthValue(data, maxValues);
    truncatedLabels = truncatedLabels.slice(0, maxValues - 1);
    truncatedLabels.push(othersLabel);
  }
  return truncatedLabels.map(
    (label: string, index: number) =>
      `${getFormatedText(label)} (${formatWithThousandsSeprators(
        truncatedData[index] ? truncatedData[index].rate ?? (0 as number) : 0
      )} %)`
  );
}
