import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import checkData from 'src/app/checkData.json'; 
import { RouterTestingModule } from '@angular/router/testing';
import { GeneralService } from 'src/app/shared/services/general.service';
import { NotificationService } from 'src/app/shared/services/notification.service';

import { ViewAllTeamsComponent } from './view-all-teams.component';
import { TeamService } from 'src/app/config/services/team.service';
import { TeamDetailsService } from 'src/app/teams/services/team-details.service';

describe('ViewAllTeamsComponent', () => {
  let component: ViewAllTeamsComponent;
  let fixture: ComponentFixture<ViewAllTeamsComponent>;
  let notificationService : NotificationService;
  let generalService : GeneralService;
  let httpTestingController : HttpTestingController;
  let spy : any;
  let spy2 : any;
  let spy3 : any;
  let spy4 : any;
  let teamService : TeamService;
  let teamDetailService : TeamDetailsService;
  let router = {
    navigate: jasmine.createSpy('navigate')
  }
  let generalServiceSpy: jasmine.SpyObj<GeneralService>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports :[RouterTestingModule,  HttpClientTestingModule],
      declarations: [ ViewAllTeamsComponent ],
      providers : [{provide : NotificationService, useValue : notificationService}, {provide : Router, useValue : router}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    teamService = TestBed.inject(TeamService);
    teamDetailService = TestBed.inject(TeamDetailsService);
    generalService = TestBed.inject(GeneralService);
    notificationService = TestBed.inject(NotificationService);
    localStorage.setItem('PowerboardDashboard', JSON.stringify(checkData));
    fixture = TestBed.createComponent(ViewAllTeamsComponent);
    component = fixture.componentInstance;
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it('should create', () => {
    spy = spyOn(teamService, 'viewAllTeams').and.returnValue(null);
    expect(component).toBeTruthy();
  });

  it('get all teams', () =>{
    spy = spyOn(teamService, 'viewAllTeams').and.returnValue(null);
    component.getAllTeams();
    expect(teamService.viewAllTeams).toHaveBeenCalled();
  })

  it('get all teams should throw error', () =>{
    spy = spyOn(teamService, 'viewAllTeams').and.throwError("error getting team");
    component.getAllTeams();
    expect(teamService.viewAllTeams).toHaveBeenCalled();
  })

  it('should store delete id', () =>{
    component.storeDeleteId("sampleDeleteId");
    expect(component.deleteId).toEqual("sampleDeleteId");
  })


  it('should delete team', () =>{
    spy = spyOn(teamService, 'deleteTeam').and.returnValue(null);
    spy3 = spyOn(teamService, 'viewAllTeams').and.returnValue(null);
    /* spy2 = spyOn(notificationService, 'showSuccess'); */
    component.storeDeleteId(null);
    component.deleteTeam();
    expect(teamService.deleteTeam).toHaveBeenCalled();
    
  })

  it('should catch exception for delete team', () =>{
    let reason : any = {
      error : {
        message : "error deleting team members"
      }
    }
    spy = spyOn(teamService, 'deleteTeam').and.throwError(reason);
    component.deleteTeam();
    expect(teamService.deleteTeam).toHaveBeenCalled();
  })

it('should view team', () =>{
  spy = spyOn(teamDetailService, 'getTeamDetails').and.returnValue(null);
  spy2 = spyOn(teamDetailService, 'setTeamDetailPermissions');
  spy4 = spyOn(generalService, 'setShowNavbarIconsAsTrue');
  component.viewTeam("mockTeamId");
  expect(teamDetailService.getTeamDetails).toHaveBeenCalled();
})

  it('should get center name from center id', () =>{
    expect(component.centerIdToname('99055bf7-ada7-495c-8019-8d7ab62d488e')).toEqual('ADCenter Bangalore')
  })

 
});



  /* it('get team details should run',() =>{
    component.getTeamDetails('46455bf7-ada7-495c-8019-8d7ab76d488e').then((data) => {
      expect(generalServiceSpy.showNavBarIcons).toEqual(true);
    })
  }) */

  /* it('get all teams and view teams', () =>{
    component.getAllTeams().then((data) =>{
      expect(data).toBeTruthy();
      component.getTeamDetails((data[0].teamId)).then((teamdata)=>{
        expect(generalServiceSpy.showNavBarIcons).toEqual(true);
      })
    })
  }) */