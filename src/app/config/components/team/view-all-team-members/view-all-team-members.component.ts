import { Component, OnInit, ViewChild } from '@angular/core';
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
  teamId : string;
  deleteId: string;
  teamMembers : TeamMemberDetailsResponse[] = [];
  updateRole : UpdateRoles = new UpdateRoles();
  @ViewChild(AddMemberComponent) child;
  @ViewChild(EditTeamMemberComponent) editChild;
   
    constructor(public settingService : ConfigService, public generalService : GeneralService, public notifyService : NotificationService, public teamService : TeamService) { }
   
    async ngOnInit() {  
   
    await this.viewAllMembers();
   
    }
   async viewAllMembers(){
     try{
      this.teamId = JSON.parse(localStorage.getItem('TeamDetailsResponse')).powerboardResponse.team_id; 
      const data = await this.teamService.viewTeamMembersOfTeam(this.teamId);
      this.teamMembers = data;
     }
     catch(e){
      console.log("error viewing team members", e);
      this.notifyService.showError(e.error.message,'');
     }
  }
   
  public storeDeleteId(userteamId : string){
    this.deleteId = userteamId;
  }
   
  async deleteMember(){
    try{
      const data = await this.teamService.deleteTeamMember(this.deleteId);
      console.log(data);
      this.notifyService.showSuccess("team member deleted successfully !!", "");
      this.viewAllMembers();
    }
    catch(reason){
      console.log("error deleting team member", reason);
      this.notifyService.showError("", reason.error.message);
    }
  }
  
  
  
   
  async addMember(){
    const result=await this.child.addTeamMember();
    if(result){
      await this.viewAllMembers();
    }
    else{
      console.log("failed to add member");
    }
  }
   
  close(){
    this.child.roleName="select Role";
    this.child.memberGroup.reset();
  }
   
    async editTeamMember(){
    try{
     await this.editChild.editTeamMember();
     this.viewAllMembers();
    }
    catch(e){
      console.log(e);
    }
    
   
  }
   
  setCurrentTeamMember(member){
    this.editChild.getCurrentTeamMember(member);
  }

}
