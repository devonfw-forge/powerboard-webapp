import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupName,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { GeneralService } from '../../../shared/services/general.service';
import { TeamInfo, TeamMemberDetails } from '../../model/config.model';
import { ConfigService } from '../../services/config.service';
import { VisibilityService } from '../../services/visibility.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css'],
})
export class ConfigComponent implements OnInit {
  teamName: string;

  constructor(
    private configService: ConfigService,
    private route: Router,
    public generalService: GeneralService,
    public visibilityService: VisibilityService
  ) {}

  ngOnInit(): void {
    if (this.generalService.showNavBarIcons) {
      this.teamName = JSON.parse(
        localStorage.getItem('TeamDetailsResponse')
      ).powerboardResponse.team_name;
      this.visibilityService.showCurrentTeamMenu = true;
      this.visibilityService.showTeamMenu = false;
      this.visibilityService.showGuestMenu = false;

      this.visibilityService.hideAll();
      this.visibilityService.ShowEditTeam();
    } else {
      for (let permission of this.generalService.getPermissions()) {
        if (this.generalService.addTeam == permission) {
          this.visibilityService.showCurrentTeamMenu = false;
          this.visibilityService.showTeamMenu = true;
          this.visibilityService.showGuestMenu = false;

          this.visibilityService.hideAll();
          this.visibilityService.displayViewAllTeams();
        }
      }
    }
  }
  ngAfterViewInit() {
    this.setUnderline();
  }
  async openCurrentTeamMenu() {
    this.visibilityService.showCurrentTeamMenu = true;
    this.visibilityService.showTeamMenu = false;
    this.visibilityService.showGuestMenu = false;

    this.visibilityService.hideAll();
    this.visibilityService.ShowEditTeam();
    this.configService.currentTeam.teamId = JSON.parse(
      localStorage.getItem('TeamDetailsResponse')
    ).powerboardResponse.team_id;
    this.configService.currentTeam.teamName = JSON.parse(
      localStorage.getItem('TeamDetailsResponse')
    ).powerboardResponse.team_name;
    this.configService.currentTeam.adCenter = JSON.parse(
      localStorage.getItem('TeamDetailsResponse')
    ).powerboardResponse.center;
    this.configService.currentTeam.teamCode = JSON.parse(
      localStorage.getItem('TeamDetailsResponse')
    ).powerboardResponse.team_code;
    localStorage.setItem(
      'currentTeam',
      JSON.stringify(this.configService.currentTeam)
    );
    /* this.route.navigateByUrl('/setup'); */
    this.setUnderline();
  }

  openTeamMenu() {
    this.visibilityService.showCurrentTeamMenu = false;
    this.visibilityService.showTeamMenu = true;
    this.visibilityService.showGuestMenu = false;

    this.visibilityService.hideAll();
    this.visibilityService.displayViewAllTeams();
    this.setUnderline();
  }

  openGuestMenu() {
    this.visibilityService.showCurrentTeamMenu = false;
    this.visibilityService.showTeamMenu = false;
    this.visibilityService.showGuestMenu = true;

    this.visibilityService.hideAll();
    this.visibilityService.displayViewAllGuests();
    this.setUnderline();
  }

  public setUnderline() {
    if (this.visibilityService.showTeamMenu) {
      this.displayTeamMenu();
      this.hideGuestMenu();
      if (this.generalService.showNavBarIcons) {
        this.hideCurrentTeamMenu();
      }
    }

    if (this.visibilityService.showGuestMenu) {
      this.displayGuestMenu();
      this.hideTeamMenu();
      if (this.generalService.showNavBarIcons) {
        this.hideCurrentTeamMenu();
      }
    }
    if (this.visibilityService.showCurrentTeamMenu) {
      this.displayCurrentTeamMenu();
      for (let permission of this.generalService.getPermissions()) {
        if (this.generalService.addTeam == permission) {
          this.hideTeamMenu();
          this.hideGuestMenu();
        }
      }
    }
  }

  public hideCurrentTeamMenu() {
    var currentTeamMenu = document.getElementById('currentTeamButton');
    currentTeamMenu.style.border = 'none';
  }
  public displayCurrentTeamMenu() {
    var currentTeamMenu = document.getElementById('currentTeamButton');
    currentTeamMenu.style.borderTop = '2px solid #72d5fc';
    currentTeamMenu.style.borderBottom = '2px solid #72d5fc';
  }

  public hideTeamMenu() {
    var teamMenu = document.getElementById('teamButton');
    teamMenu.style.border = 'none';
  }
  public displayTeamMenu() {
    var teamMenu = document.getElementById('teamButton');
    teamMenu.style.borderTop = '2px solid #72d5fc';
    teamMenu.style.borderBottom = '2px solid #72d5fc';
  }
  public hideGuestMenu() {
    var guestMenu = document.getElementById('guestButton');
    guestMenu.style.border = 'none';
  }
  public displayGuestMenu() {
    var guestMenu = document.getElementById('guestButton');
    guestMenu.style.borderTop = '2px solid #72d5fc';
    guestMenu.style.borderBottom = '2px solid #72d5fc';
  }
}
