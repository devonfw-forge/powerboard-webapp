import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { GeneralService } from 'src/app/shared/services/general.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { TeamMemberDetails } from 'src/app/config/model/config.model';
import { ConfigService } from 'src/app/config/services/config.service';
import { TeamService } from '../../../../services/team.service';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.css'],
})
export class AddMemberComponent implements OnInit {
 
  private authError: boolean;
  teamId : string;
  teamName : string;
  memberGroup:FormGroup;
  error: boolean=false;
teamMember : TeamMemberDetails = new TeamMemberDetails();

  roleName : string;
  constructor(public configService : ConfigService, public generalService : GeneralService, public notifyService : NotificationService, public teamService : TeamService, private fb: FormBuilder,) {
    this.roleName = "Select Role";
   }
/**
 * Get teamId and team Name from local storage
 * Form group is created and set validations
 */
  ngOnInit(): void {
    this.teamId = JSON.parse(localStorage.getItem('TeamDetailsResponse')).powerboardResponse.team_id;
    this.teamName = JSON.parse(localStorage.getItem('TeamDetailsResponse')).powerboardResponse.team_name;
    this.memberGroup=this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required]],
      role: ['',[Validators.required]],
      team:['',[Validators.required]]
    });
  }
 

  /**
   * If team member added successfully, display success message and reset form group
   * If error while adding team member, display error message
   */
  async addTeamMember(){
    
    try{
      this.getTeamMemberDetailsFromForm();
      const data = await this.teamService.addTeamMember(this.teamMember);
      this.notifyService.showSuccess("Team member added successfully","");
      this.memberGroup.reset();
      this.roleName="Select Role";
      return true;
    }
    catch(e){
      this.notifyService.showError("", e.error.message);
      return false;
    }   
  }
/**
 *  Get team member details from form group
 */
  getTeamMemberDetailsFromForm(){
    this.teamMember.team.id = this.teamId;
    this.teamMember.username = this.memberGroup.get('username').value;
    this.teamMember.email = this.memberGroup.get('email').value;
    this.teamMember.role = this.memberGroup.get('role').value;
  }
/**
 * 
 * Update role of member in form group using role id and name 
 */
  updateRole(roleId : string, roleName : string){
    this.roleName = roleName;
    this.teamMember.role = roleId;
    this.memberGroup.controls.role.setValue(this.teamMember.role);
  }

}
