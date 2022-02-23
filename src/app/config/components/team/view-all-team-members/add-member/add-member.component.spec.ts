import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { RemoveUnderscorePipe } from 'src/app/config/pipes/remove-underscore.pipe';
import { ConfigService } from 'src/app/config/services/config.service';
import { TeamService } from 'src/app/config/services/team.service';
import { GeneralService } from 'src/app/shared/services/general.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import teamDetailsResponse from 'src/app/teamDetailsResponse.json'; 

import { AddMemberComponent } from './add-member.component';

describe('AddMemberComponent', () => {
  let component: AddMemberComponent;
  let fixture: ComponentFixture<AddMemberComponent>;
  class MockConfigService{
    roles = [];
    teamMemberRole = "Mock team Member Role";
    teamAdminRole = "Mock team Admin Role"
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
  class MockGeneralService{
    getPermissions(){
      return [];
    }
    addTeamMember ="Mock add team member";
    addTeamAdmin ="Mock add team admin";
  }
  class MockTeamService{
    addTeamMember(data:any){
      return null;
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports :[RouterTestingModule, HttpClientModule, FormsModule, ReactiveFormsModule,ToastrModule.forRoot()],
      declarations: [ AddMemberComponent, RemoveUnderscorePipe ],
      providers:[ {provide: ConfigService, useClass: MockConfigService}, 
        {provide: NotificationService, useClass: MockNotifyService}, 
        {provide:GeneralService, useClass:MockGeneralService },
         {provide:TeamService,useClass:MockTeamService}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    localStorage.setItem('TeamDetailsResponse', JSON.stringify(teamDetailsResponse));
    fixture = TestBed.createComponent(AddMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add team member', () =>{
    let response : any = "team member added successfully";
    spyOn(component.teamService, 'addTeamMember').and.returnValue(response);
    component.memberGroup.controls.username.setValue(null)
    component.memberGroup.controls.email.setValue(null);
    component.memberGroup.controls.role.setValue(null);
    component.memberGroup.controls.team.setValue(null);
    component.addTeamMember();
    expect(component.teamService.addTeamMember).toHaveBeenCalled();
  })


  it('should throw error for add team member', () =>{
    let reason : any = {
      error : {
        message : "error adding team members"
      }
    }
    let checkResult : any = true;
    spyOn(component.teamService, 'addTeamMember').and.throwError(reason);
    component.memberGroup.controls.username.setValue(null)
    component.memberGroup.controls.email.setValue(null);
    component.memberGroup.controls.role.setValue(null);
    component.memberGroup.controls.team.setValue(null);
    component.addTeamMember();
    expect(component.teamService.addTeamMember).toHaveBeenCalled();
  })

  it('should update role', () =>{

    component.updateRole("TestingRoleId", "team_admin");
    expect(component.roleName).toEqual("team_admin");
    expect(component.teamMember.role).toEqual("TestingRoleId");
    
  })
  
});
