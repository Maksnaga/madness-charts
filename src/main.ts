import { Component } from "@angular/core";
import { bootstrapApplication } from "@angular/platform-browser";
import { DoughnutComponent } from "./app/components/doughnut.component";
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
      [centeredLabel]="'Data'"
      [enableHoverFeature]="true"
    ></moz-angular-doughnut>
  `,
})
export class App {
  labels = ["Data one", "Data two"];
  data: DoughnutData[] = [
    {
      value: 2771824.19,
      unit: "€",
    },
    {
      value: 1715453.65,
      unit: "€",
    },
  ];
  name = "Angular";
}

bootstrapApplication(App);
