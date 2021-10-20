import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TeamDetailResponse } from 'src/app/shared/model/general.model';
import { GetTeamDetails } from 'src/app/teams/model/pbResponse.model';
import { TeamDetailsService } from 'src/app/teams/services/team-details.service';
import { GeneralService } from 'src/app/shared/services/general.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { TeamsResponse } from '../../../model/config.model';
import { ConfigService } from '../../../services/config.service';
import { VisibilityService } from '../../../services/visibility.service';

import { TeamService } from '../../../services/team.service';
import { AddTeamComponent } from './add-team/add-team.component';

@Component({
  selector: 'app-view-all-teams',
  templateUrl: './view-all-teams.component.html',
  styleUrls: ['./view-all-teams.component.css'],
})
export class ViewAllTeamsComponent implements OnInit {
  allTeams: TeamsResponse[] = [];
  UserIdTeamIdDetails: GetTeamDetails = new GetTeamDetails();
  teamDetails: TeamDetailResponse = new TeamDetailResponse();
  userId: string;
  deleteId: string;
  @ViewChild(AddTeamComponent) child;
  constructor(
    private configService: ConfigService,
    private router: Router,
    public generalService: GeneralService,
    private teamDetailsService: TeamDetailsService,
    private visibilityService: VisibilityService,
    private notifyService: NotificationService,
    private teamService: TeamService
  ) {}

  ngOnInit(): void {
    this.getAllTeams();
    this.userId = JSON.parse(
      localStorage.getItem('PowerboardDashboard')
    ).loginResponse.userId;
  }
  async getAllTeams() {
    try {
      const data = await this.teamService.viewAllTeams();
      console.log(data);
      this.allTeams = data;
    } catch (e) {
      console.log(e);
    }
  }
  public storeDeleteId(teamId: string) {
    this.deleteId = teamId;
  }
  async deleteTeam() {
    try {
      const data = await this.teamService.deleteTeam(this.deleteId);
      this.notifyService.showSuccess('team deleted successfully', '');
      console.log(data);
      this.getAllTeams();
    } catch (e) {
      console.log(e.error.message);
      this.notifyService.showError('', e.error.message);
    }
  }

  public viewTeam(teamId: string) {
    this.getTeamDetails(teamId);
    this.visibilityService.showCurrentTeamMenu = true;
    this.visibilityService.showGuestMenu = false;
    this.visibilityService.showTeamMenu = false;
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
      this.teamDetailsService.setTeamDetailPermissions();
      this.generalService.showNavBarIcons = true;
      this.generalService.checkVisibility();
      this.router.navigateByUrl('/viewTeam');
    } catch (e) {
      console.log(e.error.message);
    }
  }

  addTeam() {
    this.child.addTeamWithLogo();
  }
}
