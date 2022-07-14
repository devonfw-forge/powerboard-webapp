
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PowerboardResponse, TeamDetailResponse } from 'src/app/shared/model/general.model';
import { GeneralService } from 'src/app/shared/services/general.service';
import { environment } from '../../../environments/environment';
import { GetTeamDetails } from '../model/pbResponse.model';
import { TeamDetailsService } from './team-details.service';
import checkData from 'src/app/checkData.json'
import TeamDetailsResponse from 'src/app/teamDetailsResponse.json' 
import { Router } from '@angular/router';

describe('TeamDetailsService', () => {
  let service: TeamDetailsService;
  let httpTestingController : HttpTestingController;
  let userIdTeamIdDetails : GetTeamDetails = new GetTeamDetails();

class MockGeneralService{
  public removeTeamDetailsPermissions(){
    return null;
  }
  public appendPermissions(){
    return null;
  }
  public showNavBarIcons= true;
  public checkVisibility(){
    return null;
  }
  public storeLastLoggedIn(){
    return null;
  }

}

class MockRouter{
  navigateByUrl(url : string){
    return url ;
  }
}

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[RouterTestingModule, HttpClientTestingModule],
      providers:[{provide:GeneralService,useClass:MockGeneralService},
        {provide:Router,useClass:MockRouter}  
      ]
      
    })
    .compileComponents();
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
  localStorage.setItem('PowerboardDashboard', JSON.stringify(checkData));
  localStorage.setItem('TeamDetailsResponse', JSON.stringify(TeamDetailsResponse));
    
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeamDetailsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('get team details should return data', async() => {
    let result : any;

    let userIdTeamId : GetTeamDetails = {
      userId : "10cf1dfd-43e9-4cc4-8257-a6ba5c70e33d",
      teamId :"46455bf7-ada7-495c-8019-8d7ab76d490e"
    }
    console.log(userIdTeamId);
    service.getTeamDetails(userIdTeamId).then((data) =>{
      
      expect(data).toBeTruthy();
    }).catch(error => {
      result = error;
    });
    const req = httpTestingController.expectOne(
      {
      method: "POST",
      url :   'http://localhost:3000/bapi/v1/teams/powerboard/team'
      });
    
   
  })

it('get team details should throw error for null values', () =>{
  let result : any;
  userIdTeamIdDetails.teamId = null;
   userIdTeamIdDetails.userId = null;
    service.getTeamDetails(userIdTeamIdDetails).then((data) =>{
      result = data;
    }).catch(error => {
      result = error;
    });
    let req = httpTestingController.expectOne("http://localhost:3000/bapi/v1/teams/powerboard/team");
    req.flush("Not Found",{
      status : 404,
      statusText : "Team Not Found"
    });
})


it('get team details should throw error for incorrect values', () =>{
  let result : any;
  userIdTeamIdDetails.teamId = 'incorrectTeamId';
   userIdTeamIdDetails.userId = 'incorrectUserId';
    service.getTeamDetails(userIdTeamIdDetails).then((data) =>{
      result = data;
    })
    .catch(error => {
      result = error;
    });
    let req = httpTestingController.expectOne("http://localhost:3000/bapi/v1/teams/powerboard/team");
    req.flush("Internal Server Error",{
      status : 500,
      statusText : "Something went wrong, Please try again in some moment"
    });
})
 

it('get teams in ADCenter should throw error for null values', () =>{
  let result;
    service.getTeamsInADCenter(null).then((data) =>{
      result = data;
    }).catch(error => {
      result = error;
    });
    let req = httpTestingController.expectOne("http://localhost:3000/bapi/v1/teams/center/null");
    req.flush("Bad Request",{
      status : 400,
      statusText : "Invalid param id. Number expected"
    });
})

it('get teams in ADCenter should throw error for incorrect values', () =>{
  let result;
    service.getTeamsInADCenter("2121212121212").then((data) =>{
      result = data;
    }).catch(error => {
      result = error;
    });
    let req = httpTestingController.expectOne("http://localhost:3000/bapi/v1/teams/center/2121212121212");
    req.flush("Internal Server Error",{
      status : 500,
      statusText : "Something went wrong, Please try again in some moment"
    });
})

it('get teams in ADCenter should return data', () =>{
  let result;
    service.getTeamsInADCenter("99055bf7-ada7-495c-8019-8d7ab62d488e").then((data) =>{
      result = data;
      expect(data).toBeDefined();
    }).catch(error => {
      result = error;
    });
   httpTestingController.expectOne("http://localhost:3000/bapi/v1/teams/center/99055bf7-ada7-495c-8019-8d7ab62d488e");
   
})



// correct above methods


  it('check set permissions of team details and checking get team details permissions',()=>{
    let permissions: any= ["1223","12334"];
    service.setPermissionsOfTeamDetails(permissions);
    expect(permissions).toEqual(service.getTeamDetailPermissions());
  })

  it('check reset permissions of team details and checking get team details permissions',()=>{
    service.resetTeamDetailPermissions();
    expect([]).toEqual(service.getTeamDetailPermissions());
  })

  it('should set team details permissions',()=>{
    localStorage.setItem('TeamDetailsResponse', JSON.stringify(TeamDetailsResponse));
    service.setTeamDetailPermissions();
    expect(localStorage.getItem).toHaveBeenCalled();
  })

  it('should set team details permissions if team details response is null',()=>{
    localStorage.removeItem('TeamDetailsResponse');
    service.setTeamDetailPermissions();
    expect(localStorage.getItem).toHaveBeenCalled();
    expect(service.getTeamDetailPermissions()).toEqual([]);
    localStorage.setItem('TeamDetailsResponse', JSON.stringify(TeamDetailsResponse));
  })


  it('should process team details',()=>{
    let response : any = {};
    spyOn(service,'getTeamDetails').and.callFake(()=>{return response });
    spyOn(service,'setTeamDetailPermissions').and.callFake(()=>{return null});
    service.processTeamDetails("mock team id");
    expect(service.getTeamDetails).toHaveBeenCalled();
  })

  it('should process team details catch error',()=>{
    let response : any = {
      error :{
        message : "error getting team Details"
      }
    };
    spyOn(service,'getTeamDetails').and.throwError(response);
    spyOn(service,'setTeamDetailPermissions').and.callFake(()=>{return null});
    service.processTeamDetails("mock team id");
    expect(service.getTeamDetails).toHaveBeenCalled();
  })

});