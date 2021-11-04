import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TeamMemberDetailsResponse, UpdateRoles } from 'src/app/config/model/config.model';
import { ConfigService } from 'src/app/config/services/config.service';
import { TeamService } from 'src/app/config/services/team.service';
import { GeneralService } from 'src/app/shared/services/general.service';

import { EditTeamMemberComponent } from './edit-team-member.component';

describe('EditTeamMemberComponent', () => {
  let component: EditTeamMemberComponent;
  let generalService : GeneralService;
 /*  let configService : ConfigService; */
  let teamService : TeamService;
  let fixture: ComponentFixture<EditTeamMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[RouterTestingModule, HttpClientTestingModule],
      declarations: [ EditTeamMemberComponent ],
      providers:[{provide : GeneralService, useValue : generalService},
        ConfigService,
        {provide : TeamService, useValue : teamService} ] 
    })
    .compileComponents()
    .then(() => {
      generalService = TestBed.inject(GeneralService);
        teamService = TestBed.inject(TeamService);
    });
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
  roleId: "sampleRoleId",
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
  component.editTeamMember().catch(e =>{
    expect(e).toBeTruthy();
  })

})  
});
