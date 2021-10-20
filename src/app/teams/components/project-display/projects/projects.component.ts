import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PowerboardLoginResponse } from 'src/app/auth/model/auth.model';
import {
  PowerboardResponse,
  TeamDetailResponse,
} from 'src/app/shared/model/general.model';
import { GeneralService } from 'src/app/shared/services/general.service';
import { GetTeamDetails } from '../../../model/pbResponse.model';

import { ADCListDetails, ProjectTeamDetail } from '../../../model/team.model';
import { TeamDetailsService } from '../../../services/team-details.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent implements OnInit {
  UserIdTeamIdDetails: GetTeamDetails = new GetTeamDetails();
  ADCTeams: ProjectTeamDetail[] = [];
  ADCList: ADCListDetails[] = [];
  ADC_Center: string;
  userId: string;
  teamDetails: TeamDetailResponse = new TeamDetailResponse();
  private powerboardLoginResponse: PowerboardLoginResponse = new PowerboardLoginResponse();
  constructor(
    private teamDetailsService: TeamDetailsService,
    private router: Router,
    public generalService: GeneralService
  ) {
    this.ADC_Center = 'Select center';
  }

  ngOnInit(): void {
    this.userId = JSON.parse(
      localStorage.getItem('PowerboardDashboard')
    ).loginResponse.userId;
    this.ADCTeams = JSON.parse(
      localStorage.getItem('PowerboardDashboard')
    ).loginResponse.Teams_In_ADC;
    console.log(this.ADCTeams);

    this.ADCList = JSON.parse(
      localStorage.getItem('PowerboardDashboard')
    ).loginResponse.ADC_List;
    console.log(this.ADCList);

    /* if((JSON.parse(localStorage.getItem('PowerboardDashboard')).loginResponse.Teams_In_ADC).length == 0){
    this.getTeamsInADC(this.ADCList[1].centerId, this.ADCList[1].centerName);
    this.ADC_Center = this.ADCList[1].centerName;
}  */
    if (
      JSON.parse(localStorage.getItem('PowerboardDashboard')).loginResponse
        .My_Team.length == 0
    ) {
      this.getTeamsInADC(this.ADCList[1].centerId, this.ADCList[1].centerName);
      this.ADC_Center = this.ADCList[1].centerName;
    } else {
      this.ADC_Center = JSON.parse(
        localStorage.getItem('PowerboardDashboard')
      ).loginResponse.My_Center.centerName;
      this.ADCTeams = JSON.parse(
        localStorage.getItem('PowerboardDashboard')
      ).loginResponse.Teams_In_ADC;
    }
  }

  async getTeamsInADC(centerId: string, centerName: string) {
    try {
      this.ADC_Center = centerName;
      const data = await this.teamDetailsService.getTeamsInADCenter(centerId);
      console.log(data);
      this.ADCTeams = data;
      this.updateTeamsInADC(this.ADCTeams);
    } catch (e) {
      console.log(e);
    }
  }

  public updateTeamsInADC(teamsInADC: ProjectTeamDetail[]) {
    this.powerboardLoginResponse = JSON.parse(
      localStorage.getItem('PowerboardDashboard')
    );
    this.powerboardLoginResponse.loginResponse.Teams_In_ADC = [];
    this.powerboardLoginResponse.loginResponse.Teams_In_ADC = teamsInADC;

    localStorage.setItem(
      'PowerboardDashboard',
      JSON.stringify(this.powerboardLoginResponse)
    );
  }

  async getTeamDetails(teamId: string) {
    try {
      this.UserIdTeamIdDetails.teamId = teamId;
      this.UserIdTeamIdDetails.userId = this.userId;
      const data = await this.teamDetailsService.getTeamDetails(
        this.UserIdTeamIdDetails
      );
      this.teamDetails.powerboardResponse = data;
      localStorage.setItem(
        'TeamDetailsResponse',
        JSON.stringify(this.teamDetails)
      );
      this.router.navigate(['/dashboard']);
      this.teamDetailsService.setTeamDetailPermissions();
      this.generalService.showNavBarIcons = true;
      this.generalService.checkVisibility();
      this.generalService.storeLastLoggedIn();
    } catch (e) {
      console.log(e);
    }
    console.log(teamId);
  }
}
