import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ADCDetails, PowerboardLoginResponse, TeamDetails } from 'src/app/auth/model/auth.model';
import {
  TeamDetailResponse
} from 'src/app/shared/model/general.model';
import { GeneralService } from 'src/app/shared/services/general.service';


import { ADCListDetails, ProjectTeamDetail } from '../../../model/team.model';
import { TeamDetailsService } from '../../../services/team-details.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent implements OnInit {
  ADCTeams: TeamDetails[] = [];
  ADCList: ADCListDetails[] = [];
  updatedCenter: ADCDetails;
  ADC_Center: string;
  newAdCenter : ADCDetails;

  teamDetails: TeamDetailResponse = new TeamDetailResponse();
  private powerboardLoginResponse: PowerboardLoginResponse = new PowerboardLoginResponse();
  constructor(public teamDetailsService: TeamDetailsService, private router: Router, public generalService: GeneralService) {
    this.ADC_Center = "Select center";
    this.newAdCenter = new ADCDetails();
  }

  ngOnInit(): void {
    this.getFromLocalStorage();  
  }

  getFromLocalStorage(){
    this.ADCTeams = JSON.parse(localStorage.getItem('PowerboardDashboard')).loginResponse.homeResponse.Teams_In_ADC;
    this.ADCList = JSON.parse(localStorage.getItem('PowerboardDashboard')).loginResponse.homeResponse.ADC_List;
    console.log((JSON.parse(localStorage.getItem('PowerboardDashboard')).loginResponse.homeResponse.Teams_In_ADC).length);
    if ((JSON.parse(localStorage.getItem('PowerboardDashboard')).loginResponse.homeResponse.Teams_In_ADC).length == 0) {
      this.getTeamsInADC(this.ADCList[1]);
      this.ADC_Center = this.ADCList[1].centerName;
    }
    else {
      this.ADC_Center = JSON.parse(localStorage.getItem('PowerboardDashboard')).loginResponse.homeResponse.My_Center.centerName;
      this.ADCTeams = JSON.parse(localStorage.getItem('PowerboardDashboard')).loginResponse.homeResponse.Teams_In_ADC;
    }
  }

  async getTeamsInADC(adcenter: ADCDetails) {
    try {
      this.updatedCenter=adcenter;
      this.ADC_Center = adcenter.centerName;
      const data = await this.teamDetailsService.getTeamsInADCenter(adcenter.centerId);
      this.ADCTeams = data;
      this.updateTeamsInADC(this.ADCTeams);

    }
    catch (e) {

      console.log(e);

    }

  }

  public updateTeamsInADC(teamsInADC: ProjectTeamDetail[]) {
    this.powerboardLoginResponse = JSON.parse(localStorage.getItem('PowerboardDashboard'));
    this.powerboardLoginResponse.loginResponse.homeResponse.Teams_In_ADC = [];
    this.powerboardLoginResponse.loginResponse.homeResponse.Teams_In_ADC = teamsInADC;
    this.powerboardLoginResponse.loginResponse.homeResponse.My_Center = this.updatedCenter;

    localStorage.setItem('PowerboardDashboard', JSON.stringify(this.powerboardLoginResponse));

  }

  async getTeamDetails(teamId:string){

    try{
      await this.teamDetailsService.processTeamDetails(teamId); 
    }
    catch(e){
      console.log(e.error.message);
    }
  }
}
