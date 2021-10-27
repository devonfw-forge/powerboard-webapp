import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import teamDetailsResponse from '/src/app/teamDetailsResponse.json';
import { ViewAllTeamMembersComponent } from './view-all-team-members.component';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { TeamService } from 'src/app/config/services/team.service';

describe('ViewAllTeamMembersComponent', () => {
  let component: ViewAllTeamMembersComponent;
  let teamService : TeamService;
  let fixture: ComponentFixture<ViewAllTeamMembersComponent>;
  let notificationService : NotificationService;
  let spy : any;
  let spy2 : any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({

      imports :[RouterTestingModule, HttpClientModule, FormsModule, ReactiveFormsModule],
      declarations: [ ViewAllTeamMembersComponent ],
      providers : [{provide : NotificationService, useValue : notificationService}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    teamService = TestBed.inject(TeamService);
    notificationService = TestBed.inject(NotificationService);
    fixture = TestBed.createComponent(ViewAllTeamMembersComponent);
    localStorage.setItem('TeamDetailsResponse', JSON.stringify(teamDetailsResponse));
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

   it('should create', () => {
     spy = spyOn(teamService, 'viewTeamMembersOfTeam').and.returnValue(null);
    
      expect(component).toBeTruthy();
  });

  it('should throw error for view team members', () =>{
    let reason : any = {
      error : {
        message : "error viewing team members"
      }
    }
    spy = spyOn(teamService, 'viewTeamMembersOfTeam').and.throwError(reason);
    /* spy2 = spyOn(notificationService, 'showError'); */
    component.viewAllMembers()
     expect(teamService.viewTeamMembersOfTeam).toHaveBeenCalled();
     /* expect(notificationService.showError).toHaveBeenCalled(); */
    
  })

  it('should store delete id', () =>{
    component.storeDeleteId("sampleDeleteId");
    expect(component.deleteId).toEqual("sampleDeleteId");
  })


  it('should delete team member', () =>{
    let response :any = "deletedSuccessfully"
    component.deleteId = "mockDeleteId";
    spy = spyOn(teamService, 'deleteTeamMember').and.returnValue(response);
    spy2 = spyOn(teamService, 'viewTeamMembersOfTeam').and.returnValue(null);
     component.deleteMember();
     expect(teamService.deleteTeamMember).toHaveBeenCalled();
  })
 /*
  it('delete team member should give error for null data', () =>{
    component.deleteMember().catch((e)=>{
      expect(e).toEqual('Something went wrong, Please try again in some moment');
    })
  }) */

/* it('view team members', ()=>{
  component.viewAllMembers().then((data)=>{
    expect(data).toBeTruthy();
    let updateRole : UpdateRoles = {
      "userId": data[0].userId,
      "teamId": data[0].teamId,
      "roleId": '555f1dfd-43e9-4cc4-8257-a6ba5c70e34d'

    }
    component.updateRoleOfMember().
  })
}) */


it('should det current team member', () =>{

})
});
