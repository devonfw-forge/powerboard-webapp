import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/shared/services/general.service';
import { SlideshowService } from 'src/app/teams/services/slideshow.service';
import { TeamDetailsService } from '../../../services/team-details.service';
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
