import { Component, OnInit } from '@angular/core';
import { VelocityResponse } from 'src/app/shared/model/general.model';

@Component({
  selector: 'app-velocity-comparsion',
  templateUrl: './velocity-comparsion.component.html',
  styleUrls: ['./velocity-comparsion.component.css'],
})
export class VelocityComparsionComponent implements OnInit {
  velocity:VelocityResponse = new VelocityResponse();
  workUnit : string;
  
  ngOnInit(): void {
    this.velocity = JSON.parse(localStorage.getItem('TeamDetailsResponse')).powerboardResponse.dashboard.velocity;
    this.workUnit =  JSON.parse(localStorage.getItem('TeamDetailsResponse')).powerboardResponse.dashboard.sprintWorkUnit;
  }
}
