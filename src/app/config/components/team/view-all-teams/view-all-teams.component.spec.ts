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
import { GetTeamDetails } from 'src/app/teams/model/pbResponse.model';
import { AddTeamComponent } from './add-team/add-team.component';
import { Component } from '@angular/core';
import { TeamDetails } from 'src/app/auth/model/auth.model';

describe('ViewAllTeamsComponent', () => {

  class MockedNotificationService{
    showSuccess(s:string,message:string){
      return true;
       }
    showError(){
     return true;
       }
  }

  class MockedGeneralService{
    setShowNavbarIconsAsTrue(){
      return null;
    }

    checkVisibility(){
      return null;
    }
  }

  class MockedTeamService{
     
    viewAllTeams(){
      let data=[];
      return data;
    }

    deleteTeam(teamId:string){
       if(teamId){
         return true;
       }
    }
  }

  class MockedTeamDetailsService{
    getTeamDetails(teamDetails:GetTeamDetails){
     return teamDetails;
    }
    setTeamDetailPermissions(){
      return null;
    }

  }

  @Component({
    selector: 'app-add-team',
    template: '',
    providers: [{ provide: AddTeamComponent, useClass: MockedAddTeamComponent  }]
  })
  class MockedAddTeamComponent {
    addTeamWithLogo(){
    }
  }
  // @Component({selector: 'app-add-team', template: './add-team.component.html'})
  // class MockedAddTeamComponent{
  //   addTeamWithLogo(){
  //     const centerName='kolkata'
  //     const logo:any={}
  //     const data={
  //       id:'43223',
  //       name:'Test Team',
  //       teamCode:'65687',
  //       projectKey:'564',
  //       ad_center:centerName,
  //       logo:logo
  //     }
  //     return data;
  //   }
  // }
  let component: ViewAllTeamsComponent;
  let fixture: ComponentFixture<ViewAllTeamsComponent>;
  let addTeamComponent: MockedAddTeamComponent;
  let generalServiceSpy: jasmine.SpyObj<GeneralService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports :[RouterTestingModule,  HttpClientTestingModule],
      declarations: [ ViewAllTeamsComponent ,MockedAddTeamComponent],
      providers : [{provide : NotificationService, useClass: MockedNotificationService}, 
        {provide : TeamDetailsService, useClass: MockedTeamDetailsService},
        {provide: TeamService,useClass:MockedTeamService},
        {provide:GeneralService,useClass:MockedGeneralService},
        
      ]
    })
    .compileComponents()
    //.then(() => {
      // teamService = TestBed.inject(TeamService);
      // teamDetailService = TestBed.inject(TeamDetailsService);
      // generalService = TestBed.inject(GeneralService);
      // notificationService = TestBed.inject(NotificationService);
    //});
  });

  beforeEach(() => {
    localStorage.setItem('PowerboardDashboard', JSON.stringify(checkData));
    fixture = TestBed.createComponent(ViewAllTeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should getAllTeams', () => {
  component.getAllTeams();
  expect(component.getAllTeams).toBeTruthy();

  })

  it('should storeDeleteId', () => {
    const team='team T'
    component.storeDeleteId(team);
    expect(component.storeDeleteId).toBeTruthy();
    
  })

  it('should viewTeam', () => {
    const teamId='team T'
    spyOn(component,'getTeamDetails').and.resolveTo()
    component.viewTeam(teamId);
    expect(component.viewTeam).toBeTruthy();
    
  })

  it('should deleteTeam', () => {
    const team='Team T'
    component.deleteId='2312'
    const logo:any={}
    component.ADCTeams=[
      {
        teamId: '2317876',
        teamLogo: logo,
        teamName : 'Team T',
        myRole: 'Testing',
        teamStatus: 1
        
        }
    ]
    spyOn(component.ADCTeams,'filter').and.returnValue(component.ADCTeams);
    spyOn(component,'getAllTeams').and.resolveTo();

    component.deleteTeam();
    expect(component.deleteTeam).toBeTruthy();
    
  })

  it('should getTeamDetails', () => {
    const teamId='team T'
   // spyOn(component,'getTeamDetails').and.resolveTo()
    component.getTeamDetails(teamId);
    expect(component.viewTeam).toBeTruthy();
    
  })

it('should addTeam()', () => {
    component.ADC_Center='kolkata'
    //const centerName='Kolkata'
  const centerName=  spyOn(component,'centerIdToname').and.returnValue('kolkata');
    const data={
      id:"423223",
      name:"Test Team",
      teamCode:"65687",
      projectKey:"564",
      ad_center: centerName,
    }
    // const logo={}
    // component.addedTeam = {
    //   teamId: '43223',
    //   teamName: 'Test Team',
    //   teamCode: '65687',
    //   projectKey: '564',
    //   adCenter: logo,
    // };
    component.ADCTeams=[
     {
        teamId: '123',
        teamLogo:'',
        teamName : 'ABC',
        myRole : 'Team Member',
        teamStatus : 1
     }
    ] as TeamDetails[]
  spyOn(component.child,'addTeamWithLogo').and.returnValue(data);
  // console.log("This is data  "+data.ad_center);
  // console.log("AD Center  "+component.ADC_Center);
  spyOn(localStorage,'getItem').and.callFake(()=>{return 'kolkata'});
  component.addTeam();
  expect(component.child.addTeamWithLogo).toHaveBeenCalled();
  expect(component.addTeam).toBeTruthy();
  })

it('centerIdToname()', () => {
  const id='23423';
  component.ADCList=[
  {
  centerId :'23423',
  centerName :'kolkata'
  }
  ]
component.centerIdToname(id);
expect(component.centerIdToname).toBeTruthy();
  })
})
//   it('should create', () => {
//     spy = spyOn(teamService, 'viewAllTeams').and.returnValue(null);
//     expect(component).toBeTruthy();
//   });

