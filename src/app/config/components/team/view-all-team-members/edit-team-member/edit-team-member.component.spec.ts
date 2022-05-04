import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TeamMemberDetailsResponse, UpdateRoles } from 'src/app/config/model/config.model';
import { RemoveUnderscorePipe } from 'src/app/config/pipes/remove-underscore.pipe';
import { ConfigService } from 'src/app/config/services/config.service';
import { TeamService } from 'src/app/config/services/team.service';
import { GeneralService } from 'src/app/shared/services/general.service';
import { NotificationService } from 'src/app/shared/services/notification.service';

import { EditTeamMemberComponent } from './edit-team-member.component';

describe('EditTeamMemberComponent', () => {
  let component: EditTeamMemberComponent;
  let fixture: ComponentFixture<EditTeamMemberComponent>;

  class MockConfigureServcie{
    roles:any =[
      {
        roleId:"mock roled id 1",
        roleName:"mock role name 1"
      },
      {
        roleId:"mock roled id 2",
        roleName:"mock role name 2"
      }
    ]
  }
  class MockTeamService{
    updateAccessRole(updateRoleOfMember){
      console.log(updateRoleOfMember);
      return null;
    }
  }

  
  class MockGeneralService{
    getPermissions(){
      return null;
    }
  }


class MockNotifyService{
  showError(heading:string,message:string){
    console.log(heading,message);
    return null;
  }
  showSuccess(heading:string,message:string){
    console.log(heading,message);
    return null;
  }
 
}

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[RouterTestingModule, HttpClientTestingModule],
      declarations: [ EditTeamMemberComponent, RemoveUnderscorePipe ],
      providers:[{provide : GeneralService, useClass: MockGeneralService},
        {provide: ConfigService, useClass : MockConfigureServcie},
        {provide : NotificationService, useClass: MockNotifyService} ,
        {provide : TeamService, useClass: MockTeamService} ] 
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTeamMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  }); 


  it('should get current team member', () =>{
  let memberDetails : TeamMemberDetailsResponse = {
  userTeamId: "TestingUserTeam",
  userId: "sampleuserId",
  teamId: "sampleTeamid",
  roleId: "mock roled id 1",
  userName: "sampleuserName",
  email: "sample.com"
}
component.getCurrentTeamMember(memberDetails);
expect(component.updateRoleOfMember.userId).toEqual(memberDetails.userId);
expect(component.updateRoleOfMember.teamId).toEqual(memberDetails.teamId);
  })

  it('should update role', () =>{
    component.updateRole("sampleRoleId", "sampleRoleName");
    expect(component.roleName).toEqual("sampleRoleName");
    expect(component.updateRoleOfMember.roleId).toEqual("sampleRoleId");
  })

it('should edit team member', () =>{
  let currentMemberDetails : TeamMemberDetailsResponse = {
    userTeamId: "TestingUserTeam",
    userId: "sampleuserId",
    teamId: "sampleTeamid",
    roleId: "sampleRoleId",
    userName: "sampleuserName",
    email: "sample.com"
  }
  let updateMemberDetails : UpdateRoles = {
    userId: null,
    teamId:  null,
    roleId: null
  }
  component.currentMember = currentMemberDetails;
  component.updateRoleOfMember = updateMemberDetails;
  spyOn(component.teamService,'updateAccessRole').and.callFake(()=>{return null});
  component.editTeamMember()
  expect(component.teamService.updateAccessRole).toHaveBeenCalled();
})   
it('should catch error for edit team member', () =>{
  let currentMemberDetails : TeamMemberDetailsResponse = {
    userTeamId: "TestingUserTeam",
    userId: "sampleuserId",
    teamId: "sampleTeamid",
    roleId: "sampleRoleId",
    userName: "sampleuserName",
    email: "sample.com"
  }
  let updateMemberDetails : UpdateRoles = {
    userId: null,
    teamId:  null,
    roleId: null
  }
  let response : any ={
    error:{message:"error updating access role"}
  }
  component.currentMember = currentMemberDetails;
  component.updateRoleOfMember = updateMemberDetails;
  spyOn(component.teamService,'updateAccessRole').and.throwError(response);
  component.editTeamMember()
  expect(component.teamService.updateAccessRole).toHaveBeenCalled();
})

it('should catch error for edit team member', () =>{
  let currentMemberDetails : TeamMemberDetailsResponse = {
    userTeamId: "TestingUserTeam",
    userId: "sampleuserId",
    teamId: "sampleTeamid",
    roleId: "sampleRoleId",
    userName: "sampleuserName",
    email: "sample.com"
  }
  let updateMemberDetails : UpdateRoles = {
    userId: null,
    teamId:  null,
    roleId: "sampleRoleId"
  }
  let response :any ={
    error : {message:"error logging in"}
  }
  component.currentMember = currentMemberDetails;
  component.updateRoleOfMember = updateMemberDetails;
  spyOn(component.teamService, 'updateAccessRole').and.throwError(response);
  component.editTeamMember();
})
});
