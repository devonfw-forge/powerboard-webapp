import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts/types/dist/echarts';

@Component({
  selector: 'app-teamspirit',
  templateUrl: './teamspirit.component.html',
  styleUrls: ['./teamspirit.component.css']
})
export class TeamspiritComponent implements OnInit {

  public chartOption : EChartsOption = {};
 
  constructor() { }
 
  ngOnInit(): void {
    this.initChart();
  }
 
  initChart() {
    this.chartOption = {
      series: [{
          type: 'gauge',
          startAngle: 180,
          endAngle: 0,
          min: 0,
          max: 10,
          splitNumber: 5,
           axisLine: {
              lineStyle: {
                   width: 6,
                   color: [
                     [0.33, '#e01304'],
                     [0.66, '#ffd000'],
                       [1, '#07ba55']
                   ]
              }
           },
         
          pointer: {
              icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
              length: '18%',
              width: 15,
              offsetCenter: [0, '-60%'],
              itemStyle: {
                  color: 'auto'
              }
          },
          axisTick: {
              // length: 12,
              // lineStyle: {
              //     color: 'auto',
              //     width: 2
              // }
              show: false
          },
          splitLine: {
              length: 10,
              lineStyle: {
                  color: 'auto',
                  width: 3
              }
          },
          axisLabel: {
            distance: 25,
            color: 'auto',
            fontSize: 10
        },
          title: {
              offsetCenter: [0, '-20%'],
              fontSize: 15
          },
          detail: {
              fontSize: 25,
              offsetCenter: [0, '0%'],
              valueAnimation: true,
              formatter: function (value) {
                  return Math.round(value).toString();
              },
              color: 'auto'
          },
          data: [{
              value: 7,
              
          }]
      }]
  };
  }

}
