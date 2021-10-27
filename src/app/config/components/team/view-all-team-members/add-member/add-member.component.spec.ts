import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ConfigService } from 'src/app/config/services/config.service';
import { TeamService } from 'src/app/config/services/team.service';
import { GeneralService } from 'src/app/shared/services/general.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import teamDetailsResponse from 'src/app/teamDetailsResponse.json'; 

import { AddMemberComponent } from './add-member.component';

describe('AddMemberComponent', () => {
  let component: AddMemberComponent;
  let configService : ConfigService;
  let fixture: ComponentFixture<AddMemberComponent>;
  let notificationService : NotificationService;
  let generalService : GeneralService;
  let toastrService : ToastrService;
  let teamService : TeamService;
  let spy :any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports :[RouterTestingModule, HttpClientModule, FormsModule, ReactiveFormsModule,ToastrModule.forRoot()],
      declarations: [ AddMemberComponent ],
      providers:[ ConfigService,  NotificationService, GeneralService, TeamService, {provide : ToastrService, usevalue : toastrService}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    localStorage.setItem('TeamDetailsResponse', JSON.stringify(teamDetailsResponse));
    /* settingService = TestBed.inject(SettingService);
    notificationService = TestBed.inject(NotificationService);
    generalService = TestBed.inject(GeneralService);
    teamService = TestBed.inject(TeamService); */
    toastrService = TestBed.inject(ToastrService); 
    teamService = TestBed.inject(TeamService); 
    notificationService = TestBed.inject(NotificationService); 
    fixture = TestBed.createComponent(AddMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add team member', () =>{
    let response : any = "team member added successfully";
    let checkResult : any = true;
    spy = spyOn(teamService, 'addTeamMember').and.returnValue(response);
    component.memberGroup.controls.username.setValue(null)
    component.memberGroup.controls.email.setValue(null);
    component.memberGroup.controls.role.setValue(null);
    component.memberGroup.controls.team.setValue(null);
    component.addTeamMember();
    expect(teamService.addTeamMember).toHaveBeenCalled();
  })


  it('should throw error for add team member', () =>{
    let reason : any = {
      error : {
        message : "error adding team members"
      }
    }
    let checkResult : any = true;
    spy = spyOn(teamService, 'addTeamMember').and.throwError(reason);
    component.memberGroup.controls.username.setValue(null)
    component.memberGroup.controls.email.setValue(null);
    component.memberGroup.controls.role.setValue(null);
    component.memberGroup.controls.team.setValue(null);
    component.addTeamMember();
    expect(teamService.addTeamMember).toHaveBeenCalled();
  })

  it('should update role', () =>{

    component.updateRole("TestingRoleId", "team_admin");
    expect(component.roleName).toEqual("team_admin");
    expect(component.teamMember.role).toEqual("TestingRoleId");
    
  })
  
});
