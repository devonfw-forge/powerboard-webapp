import { Component, OnInit } from '@angular/core';
import { SprintDetailResponse } from '../../../shared/model/general.model';
import { GeneralService } from '../../../shared/services/general.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  sprintDetails: SprintDetailResponse = new SprintDetailResponse();
  teamStatus: number;
  constructor() {}

  ngOnInit(): void {
    this.sprintDetails = JSON.parse(
      localStorage.getItem('TeamDetailsResponse')
    ).powerboardResponse.dashboard.sprintDetail;
    this.teamStatus = JSON.parse(
      localStorage.getItem('TeamDetailsResponse')
    ).powerboardResponse.dashboard.teamStatus;
  }
}
