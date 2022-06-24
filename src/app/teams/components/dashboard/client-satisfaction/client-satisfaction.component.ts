import { Component, OnInit } from "@angular/core";
import { EChartsOption } from "echarts";
import { ClientStatusResponse } from "src/app/shared/model/general.model";
import { environment } from 'src/environments/environment';

@Component({
  selector: "app-client-satisfaction",
  templateUrl: "./client-satisfaction.component.html",
  styleUrls: ["./client-satisfaction.component.css"],
})
export class ClientSatisfactionComponent implements OnInit {
  public chartOption: EChartsOption = {};
  aws_asset: string;
  colour: string;
  componentReady:boolean;
  clientStatus: ClientStatusResponse = new ClientStatusResponse();
  constructor() {
      this.componentReady=false;
  }

  
  ngOnInit(): void {
    this.aws_asset= environment.AWS_ASSETS_URL as string;
    this.checkClientRating();
  }

/**
   * Get client status details from local storage
   * Check the client status rating
   * If rating < 3.3, set colour to red
   * else if rating > 3.3 & rating < 6.7, set colour to orange
   * else set colour to green
   */
checkClientRating(){
  this.clientStatus = JSON.parse(
    localStorage.getItem('TeamDetailsResponse')
  ).powerboardResponse.dashboard.clientStatus;
  if (this.clientStatus) {
    if (this.clientStatus.clientSatisfactionRating < 3.3) {
      this.colour = '#c40000';
    } else if (
      this.clientStatus.clientSatisfactionRating > 3.3 &&
      this.clientStatus.clientSatisfactionRating < 6.7
    ) {
      this.colour = '#e09b3a';
    } else {
      this.colour = '#2ab02f';
    }
    this.componentReady = true;
    this.initChart();
  }
  else{
      this.componentReady = false;
  }

}



  /**
   * Sets the properties for client satisfaction gauge
   * Set colour for gauge according to the rating value
   */
  initChart() {
    this.chartOption = {
        series: [
          {
            type: 'gauge',
            startAngle: 180,
            endAngle: 0,
            min: 0,
            max: 1,
            splitNumber: 5,
            axisLine: {
              lineStyle: {
                width: 5,
                color: [[1, this.colour]],
              },
            },
            pointer: {
              icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
              length: '10%',
              width: 10,
              offsetCenter: [0, '-50%'],
              itemStyle: {
                color: 'auto',
              },
            },
            axisTick: {
              length: 0,
              lineStyle: {
                color: 'auto',
                width: 2,
              },
            },
            splitLine: {
              length: 5,
              lineStyle: {
                color: 'auto',
                width: 2,
              },
            },
            axisLabel: {
              color: '#464646',
              fontSize: 10,
              distance: -30,
              formatter: function (value) {
                return '' + value * 10; 
              },
            },
            title: {
              offsetCenter: [0, '-20%'],
              fontSize: 15,
            },
            detail: {
              fontSize: 25,
              offsetCenter: [0, '-10%'],
              valueAnimation: true,
              formatter: function (value) {
                return Math.round(value * 10) + '';
              },
              color: 'auto',
            },
          data: [
            {
              value: this.clientStatus.clientSatisfactionRating / 10,
              name: '',
            },
          ],
        },
      ],
    };
  }
}