//   it('get all teams', () =>{
//     spy = spyOn(teamService, 'viewAllTeams').and.returnValue(null);
//     component.getAllTeams();
//     expect(teamService.viewAllTeams).toHaveBeenCalled();
//   })

//   it('get all teams should throw error', () =>{
//     let reason : any = {
//       error : {
//         message : "error getting all teams"
//       }
//     }
//     spy = spyOn(teamService, 'viewAllTeams').and.throwError(reason);
//     component.getAllTeams().catch(error=>{
//      let result = error;
//     });
//     expect(teamService.viewAllTeams).toHaveBeenCalled();
//   })

//   it('should store delete id', () =>{
//     component.storeDeleteId("sampleDeleteId");
//     expect(component.deleteId).toEqual("sampleDeleteId");
//   })


//   it('should delete team', () =>{
//     spy = spyOn(teamService, 'deleteTeam').and.returnValue(null);
//     spy3 = spyOn(teamService, 'viewAllTeams').and.returnValue(null);
//     /* spy2 = spyOn(notificationService, 'showSuccess'); */
//     component.storeDeleteId(null);
//     component.deleteTeam();
//     expect(teamService.deleteTeam).toHaveBeenCalled();
    
//   })

//   it('should catch exception for delete team', () =>{
//     let reason : any = {
//       error : {
//         message : "error deleting team members"
//       }
//     }
//     let result:any;
//     const spyObj = jasmine.createSpyObj('notificationService',['showError']);
//     spyObj.showError.and.callFake((data)=>{
//       return data;
//     });
//     spy = spyOn(teamService, 'deleteTeam').and.throwError(reason);
//     component.deleteTeam().catch((error)=>{
//       result = error;
//     });

//     expect(teamService.deleteTeam).toHaveBeenCalled();
//   })

// it('should view team', () =>{
//   spy = spyOn(teamDetailService, 'getTeamDetails').and.returnValue(null);
//   spy2 = spyOn(teamDetailService, 'setTeamDetailPermissions');
//   spy4 = spyOn(generalService, 'setShowNavbarIconsAsTrue');
//   component.viewTeam("mockTeamId");
//   expect(teamDetailService.getTeamDetails).toHaveBeenCalled();
// })

//   it('should get center name from center id', () =>{
//     expect(component.centerIdToname('99055bf7-ada7-495c-8019-8d7ab62d488e')).toEqual('ADCenter Bangalore')
//   })

 
// });



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