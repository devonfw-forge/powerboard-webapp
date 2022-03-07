import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../../../shared/services/general.service';
import { TeamDetailsService } from '../../services/team-details.service';

@Component({
  selector: 'app-project-display',
  templateUrl: './project-display.component.html',
  styleUrls: ['./project-display.component.css'],
})
export class ProjectDisplayComponent implements OnInit {
  isMyProjects: boolean;

  constructor(private generalService: GeneralService, private teamDetailService: TeamDetailsService) {

  }

  async ngOnInit(): Promise<void> {
    this.checkMyProjects();
  }
/**
 * Check if user is assigned to a project
 * If user is assigned, set isMyProject variable to true
 * else set isMyProject variable to false
 */
  checkMyProjects(){
    this.generalService.isSettingsVisible=false;
    this.generalService.showNavBarIcons = false;
    localStorage.removeItem('TeamDetailsResponse');
    this.teamDetailService.setTeamDetailPermissions();
    this.teamDetailService.setPermissionsOfTeamDetails([]);
    if ((JSON.parse(localStorage.getItem('PowerboardDashboard')).loginResponse.homeResponse.My_Team).length == 0) {
      this.isMyProjects = false;
    }
    else {
      this.isMyProjects = true;
    }
    this.generalService.checkVisibility();
  }
}