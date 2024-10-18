import { Component } from "@angular/core";
import { bootstrapApplication } from "@angular/platform-browser";
import { DoughnutComponent } from "./app/components/doughnut/doughnut.component";
import { CommonModule } from "@angular/common";
import { DoughnutData } from "./app/types/doughnut-data";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [DoughnutComponent, CommonModule],
  template: `
    <moz-angular-doughnut
      [labels]="labels"
      [data]="data"
      [enableHoverFeature]="true"
      [enableCenteredLabel]="true"
    ></moz-angular-doughnut>
  `,
})
export class App {
  labels = ["Data one", "Data two"];
  data: DoughnutData[] = [
    {
      value: 2771824.19,
      unit: "€",
      rate: 20,
    },
    {
      value: 1715453.65,
      unit: "€",
      rate: 80,
    },
  ];
}

bootstrapApplication(App);
