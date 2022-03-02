import { ViewChild, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TeamDetailResponse } from 'src/app/shared/model/general.model';
import { GetTeamDetails } from 'src/app/teams/model/pbResponse.model';
import { TeamDetailsService } from 'src/app/teams/services/team-details.service';
import { GeneralService } from 'src/app/shared/services/general.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { TeamsResponse } from '../../../model/config.model';

import { TeamService } from '../../../services/team.service';
import { AddTeamComponent } from './add-team/add-team.component';
import {
  PowerboardLoginResponse,
  TeamDetails,
} from 'src/app/auth/model/auth.model';
import { ADCListDetails } from 'src/app/teams/model/team.model';

@Component({
  selector: 'app-view-all-teams',
  templateUrl: './view-all-teams.component.html',
  styleUrls: ['./view-all-teams.component.css'],
})
export class ViewAllTeamsComponent implements OnInit {
  allTeams: TeamsResponse[] = [];
  private powerboardLoginResponse: PowerboardLoginResponse;
  UserIdTeamIdDetails: GetTeamDetails = new GetTeamDetails();
  teamDetails: TeamDetailResponse = new TeamDetailResponse();
  userId: string;
  addedTeam: any;
  ADCList: ADCListDetails[] = [];
  deleteId: string;
  ADCTeams: TeamDetails[] = [];
  newTeam: TeamDetails;
  ADC_Center: string;
  @ViewChild(AddTeamComponent) child;
  constructor(
    private router: Router,
    public generalService: GeneralService,
    private teamDetailsService: TeamDetailsService,
    private notifyService: NotificationService,
    private teamService: TeamService
  ) {}

  ngOnInit(): void {
    this.getAllTeams();
    this.ADCList = JSON.parse(
      localStorage.getItem('PowerboardDashboard')
    ).loginResponse.homeResponse.ADC_List;
    this.userId = JSON.parse(
      localStorage.getItem('PowerboardDashboard')
    ).loginResponse.userId;
  }

  /**
   * get all teams from team service
   */
  async getAllTeams() {
    try {
      const data = await this.teamService.viewAllTeams();
      this.allTeams = data;
    } catch (e) {
      console.log(e);
    }
  }
  
  public storeDeleteId(teamId: string) {
    this.deleteId = teamId;
  }

  /**
   * if team deleted successfully, update details in list and local storage, display success message
   * if error while deleting team, display error message
   */
  async deleteTeam() {
    try {
      const data = await this.teamService.deleteTeam(this.deleteId);

      this.ADCTeams = JSON.parse(
        localStorage.getItem('PowerboardDashboard')
      ).loginResponse.homeResponse.Teams_In_ADC;
      this.ADCTeams = this.ADCTeams.filter(
        (team) => team.teamId != this.deleteId
      );
      this.powerboardLoginResponse = new PowerboardLoginResponse();
      this.powerboardLoginResponse = JSON.parse(
        localStorage.getItem('PowerboardDashboard')
      );
      this.powerboardLoginResponse.loginResponse.homeResponse.Teams_In_ADC = this.ADCTeams;
      localStorage.setItem(
        'PowerboardDashboard',
        JSON.stringify(this.powerboardLoginResponse)
      );
      this.notifyService.showSuccess('Team deleted successfully', '');
      this.getAllTeams();
      console.log(data);
    } catch (e) {
      console.log(e.error.message);
      this.notifyService.showError('', e.error.message);
    }
  }

  public viewTeam(teamId: string) {
    this.getTeamDetails(teamId);
  }

  /**
   * if details of a team  received, update in team details variable and local storage
   * 
   */
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
      this.teamDetailsService.setTeamDetailPermissions();
      this.generalService.setShowNavbarIconsAsTrue();
      this.generalService.checkVisibility();
      this.router.navigate(['/viewTeam']);
    } catch (e) {
      console.log(e.error.message);
    }
  }
/**
 * if team added successfully update details in list and local storage, display success message
 * if error while adding team, display error message
 */
  async addTeam() {
    try {
      const data = await this.child.addTeamWithLogo();
      this.addedTeam = {
        teamId: data.id,
        teamName: data.name,
        teamCode: data.teamCode,
        projectKey: data.projectKey,
        adCenter: this.centerIdToname(data.ad_center),
      };
      this.allTeams.push(this.addedTeam);
      this.ADC_Center = JSON.parse(
        localStorage.getItem('PowerboardDashboard')
      ).loginResponse.homeResponse.My_Center.centerId;
      if (this.ADC_Center == data.ad_center) {
        this.ADCTeams = JSON.parse(
          localStorage.getItem('PowerboardDashboard')
        ).loginResponse.homeResponse.Teams_In_ADC;
        this.newTeam = new TeamDetails();
        this.newTeam.teamId = data.id;
        this.newTeam.teamName = data.name;
        this.newTeam.teamLogo = data.logo;
        this.ADCTeams.push(this.newTeam);
        this.powerboardLoginResponse = new PowerboardLoginResponse();
        this.powerboardLoginResponse = JSON.parse(
          localStorage.getItem('PowerboardDashboard')
        );
        this.powerboardLoginResponse.loginResponse.homeResponse.Teams_In_ADC = this.ADCTeams;
        localStorage.setItem(
          'PowerboardDashboard',
          JSON.stringify(this.powerboardLoginResponse)
        );
      }
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  }
/**
 * 
 * get center name using center id
 */
  centerIdToname(id: string) {
    for (let list of this.ADCList) {
      if (list.centerId == id) {
        return list.centerName;
      }
    }
  }
}
