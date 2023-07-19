import { Component } from "@angular/core";
import { NgbProgressbarConfig } from "@ng-bootstrap/ng-bootstrap";

@Component({
  templateUrl: "./dashboard2.component.html",
  styleUrls: ["./dashboard2.component.css"],
})
export class Dashboard2Component {
  subtitle: string;
  constructor() {
    this.subtitle = "This is some text within a card block.";
  }
  // This is for the dashboar line chart
  // lineChart
  public lineChartData: Array<any> = [
    { data: [0, 50, 20, 60, 30, 25, 10, 24], label: "Iphone" },
    { data: [0, 15, 50, 12, 20, 80, 10, 1], label: "Ipad" },
    { data: [0, 5, 65, 7, 120, 40, 10, 1], label: "Itouch" },
  ];
  public lineChartLabels: Array<any> = [
    "2010",
    "2011",
    "2012",
    "2013",
    "2014",
    "2015",
    "2016",
  ];
  public lineChartOptions: any = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
          gridLines: {
            color: "rgba(0, 0, 0, 0.1)",
          },
        },
      ],
      xAxes: [
        {
          gridLines: {
            color: "rgba(255, 255, 255, .1)",
          },
        },
      ],
    },
    responsive: true,
    maintainAspectRatio: false,
  };
  public lineChartColors: Array<any> = [
    {
      backgroundColor: "rgba(192,200,215,0.9)",
      borderColor: "rgba(192,200,215, 0.0)",
      pointBackgroundColor: "rgba(171,140,228,0)",
      pointBorderColor: "rgba(171,140,228,1)",
      pointHoverBackgroundColor: "rgba(171,140,228,1)",
      pointHoverBorderColor: "rgba(171,140,228,1)",
    },
    {
      backgroundColor: "rgba(1,192,200,0.5)",
      borderColor: "rgba(1,192,200,0)",
      pointBackgroundColor: "rgba(1,192,200,0)",
      pointBorderColor: "rgba(1,192,200,1)",
      pointHoverBackgroundColor: "rgba(1,192,200,1)",
      pointHoverBorderColor: "rgba(1,192,200,1)",
    },
    {
      backgroundColor: "rgba(251,150,120,0.5)",
      borderColor: "rgba(251,150,120,0)",
      pointBackgroundColor: "rgba(251,150,120,0)",
      pointBorderColor: "rgba(251,150,120,1)",
      pointHoverBackgroundColor: "rgba(251,150,120,1)",
      pointHoverBorderColor: "rgba(251,150,120,1)",
    },
  ];
  public lineChartLegend = false;
  public lineChartType = "line";

  // lineChart
  public lineChartData1: Array<any> = [
    { data: [0, 130, 80, 70, 180, 105, 250], label: "site A" },
    { data: [0, 100, 60, 200, 150, 100, 150], label: "site B" },
  ];

  public lineChartLabels1: Array<any> = [
    "2010",
    "2011",
    "2012",
    "2013",
    "2014",
    "2015",
    "2016",
  ];
  public lineChartOptions1: any = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
          gridLines: {
            color: "rgba(0, 0, 0, 0.1)",
          },
        },
      ],
      xAxes: [
        {
          gridLines: {
            color: "rgba(255, 255, 255, 0.1)",
          },
        },
      ],
    },
    lineTension: 10,
    responsive: true,
    maintainAspectRatio: false,
    elements: { line: { tension: 0 } },
  };
  public lineChartColors1: Array<any> = [
    {
      // grey
      backgroundColor: "rgba(3,169,243,0.1)",
      borderColor: "rgba(3,169,243,0.1)",
      pointBackgroundColor: "rgba(3,169,243,0)",
      pointBorderColor: "rgba(3,169,243,0)",
      pointHoverBackgroundColor: "rgba(3,169,243,1)",
      pointHoverBorderColor: "rgba(3,169,243,1)",
    },
    {
      // grey
      backgroundColor: "rgba(171,140,228,0.1)",
      borderColor: "rgba(171,140,228,0.1)",
      pointBackgroundColor: "rgba(171,140,228,0)",
      pointBorderColor: "rgba(171,140,228,0)",
      pointHoverBackgroundColor: "rgba(171,140,228,1)",
      pointHoverBorderColor: "rgba(171,140,228,1)",
    },
  ];
  public lineChartLegend1 = false;
  public lineChartType1 = "line";

  // Sales Analytics Pie chart
  public pieChartLabels: string[] = ["Sales", "Earning", "Cost"];
  public pieChartData: number[] = [300, 500, 100];
  public pieChartType = "pie";

  // bar chart 5
  public barChartData5: Array<any> = [
    {
      data: [1.1, 1.4, 1.1, 0.9, 2.1, 1, 0.3],
      label: "Cost",
      barPercentage: 0.2,
      categoryPercentage: 0.5,
    },
  ];
  public barChartLabels5: Array<any> = ["1", "2", "3", "4", "5", "6", "7"];
  public barChartOptions5: any = {
    maintainAspectRatio: false,
    legend: {
      display: false,
    },
    tooltips: {
      enabled: false,
    },
    scales: {
      xAxes: [
        {
          display: false,
        },
      ],
      yAxes: [
        {
          display: false,
        },
      ],
    },
  };
  public barChartColors5: Array<any> = [
    {
      backgroundColor: "#03a9f3",
      hoverBackgroundColor: "#03a9f3",
      hoverBorderWidth: 2,
      hoverBorderColor: "#03a9f3",
    },
  ];
  public barChartLegend5 = false;
  public barChartType5 = "bar";
}
