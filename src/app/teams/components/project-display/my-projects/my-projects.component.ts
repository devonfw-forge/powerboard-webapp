import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  PowerboardResponse,
  TeamDetailResponse,
} from 'src/app/shared/model/general.model';
import { GeneralService } from 'src/app/shared/services/general.service';
import { SlideshowService } from 'src/app/teams/services/slideshow.service';
import { GetTeamDetails } from '../../../model/pbResponse.model';

import { TeamDetailsService } from '../../../services/team-details.service';
import { ProjectTeamDetail } from '../../../model/team.model';

@Component({
  selector: 'app-my-projects',
  templateUrl: './my-projects.component.html',
  styleUrls: ['./my-projects.component.css'],
})
export class MyProjectsComponent implements OnInit {
  myTeams: ProjectTeamDetail[] = [];
  userId: string;
  UserIdTeamIdDetails: GetTeamDetails = new GetTeamDetails();
  teamDetails: TeamDetailResponse = new TeamDetailResponse();
  constructor(
    private teamDetailsService: TeamDetailsService,
    private router: Router,
    public generalService: GeneralService,
    public slideShowService: SlideshowService
  ) {}

  ngOnInit(): void {
    this.userId = JSON.parse(
      localStorage.getItem('PowerboardDashboard')
    ).loginResponse.userId;
    this.myTeams = JSON.parse(
      localStorage.getItem('PowerboardDashboard')
    ).loginResponse.My_Team;
    console.log(this.myTeams);
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
      this.slideShowService.startSlideShow();
      this.router.navigateByUrl('/dashboard');
      this.generalService.storeLastLoggedIn();
    } catch (e) {
      console.log(e.error.message);
    }
  }
}
