import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import teamDetailsResponse from '/src/app/teamDetailsResponse.json';
import { ViewAllTeamMembersComponent } from './view-all-team-members.component';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { TeamService } from 'src/app/config/services/team.service';
import { AddMemberComponent } from './add-member/add-member.component';
import { EditTeamMemberComponent } from './edit-team-member/edit-team-member.component';

describe('ViewAllTeamMembersComponent', () => {
  let component: ViewAllTeamMembersComponent;
  let teamService : TeamService;
  let fixture: ComponentFixture<ViewAllTeamMembersComponent>;
  
  class MockTeamService{
    public viewTeamMembersOfTeam(teamId:string){
      if(teamId){
        return null;
      }
      else{
        let response: any = {
          error: {
            message :"error getting team members"
          }
        }
        throw new Error(response);
      }
    }
    public deleteTeamMember(deleteId:string){
      if(deleteId.length>0){
        return null;
      }
      else{
        let response: any = {
          error: {
            message :"error deleting team members"
          }
        }
        throw new Error(response);
      }
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


  beforeEach(async () => {    
    await TestBed.configureTestingModule({      
      imports :[RouterTestingModule, HttpClientModule, FormsModule, ReactiveFormsModule],
      declarations: [ ViewAllTeamMembersComponent ,AddMemberComponent,EditTeamMemberComponent],      
      providers : [{provide : NotificationService, useClass : MockNotifyService},
      {provide:TeamService,useClass:MockTeamService}]    
    }).compileComponents();
  });



  beforeEach(() => {
    var store = {};

  spyOn(localStorage, 'getItem').and.callFake(function (key) {
    return store[key];
  });
  spyOn(localStorage, 'setItem').and.callFake(function (key, value) {
    return store[key] = value + '';
  });
  spyOn(localStorage, 'removeItem').and.callFake(function (key) {
    return store[key] = null;
  });
  spyOn(localStorage, 'clear').and.callFake(function () {
      store = {};
  });

    fixture = TestBed.createComponent(ViewAllTeamMembersComponent);
    localStorage.setItem('TeamDetailsResponse', JSON.stringify(teamDetailsResponse));
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

   it('should create', () => {
     spyOn(component, 'viewAllMembers').and.callFake(()=>{return null});
      expect(component).toBeTruthy();
  });

  it('should  view all team members', () =>{
    spyOn(component.teamService,'viewTeamMembersOfTeam');
    component.viewAllMembers();
    expect(component.teamService.viewTeamMembersOfTeam).toHaveBeenCalled();
    
  })

  it('should store delete id', () =>{
    component.storeDeleteId("sampleDeleteId");
    expect(component.deleteId).toEqual("sampleDeleteId");
  })


  it('should delete team member', () =>{
    let response :any = "deletedSuccessfully"
    component.deleteId = "mockDeleteId";
    spyOn(component.teamService,'deleteTeamMember');
     component.deleteMember();
     expect(component.teamService.deleteTeamMember).toHaveBeenCalled();
  })
  it('should delete team member for null', () =>{
    component.deleteId = null;
    spyOn(component.teamService,'deleteTeamMember');
     component.deleteMember();
     expect(component.teamService.deleteTeamMember).toHaveBeenCalled();
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

  it('should add member',()=>{
    spyOn(component.child,'addTeamMember').and.callFake(()=>{return true});
    spyOn(component,'viewAllMembers').and.callFake(()=>{return null});
    component.addMember();
    expect(component.child.addTeamMember).toHaveBeenCalled();
  })

  it('should not add member if returns false',()=>{
    spyOn(component.child,'addTeamMember').and.callFake(()=>{return false});
    component.addMember();
    expect(component.child.addTeamMember).toHaveBeenCalled();
  })

  it('should close',()=>{
    spyOn(component.child.memberGroup,'reset').and.callFake(()=>{return null});
    component.close()
    expect(component.child.roleName).toEqual("select Role");
  })


  it('should edit team member',()=>{
    let response : any ={
      message : "mock"
    }
    spyOn(component.editChild,'editTeamMember').and.callFake(()=>{return response});
    component.editTeamMember();
    expect(component.editChild.editTeamMember).toHaveBeenCalled();
  })

  it('should edit team member',()=>{
    let response : any ={
      error :{
        message :"error editing team member"
      }
    }
    spyOn(component.editChild,'editTeamMember').and.throwError(response);
    component.editTeamMember();
    expect(component.editChild.editTeamMember).toHaveBeenCalled();
  })

  it('should set current team member',()=>{
    spyOn(component.editChild,'getCurrentTeamMember').and.callFake(()=>{return null});
    component.setCurrentTeamMember(null);
    expect(component.editChild.getCurrentTeamMember).toHaveBeenCalled();
  })

});
