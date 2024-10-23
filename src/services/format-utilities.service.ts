import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class FormatUtilitiesService {
  /**
   * Format ticks with optional unit.
   * @param val The value to format
   * @param unit Optional unit to append to the value
   * @returns Formatted string with thousands separators and unit (if provided)
   */
  public formatTicks(val: number, unit?: string): string {
    const fixedValue = parseInt(val.toFixed());
    return `${new Intl.NumberFormat().format(fixedValue)}${
      unit ? " " + unit : ""
    }`;
  }

  /**
   * Format value with thousands separators.
   * @param value The value to format
   * @returns Formatted value with K for thousands and M for millions
   */
  public formatWithThousandsSeparators(value: number): string {
    if (Math.abs(Number(value)) >= 1.0e6) {
      return this.formatDecimalNumber(value / 1.0e6) + " M";
    } else if (Math.abs(Number(value)) >= 1.0e3) {
      return this.formatDecimalNumber(value / 1.0e3) + " K";
    } else {
      return this.formatDecimalNumber(value);
    }
  }

  /**
   * Format a number with thousand separators.
   * @param value The value to format
   * @param unit Optional unit to append to the value
   * @returns Formatted number with thousand separators
   */
  public numberWithThousandSeparators(value: string, unit?: string): string {
    const x = parseFloat(value).toFixed(2);
    const formattedValue = x.replace(/\B(?=(\d{3}){1,5}(?!\d))/g, " ");
    return unit ? formattedValue + " " + unit : formattedValue;
  }

  /**
   * Get the shifted pattern index based on the dataset index.
   * @param dataSetIndex The index of the dataset
   * @param patternShifting Optional pattern shift value
   * @returns The shifted pattern index
   */
  public getPatternIndexWithShift(
    dataSetIndex: number,
    patternShifting?: number
  ): number {
    return patternShifting
      ? (dataSetIndex + patternShifting) % 6
      : dataSetIndex;
  }

  /**
   * Format value and rate for doughnut chart data.
   * @param doughnutData The doughnut chart data object
   * @param dataIndex The index of the data point
   * @returns Formatted string with value and rate percentage
   */
  public formatValueAndRate(doughnutData: any, dataIndex: number): string {
    const textValue = `${this.formatWithThousandsSeparators(
      doughnutData.data[dataIndex].value
    )} (${this.formatWithThousandsSeparators(
      doughnutData.data[dataIndex].rate
    )}%)`;
    return textValue;
  }

  /**
   * Format a decimal number with two decimal places.
   * @param value The number to format
   * @returns Formatted decimal number
   */
  private formatDecimalNumber(value: number): string {
    return new Intl.NumberFormat(
      new Intl.NumberFormat().resolvedOptions().locale,
      {
        style: "decimal",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }
    ).format(value);
  }
}
