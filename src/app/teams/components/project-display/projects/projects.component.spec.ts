import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { GeneralService } from 'src/app/shared/services/general.service';
import { TeamDetailsService } from '../../../services/team-details.service';
import checkData from 'src/app/checkData.json'; 
import { ProjectsComponent } from './projects.component';
import { GetTeamDetails } from 'src/app/teams/model/pbResponse.model';
import { ADCDetails } from 'src/app/auth/model/auth.model';

describe('ProjectsComponent', () => {
  let component: ProjectsComponent;
  let fixture: ComponentFixture<ProjectsComponent>;
  let generalService: GeneralService;
  let teamDetailsService: TeamDetailsService;
  let powerboardDashboard : any = {
    "loginResponse": {
    "userId": "11cf1dfd-43e9-4cc4-8257-a6ba5c70e33d",
    "isPasswordChanged": true,
    "homeResponse": {
        "My_Center": {
            "centerId": "99055bf7-ada7-495c-8019-8d7ab62d488e",
            "centerName": "ADCenter Bangalore"
        },
        "My_Team": [
            {
                "teamId": "46455bf7-ada7-495c-8019-8d7ab76d489e",
                "teamName": "Team B",
                "teamLogo": "TeamlogoB",
                "myRole": "team_member",
                "teamStatus": 3
            },
            {
                "teamId": "46455bf7-ada7-495c-8019-8d7ab76d490e",
                "teamName": "Team C",
                "teamLogo": "TeamLogoC",
                "myRole": "team_admin",
                "teamStatus": 3
            }
        ],
        "Teams_In_ADC": [
            {
                "teamId": "46455bf7-ada7-495c-8019-8d7ab76d488e",
                "teamName": "Team A",
                "teamLogo": "TeamLogoA",
                "teamStatus": 3
            },
            {
                "teamId": "46455bf7-ada7-495c-8019-8d7ab76d489e",
                "teamName": "Team B",
                "teamLogo": "TeamLogoB",
                "teamStatus": 3
            },
            {
                "teamId": "46455bf7-ada7-495c-8019-8d7ab76d490e",
                "teamName": "Team C",
                "teamLogo": "TeamLogoC",
                "teamStatus": 3
            }
        ],
        "ADC_List": [
            {
                "centerId": "98655bf7-ada7-495c-8019-8d7ab62d488e",
                "centerName": "ADCenter Valencia"
            },
            {
                "centerId": "98755bf7-ada7-495c-8019-8d7ab62d488e",
                "centerName": "ADCenter Mumbai"
            },
            {
                "centerId": "98855bf7-ada7-495c-8019-8d7ab62d488e",
                "centerName": "ADCenter Poland"
            },
            {
                "centerId": "98955bf7-ada7-495c-8019-8d7ab62d488e",
                "centerName": "ADCenter Murcia"
            },
            {
                "centerId": "99055bf7-ada7-495c-8019-8d7ab62d488e",
                "centerName": "ADCenter Bangalore"
            }
        ]
    },
}
}

let powerboardDashboardNew : any = {
  "loginResponse": {
  "homeResponse": {
      "My_Center": {
          "centerId": "mock id",
          "centerName": "ADCenter Bangalore"
      },
      "Teams_In_ADC": [
      ],
      "ADC_List": [
          {
              "centerId": "mock center 1",
              "centerName": "ADCenter Valencia"
          },
          {
              "centerId": "mock center 2",
              "centerName": "ADCenter Mumbai"
          },
      ]
  },
}
}
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports :[RouterTestingModule, HttpClientModule],
      declarations: [ ProjectsComponent ],
      providers : [{provide  : TeamDetailsService, useValue : teamDetailsService},{provide  : GeneralService, useValue : generalService}]
    })
    .compileComponents();
    teamDetailsService = TestBed.inject(TeamDetailsService);
  });

  beforeEach(() => {
    var store = {};

  spyOn(localStorage, 'getItem').and.callFake(function (key) {
    return store[key];
  });
  spyOn(localStorage, 'setItem').and.callFake(function (key, value) {
    return store[key] = value + '';
  });
  spyOn(localStorage, 'clear').and.callFake(function () {
      store = {};
  });
  localStorage.setItem("PowerboardDashboard",JSON.stringify(powerboardDashboard));
  
  generalService = TestBed.inject(GeneralService);
   
    fixture = TestBed.createComponent(ProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    
   const spy = spyOn(component,'getFromLocalStorage').and.returnValue(null);
    expect(component).toBeTruthy();
  });

  it('getfromlocalstorage should get details from local storage', ()=>{
    const spy = spyOn(component,'getTeamsInADC').and.returnValue(null);
     component.getFromLocalStorage();
     expect(localStorage.getItem).toHaveBeenCalled();
  }) 

  it('getfromlocalstorage should get details from local storage', ()=>{
    //should go to if part
    
  localStorage.setItem('PowerboardDashboard',JSON.stringify(powerboardDashboardNew));
    spyOn(component,'getTeamsInADC').and.returnValue(null);
    component.getFromLocalStorage();
    expect(localStorage.getItem).toHaveBeenCalled();
 }) 
/* 
 it('get teams in adc should get details', ()=>{
   let mockDetails : ADCDetails = { 
    centerId : "",
    centerName : ""
   }
 }) */


  
 /*  it('get team in adc should throw error on passing null',() =>{
    component.updatedCenter = null;
    component.ADC_Center = null;
    let request : ADCDetails ={
      centerId : null,
      centerName : null
    }
    let error: any ="error getting teams";
    const spynew = jasmine.createSpyObj('TeamDetailsService',['getTeamsInADCenter']);
    spynew.getTeamsInADCenter.and.throwError(error);
    spyOn(component,'updateTeamsInADC').and.returnValue(null);
    component.getTeamsInADC(request);
    expect(spynew.getTeamsInADCenter).toHaveBeenCalled();
  })  */

  /* it('get team in adc should  run',() =>{
    let request : ADCDetails ={
      centerId : null,
      centerName : null
    }
    const spy = spyOn(teamDetailsService,'getTeamsInADCenter').and.returnValue(null);
    spyOn(component,'updateTeamsInADC').and.returnValue(null);
    component.getTeamsInADC(request);
    expect(teamDetailsService.getTeamsInADCenter).toHaveBeenCalled();
  }) 

 
  it('get team details should run',() =>{
    spyOn(teamDetailsService,'processTeamDetails').and.returnValue(null);
    component.getTeamDetails('sample mock id');
    expect(teamDetailsService.processTeamDetails).toHaveBeenCalled();
  })  */
  // it('get team details should catch error',() =>{
  //   let response : any ={
  //     error : {
  //       message : "Unable to get team details"
  //     }
  //   }
  //   spyOn(teamDetailsService,'processTeamDetails').and.throwError(response);
  //   component.getTeamDetails('sample mock id');
  //   expect(teamDetailsService.processTeamDetails).toHaveBeenCalled();
  // }) 


  /* it('get teams in adc are updating', () =>{
    component.getTeamsInADC('98755bf7-ada7-495c-8019-8d7ab62d488e', 'ADCenter Mumbai').then((data) =>{
      let powerboardLoginResponse = JSON.parse(localStorage.getItem('PowerboardDashboard'));
      expect(powerboardLoginResponse.loginResponse.Teams_In_ADC).toEqual(component.ADCTeams);
    })
  }) */
});
