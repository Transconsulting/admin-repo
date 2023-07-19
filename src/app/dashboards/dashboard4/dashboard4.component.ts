import { Component, AfterViewInit } from "@angular/core";
import * as c3 from "c3";

@Component({
  templateUrl: "./dashboard4.component.html",
  styleUrls: ["./dashboard4.component.css"],
})
export class Dashboard4Component implements AfterViewInit {
  constructor() {}

  ngAfterViewInit() {
    setTimeout(() => {
      const chart = c3.generate({
        bindto: "#load",
        data: {
          columns: [
            ["Usage", 45],
            ["Space", 15],
            ["CPU", 27],
          ],
          type: "donut",
        },
        donut: {
          label: {
            show: false,
          },
          title: "CPU",
          width: 35,
        },
        legend: {
          hide: true,
        },
        color: {
          pattern: ["#fec107", "#03a9f3", "#00c292"],
        },
      });
    }, 100);
  }
}
