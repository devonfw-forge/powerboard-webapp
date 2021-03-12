import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts/types/dist/echarts';
import { TeamSpirit } from 'src/app/shared/modals/teamSpirit.model';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-teamspirit',
  templateUrl: './teamspirit.component.html',
  styleUrls: ['./teamspirit.component.css']
})
export class TeamspiritComponent implements OnInit {
  
  public chartOption : EChartsOption = {};
 
  constructor(private service : UserService) { }
  teamSprit : TeamSpirit;
  colour:string;
  ngOnInit(): void {
    this.teamSprit = this.service.data.dashboard.teamSpiritDTO;

    if(this.teamSprit.teamSpiritRating<3.3){
       
        this.colour='#c40000';
    }
    else if(this.teamSprit.teamSpiritRating>3.3 && this.teamSprit.teamSpiritRating<6.7){
      
      this.colour='#e09b3a';
    }
    else{
      
      this.colour='#2ab02f';
    }

    this.initChart();
  }
 
  initChart() {
    this.chartOption =
 {
      series: [{
          type: 'gauge',
          startAngle: 215,
          endAngle: -35,
          min: 0,
          max: 1,
          splitNumber: 5,
          axisLine: {
              lineStyle: {
                  width: 5,
                  color: [
                     
                      [1, this.colour]
                  ]
              }
          },
          pointer: {
              icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
              length: '10%',
              width: 15,
              offsetCenter: [0, '-50%'],
              itemStyle: {
                  color: 'auto'
              }
          },
          axisTick: {
              length: 0,
              lineStyle: {
                  color: 'auto',
                  width: 2
              }
          },
          splitLine: {
              length: 5,
              lineStyle: {
                  color: 'auto',
                  width: 2
              }
          },
          axisLabel: {
              color: '#464646',
              fontSize: 10,
              distance: -30,
              formatter: function (value) {
                  if (value === 1) {
                      return '10';
                  }
                  else if (value === 0.9) {
                      return '';
                  }
                  else if (value === 0.8) {
                      return '8';
                  }
                  else if (value === 0.7) {
                      return '';
                  }
                   else if (value === 0.6) {
                      return '6';
                  }
                  else if (value === 0.5) {
                      return '';
                  }
                  else if (value === 0.4) {
                      return '4';
                  }
                   else if (value === 0.3) {
                      return '';
                  }
                  else if (value === 0.2) {
                      return '2';
                  }
                  else if (value === 0.1) {
                      return '';
                  }
                   else if (value === 0.0) {
                      return '0';
                  }
              }
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
                  return Math.round(value * 10) + '';
              },
              color: 'auto'
          },
          data: [{
              value: this.teamSprit.teamSpiritRating/10,
              name: ''
          }]
      }]
  };

  }}
