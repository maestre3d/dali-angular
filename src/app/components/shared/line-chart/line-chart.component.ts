import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {
  public lineChartLabels = ['Q1', 'Q2', 'Q3', 'Q4'];
  public lineChartData = [
    {data: [120, 130, 180, 70], label: '2017'},
    {data: [90, 150, 200, 45], label: '2018'}
  ];
  public lineChartType = 'line';
  public lineChartLegend = true;
  public lineChartOptions = {
    responsive: true
  };

  constructor() { }

  ngOnInit() {
  }

}
