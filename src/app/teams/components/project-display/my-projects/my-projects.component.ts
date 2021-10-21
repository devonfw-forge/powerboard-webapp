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
import { TeamDetails } from 'src/app/auth/model/auth.model';

@Component({
  selector: 'app-my-projects',
  templateUrl: './my-projects.component.html',
  styleUrls: ['./my-projects.component.css'],
})
export class MyProjectsComponent implements OnInit {
  myTeams: TeamDetails[] = [];

  constructor(
    private teamDetailsService: TeamDetailsService,
    public generalService: GeneralService,
    public slideShowService: SlideshowService
  ) {}

  ngOnInit(): void {
    this.myTeams = JSON.parse(
      localStorage.getItem('PowerboardDashboard')
    ).loginResponse.homeResponse.My_Team;
    console.log(this.myTeams);
  }

  async getTeamDetails(teamId: string) {
    try {
      await this.teamDetailsService.processTeamDetails(teamId);
    } catch (e) {
      console.log(e.error.message);
    }
  }
}
