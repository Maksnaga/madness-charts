import { Component } from "@angular/core";
import { bootstrapApplication } from "@angular/platform-browser";
import { DoughnutComponent } from "./app/doughnut.component";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [DoughnutComponent, CommonModule],
  template: ` <moz-angular-doughnut [labels]="labels"></moz-angular-doughnut> `,
})
export class App {
  labels = ["A", "B", "C", "D", "E", "F"];
  name = "Angular";
}

bootstrapApplication(App);
