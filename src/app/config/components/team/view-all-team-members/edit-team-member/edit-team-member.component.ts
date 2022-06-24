import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/shared/services/general.service';
import {
  TeamMemberDetailsResponse,
  UpdateRoles,
} from 'src/app/config/model/config.model';
import { ConfigService } from 'src/app/config/services/config.service';
import { TeamService } from '../../../../services/team.service';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-edit-team-member',
  templateUrl: './edit-team-member.component.html',
  styleUrls: ['./edit-team-member.component.css'],
})
export class EditTeamMemberComponent implements OnInit {
  currentMember: TeamMemberDetailsResponse = new TeamMemberDetailsResponse();
  updateRoleOfMember: UpdateRoles = new UpdateRoles();
  roleName: string;

  constructor(
    public configService: ConfigService,
    public generalService: GeneralService,
    public teamService: TeamService,
    public notifyService: NotificationService,
  ) {
    this.roleName = 'Select Role';
  }

  ngOnInit(): void {
    this.roleName = 'Select Role';
  }
  /**
   * Get current role of a team member
   * 
   */
  getCurrentTeamMember(member){
    this.currentMember = member;
    this.updateRoleOfMember.teamId = this.currentMember.teamId;
    this.updateRoleOfMember.userId = this.currentMember.userId;
    for(let role of this.configService.roles){
      if(role.roleId == this.currentMember.roleId){
        this.roleName = role.roleName;
      }
    }
  }
  /**
   * 
   * Updates the role of a member using role id
   */
  updateRole(roleId : string, roleName : string){
    this.roleName = roleName;
    this.updateRoleOfMember.roleId = roleId;
  }
 
  /**
   * 
   * Edit and update the role of member, if role of the member is changed
   */
  public async editTeamMember(){
    if(this.currentMember.roleId != this.updateRoleOfMember.roleId){
      try{
        const data = await this.teamService.updateAccessRole(this.updateRoleOfMember);
        this.notifyService.showSuccess('', 'Team member updated successfully');
        return data;
      }
      catch(e){
        this.notifyService.showError('', e.error.message);
      }
    }
  }
}
