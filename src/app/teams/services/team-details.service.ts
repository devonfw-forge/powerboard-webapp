import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  PowerboardResponse,
  TeamDetailResponse,
} from 'src/app/shared/model/general.model';
import { GeneralService } from 'src/app/shared/services/general.service';
import { GetTeamDetails } from '../model/pbResponse.model';
import { ProjectTeamDetail } from '../../teams/model/team.model';
import { environment } from '../../../environments/environment';
import { UrlPathConstants } from 'src/app/UrlPaths';

@Injectable({
  providedIn: 'root',
})
export class TeamDetailsService {
  userId: string;
  private teamDetailPermissions: string[] = [];
  UserIdTeamIdDetails: GetTeamDetails = new GetTeamDetails();
  teamDetails: TeamDetailResponse = new TeamDetailResponse();
  constructor(
    private http: HttpClient,
    private generalService: GeneralService
  ) {}

  async getTeamDetails(
    userIdTeamIdDetails: GetTeamDetails
  ): Promise<PowerboardResponse> {
    return this.http
      .post<PowerboardResponse>(
        environment.globalEndPoint + UrlPathConstants.getTeamDetailsEndPoint,
        userIdTeamIdDetails
      )
      .toPromise();
  }

  async getTeamsInADCenter(centerId: string): Promise<ProjectTeamDetail[]> {
    return this.http
      .get<ProjectTeamDetail[]>(
        environment.globalEndPoint +
          UrlPathConstants.getTeamsCenterEndPoint +
          centerId
      )
      .toPromise();
  }

  public getTeamDetailPermissions(): string[] {
    return this.teamDetailPermissions;
  }
  /**
   * Remove team details permissions and
   * set them as per new permissions received from the local storage
   */
  public setTeamDetailPermissions() {
    this.generalService.removeTeamDetailsPermissions(
      this.teamDetailPermissions
    );
    const teamDetails = localStorage.getItem('TeamDetailsResponse');
    if (teamDetails) {
      this.teamDetailPermissions = JSON.parse(
        localStorage.getItem('TeamDetailsResponse')
      ).powerboardResponse.privileges;
    } else {
      this.teamDetailPermissions = [];
    }
    this.generalService.appendPermissions(this.teamDetailPermissions);
  }

  public setPermissionsOfTeamDetails(value: []) {
    this.teamDetailPermissions = value;
  }

  public resetTeamDetailPermissions() {
    this.teamDetailPermissions = [];
  }

  /**
   * Get team details using user id and team id
   * Set permissions in local storage
   * Update visibility of features of the user
   * Navigate to dashboard
   *
   */

  public async processTeamDetails(teamId: string) {
    try {
      this.UserIdTeamIdDetails.teamId = teamId;
      this.getUserId();
      const data = await this.getTeamDetails(this.UserIdTeamIdDetails);
      this.teamDetails.powerboardResponse = data;
      localStorage.setItem(
        'TeamDetailsResponse',
        JSON.stringify(this.teamDetails)
      );
      this.updateCurrentTeamStatus(this.teamDetails.powerboardResponse);
  
      this.checkTeamPermissionsAndVisibility();
      this.generalService.storeLastLoggedIn();
      
    } catch (e) {
      console.log(e.error.message);
    }
  }
  updateCurrentTeamStatus(currentTeam){

  var team = currentTeam;
  var powerboardDashboard = JSON.parse(localStorage.getItem('PowerboardDashboard'));
  for(let adcTeam of powerboardDashboard.loginResponse.homeResponse.Teams_In_ADC ){
   if(adcTeam.teamId == team.team_id){
     adcTeam.teamStatus = team.dashboard.teamStatus;
   }
  }
  localStorage.setItem(
    'PowerboardDashboard',
    JSON.stringify(powerboardDashboard)
  );
  }


  checkTeamPermissionsAndVisibility(){
    this.setTeamDetailPermissions();
    this.generalService.showNavBarIcons = true;
    this.generalService.checkVisibility();
    this.generalService.checkDashboardOrConfig(
      this.teamDetails.powerboardResponse.isTeamConfigured
    );
  }

  getUserId(){
    this.userId = JSON.parse(
      localStorage.getItem('PowerboardDashboard')
    ).loginResponse.userId;
    this.UserIdTeamIdDetails.userId = this.userId;
  }
}
