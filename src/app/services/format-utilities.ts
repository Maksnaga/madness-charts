export function formatTicks(val: number, unit?: string): string {
  const fixedValue = parseInt(val.toFixed());
  return `${new Intl.NumberFormat().format(fixedValue)}${
    unit ? " " + unit : ""
  }`;
}

export function formatWithThousandsSeprators(value: number) {
  if (Math.abs(Number(value)) >= 1.0e6) {
    return formatDecimalNumber(value / 1.0e6) + " M";
  } else if (Math.abs(Number(value)) >= 1.0e3) {
    return formatDecimalNumber(value / 1.0e3) + " K";
  } else {
    return formatDecimalNumber(value);
  }
}

function formatDecimalNumber(value: number) {
  return new Intl.NumberFormat(
    new Intl.NumberFormat().resolvedOptions().locale,
    {
      style: "decimal",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }
  ).format(value);
}

// Not used in the codebase
export function numberWithThousandSeparators(value: string, unit?: string) {
  const x = parseFloat(value).toFixed(2);
  const formattedValue = x.replace(/\B(?=(\d{3}){1,5}(?!\d))/g, " ");
  return unit ? formattedValue + " " + unit : formattedValue;
}

export function getPatternIndexWithShift(
  dataSetIndex: number,
  patternShifting?: number
) {
  return patternShifting ? (dataSetIndex + patternShifting) % 6 : dataSetIndex;
}

export function formatValueAndRate(doughnutData: any, dataIndex: number) {
  const textValue = `${formatWithThousandsSeprators(
    doughnutData.data[dataIndex].value
  )} (${formatWithThousandsSeprators(doughnutData.data[dataIndex].rate)}%)`;
  return textValue;
}
