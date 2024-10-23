import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { DoughnutComponent } from "../components/doughnut/doughnut.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, DoughnutComponent],
  template: `
    <h1>Welcome to {{ title }}!</h1>
    <moz-angular-doughnut
      [labels]="labels"
      [data]="data"
      [maxValues]="3"
    ></moz-angular-doughnut>
    <router-outlet />
  `,
  styles: [],
})
export class AppComponent {
  labels = [
    "Data One",
    "Data Two",
    "Data Three",
    "Data Four",
    "Data Five",
    "Data Six",
  ];
  data = [
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
  ];
  title = "@mozaic-ds/angular-chart";
}
