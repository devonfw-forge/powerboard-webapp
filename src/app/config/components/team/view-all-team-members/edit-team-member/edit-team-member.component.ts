import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/shared/services/general.service';
import {
  TeamMemberDetailsResponse,
  UpdateRoles,
} from 'src/app/config/model/config.model';
import { ConfigService } from 'src/app/config/services/config.service';
import { TeamService } from '../../../../services/team.service';

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
    public teamService: TeamService
  ) {
    this.roleName = 'Select Role';
  }

  ngOnInit(): void {
    this.roleName = 'Select Role';
  }
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
  updateRole(roleId : string, roleName : string){
    this.roleName = roleName;
    this.updateRoleOfMember.roleId = roleId;
  }
 
  public async editTeamMember(){
    if(this.currentMember.roleId != this.updateRoleOfMember.roleId){
      try{
        return await this.teamService.updateAccessRole(this.updateRoleOfMember);
      }
      catch(e){
        console.log(e.error.message);
      }
    }
    else{
      console.log("no changes made");
    }
  }
}
