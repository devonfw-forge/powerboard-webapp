import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SetupService } from 'src/app/config/services/setup.service';
import { TeamDetailResponse } from 'src/app/shared/model/general.model';
import { GeneralService } from 'src/app/shared/services/general.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import {
  TeamMemberDetailsResponse,
  UpdateRoles,
} from '../../../model/config.model';
import { ConfigService } from '../../../services/config.service';
import { TeamService } from '../../../services/team.service';
import { AddMemberComponent } from './add-member/add-member.component';
import { EditTeamMemberComponent } from './edit-team-member/edit-team-member.component';

@Component({
  selector: 'app-view-all-team-members',
  templateUrl: './view-all-team-members.component.html',
  styleUrls: ['./view-all-team-members.component.css'],
})
export class ViewAllTeamMembersComponent implements OnInit {
  teamId: string;
  deleteId: string;
  teamMembers: TeamMemberDetailsResponse[] = [];
  updateRole: UpdateRoles = new UpdateRoles();
  teamDetail: TeamDetailResponse = new TeamDetailResponse();
  @ViewChild(AddMemberComponent) child;
  @ViewChild(EditTeamMemberComponent) editChild;

  constructor(
    public settingService: ConfigService,
    public generalService: GeneralService,
    public notifyService: NotificationService,
    public teamService: TeamService,
    public setupService: SetupService,
    private router:Router
  ) {}

  async ngOnInit() {
    this.teamId = JSON.parse(
      localStorage.getItem('TeamDetailsResponse')
    ).powerboardResponse.team_id;
    await this.viewAllMembers();
  }
  /**
   * Fetch team member details from teamService using teamId
   * If data not fetched it gives a error message
   */
  async viewAllMembers() {
    try {
      const data = await this.teamService.viewTeamMembersOfTeam(this.teamId);
      this.teamMembers = data;
    } catch (e) {
      this.notifyService.showInfo(e.error.message, '');
    }
  }
  /**
   * Stores the id of a team member in a deleteId varialbe
   */
  public storeDeleteId(userteamId: string) {
    this.deleteId = userteamId;
  }
  /**
   * delete a team member using the id of the team member
   */
  async deleteMember() {
    try {
      await this.teamService.deleteTeamMember(this.deleteId);
      this.notifyService.showSuccess('Team member deleted successfully', '');
      this.teamMembers = this.teamMembers.filter(member => member.userTeamId!= this.deleteId);
    } catch (reason) {
      this.notifyService.showError('', reason.error.message);
    }
  }

  /**
   * Adds a team member and updates the list of team members
   */
  async addMember() {
    const result = await this.child.addTeamMember();
    if (result) {
      await this.viewAllMembers();
    } 
  }
  /**
   * Reset the add member form
   */
  close() {
    this.child.roleName = 'select Role';
    this.child.memberGroup.reset();
  }

  /**
   * Edit the role of team member
   */
  async editTeamMember() {
    try {
      await this.editChild.editTeamMember();
      this.viewAllMembers();
    } catch (e) {
      console.log(e);
    }
  }
  /**
   * Gets the current team member details
   */
  setCurrentTeamMember(member) {
    this.editChild.getCurrentTeamMember(member);
  }

  saveAndNext() {
    this.router.navigate(['config/setup/configure-links']);
  }
  previous(){
    this.router.navigate(['config/setup/editTeam']);
  }
  skip(){
    this.setupService.deactiveAdminSetup();
    this.router.navigate(['teams/dashboard']);
  }

  async finishConfiguration() {
    try {
      await this.setupService.updateTeamConfigured(this.teamId,true);
      this.notifyService.showSuccess('Team Configured successfully !!', '');
      this.teamDetail = JSON.parse(localStorage.getItem('TeamDetailsResponse'));
      this.teamDetail.powerboardResponse.isTeamConfigured = true;
      localStorage.setItem(
        'TeamDetailsResponse',
        JSON.stringify(this.teamDetail)
      );
    } catch (e) {
      console.log(e.error.message);
      this.notifyService.showError('', e.error.message);
    }finally{
      this.setupService.deactiveAdminSetup();
      this.router.navigate(['teams/dashboard']);
    }
  }
}
