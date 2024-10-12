// src/app/doughnut.service.ts

import { Injectable } from "@angular/core";
import { DoughnutData } from "../types/doughnut-data";
import { formatWithThousandsSeprators } from "./format-utilities";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class DoughnutService {
  public onHoverIndex = new BehaviorSubject<number | null>(null);

  public getBackgroundColor(
    patternsColors: string[],
    patternsList: ((
      hover: boolean,
      color: string,
      disableAccessibility: boolean
    ) => CanvasPattern)[],
    disableAccessibility: boolean,
    enableHoverFeature: boolean
  ): CanvasPattern[] {
    const hoverIndex = this.onHoverIndex.value;
    if (!enableHoverFeature || hoverIndex === null) {
      return patternsList.map((pattern, index) =>
        pattern(false, patternsColors[index], disableAccessibility)
      );
    }

    return patternsList.map((pattern, index) =>
      index === hoverIndex
        ? pattern(true, patternsColors[index], disableAccessibility)
        : pattern(false, patternsColors[index], disableAccessibility)
    );
  }

  public groupDataAfterNthValue(
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
          result.value += current.value;
          return result;
        },
        { ...data[maxValues - 1] }
      );
    }
    return truncatedData;
  }

  public getDoughnutLabels(
    labels: string[],
    data: DoughnutData[],
    maxValues: number,
    othersLabel: string
  ): string[] {
    let truncatedLabels = labels.slice(0);
    let truncatedData = data.slice(0);
    if (labels.length > maxValues) {
      truncatedData = this.groupDataAfterNthValue(data, maxValues);
      truncatedLabels = truncatedLabels.slice(0, maxValues - 1);
      truncatedLabels.push(othersLabel);
    }
    return truncatedLabels.map(
      (label: string, index: number) =>
        `${this.getFormattedText(label)} (${formatWithThousandsSeprators(
          truncatedData[index] ? truncatedData[index].value ?? 0 : 0
        )} %)`
    );
  }

  public getOnHoverOptions(activeElements: any) {
    if (activeElements[0] !== undefined) {
      this.onHoverIndex.next(activeElements[0].index);
    } else {
      this.onHoverIndex.next(null);
    }
  }

  private getFormattedText(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }
}
