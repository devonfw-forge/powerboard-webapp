import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { PowerboardLoginResponse } from 'src/app/auth/model/auth.model';

import checkData from 'src/app/checkData.json'
import TeamDetailsResponse from 'src/app/teamDetailsResponse.json' 
import { GeneralService } from './general.service';

describe('GeneralService', () => {
  let service: GeneralService;
  let httpTestingController : HttpTestingController;
  let router = {
    navigate: jasmine.createSpy('navigate')
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[RouterTestingModule, HttpClientTestingModule],
      providers: [{ provide: Router, useValue: router }]
      
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
    service = TestBed.inject(GeneralService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should append permissions', () => {
    let permissions : string[] = ["add","remove"];
    service.setPermissions(permissions);
    let newPermissions : string[] = ["add","remove","edit"];
    service.appendPermissions(["edit"]);
    expect(JSON.stringify(service.getPermissions())).toEqual(JSON.stringify(newPermissions));
  });

  it('should remove some permissions', () => {
    let newPermissions : string[] = ["add","remove"];
    let permissions : string[] = ["add","remove","edit"];
    service.setPermissions(permissions);
    service.removeTeamDetailsPermissions(["edit"]);
    expect(JSON.stringify(service.getPermissions())).toEqual(JSON.stringify(newPermissions));
  });

  it('should logout', () => {
    service.logout();
    expect(localStorage.getItem('PowerboardDashboard')).toBeNull();
    expect(localStorage.getItem('TeamDetailsResponse')).toBeNull();
    expect(localStorage.getItem('currentTeam')).toBeNull();
    expect(service.getPermissions().length).toEqual(0);
    expect(service.showNavBarIcons).toEqual(false);
    expect(service.getLoginComplete()).toEqual(false);
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should check visibility', () => {
    let permissions : string[] = ["add","remove"];
    service.setPermissions(permissions);
    service.checkVisibility();
    if(service.getLoginComplete()){
      expect(service.isHomeVisible).toEqual(true);
      expect(service.isLogoutVisible).toEqual(true);
    }
    else{
      expect(service.isHomeVisible).toEqual(false);
      expect(service.isLogoutVisible).toEqual(false);
      expect(service.isSettingsVisible).toEqual(false);
      expect(service.isDashboardVisible).toEqual(false);
      expect(service.isMultimediaVisible).toEqual(false);
      expect(service.isLinksVisible).toEqual(false);
      expect(service.isSlideshowVisible).toEqual(false);
    }
    if(service.getLoginComplete() && service.showNavBarIcons){
      expect(service.isDashboardVisible).toEqual(true);
      expect(service.isMultimediaVisible).toEqual(true);
    }
    else{
      expect(service.isDashboardVisible).toEqual(false);
      expect(service.isMultimediaVisible).toEqual(false);
      expect(service.isLinksVisible).toEqual(false);
      expect(service.isSlideshowVisible).toEqual(false);
    }

  });

  it('should check last logged in', () => {
    let loginResponse = new PowerboardLoginResponse();
    service.setpowerboardLoginResponse(loginResponse);
    service.checkLastLoggedIn();
    expect(router.navigate).toHaveBeenCalledWith(['teams/projects']);
  });

  it('getProject details should throw erorr for empty data', () =>{
    let result;
    service.getProjectDetails("").then((data) =>{
      result = data;
    }).catch(error => {
      result = error;
    })
    let req = httpTestingController.expectOne("http://localhost:3001/v1/auth/home/");
    req.flush("404 Not Found",{
      status : 404,
      statusText : "Cannot GET /v1/auth/home/"
    });
  });

  it('getProject details should throw erorr for null data', () =>{
    let result;
    service.getProjectDetails(null).then((data) =>{
      result = data;
    }).catch(error => {
      result = error;
    })
    let req = httpTestingController.expectOne("http://localhost:3001/v1/auth/home/null");
    req.flush("500 Internal Server Error",{
      status : 500,
      statusText : "Something went wrong, Please try again in some moment"
    });
  });

  it('send last logged project should throw erorr for incorrect data', () =>{
    let result;
    service.userIdTeamIdDetails.teamId= "incorrectteamId";
    service.userIdTeamIdDetails.userId= "incorrectuserid";
    service.sendLastLoggedIn().then((data) =>{
      result = data;
    }).catch(error => {
      result = error;
    })
    let req = httpTestingController.expectOne("http://localhost:3001/v1/user/team/loggedProject");
    req.flush("500 Internal Server Error",{
      status : 500,
      statusText : "Something went wrong, Please try again in some moment"
    });
  });

  it('get files from folder should throw erorr for empty data', () =>{
    let result;
    service.getAllFilesFromFolder("","").then((data) =>{
      result = data;
    }).catch(error => {
      result = error;
    })
    let req = httpTestingController.expectOne("http://localhost:3001/v1/multimedia/getAllFilesInFolder//");
    req.flush("404 Not Found",{
      status : 404,
      statusText : "Cannot GET /v1/auth/home/"
    });
  });

  it('get files from folder should throw erorr for null data', () =>{
    let result;
    service.getAllFilesFromFolder(null,null).then((data) =>{
      result = data;
    }).catch(error => {
      result = error;
    })
    let req = httpTestingController.expectOne("http://localhost:3001/v1/multimedia/getAllFilesInFolder/null/null");
    req.flush("500 Internal Server Error",{
      status : 500,
      statusText : "Something went wrong, Please try again in some moment"
    });
  });


  it('get files from team should throw erorr for empty data', () =>{
    let result;
    service.getAllFilesFromTeam("").then((data) =>{
      result = data;
    }).catch(error => {
      result = error;
    })
    let req = httpTestingController.expectOne("http://localhost:3001/v1/multimedia/getAllFilesForTeam/");
    req.flush("400 Bad Request",{
      status : 400,
      statusText : "Invalid param id. Number expected"
    });
  });

  it('get files from team should throw erorr for null data', () =>{
    let result;
    service.getAllFilesFromTeam(null).then((data) =>{
      result = data;
    }).catch(error => {
      result = error;
    })
    let req = httpTestingController.expectOne("http://localhost:3001/v1/multimedia/getAllFilesForTeam/null");
    req.flush("500 Internal Server Error",{
      status : 500,
      statusText : "Something went wrong, Please try again in some moment"
    });
  });

  it('get slideshow files should throw erorr for empty data', () =>{
    let result;
    service.getSlideshowFiles("").then((data) =>{
      result = data;
    }).catch(error => {
      result = error;
    })
    let req = httpTestingController.expectOne("http://localhost:3001/v1/multimedia/slideshow/");
    req.flush("400 Bad Request",{
      status : 400,
      statusText : "Invalid param id. Number expected"
    });
  });

  it('get slideshow files should throw erorr for null data', () =>{
    let result;
    service.getSlideshowFiles(null).then((data) =>{
      result = data;
    }).catch(error => {
      result = error;
    })
    let req = httpTestingController.expectOne("http://localhost:3001/v1/multimedia/slideshow/null");
    req.flush("500 Internal Server Error",{
      status : 500,
      statusText : "Something went wrong, Please try again in some moment"
    });
  });



  it('should set show nav bar icons as true',()=>{
    service.setShowNavbarIconsAsTrue();
    expect(service.IsShowNavBarIcons()).toEqual(true);
  })

  it('should set show nav bar icons as false',()=>{
    service.setShowNavbarIconsAsFalse();
    expect(service.IsShowNavBarIcons()).toEqual(false);
  })

  it('should get getIsLinksVisible',()=>{
    expect(service.getIsLinksVisible()).toEqual(service.isLinksVisible);
  })

  // it('should get logo path',()=>{
  //   expect(service.getLogoPath()).toBeDefined();
  // })

  it('should getLogopath return null if logo is having error',()=>{
    let newTeamDetails: any ={
      "powerboardResponse": {
          "logo": "undefined/sample_logo.jpg",
          }
      }
      localStorage.setItem('TeamDetailsResponse', JSON.stringify(newTeamDetails));
      expect(service.getLogoPath()).toEqual(null);
      localStorage.setItem('TeamDetailsResponse', JSON.stringify(TeamDetailsResponse));    
  })

  it('should getLogopath return null if logo is not there',()=>{
    let newTeamDetails: any ={
      "powerboardResponse": {
          "logo": undefined,
          }
      }
      localStorage.setItem('TeamDetailsResponse', JSON.stringify(newTeamDetails));
      expect(service.getLogoPath()).toEqual(null);
      localStorage.setItem('TeamDetailsResponse', JSON.stringify(TeamDetailsResponse));    
  })

  it('should get powerboard login response to be truthy',()=>{
    expect(service.getpowerboardLoginResponse()).toBeDefined();
  })

  it('should get is guest login with set guest login',()=>{
    service.setisGuestLogin(true);
    expect(service.getisGuestLogin()).toEqual(true);
    service.setisGuestLogin(false);
  })

  it('should check last logged in',()=>{
    let newResponse :any ={
      "loginResponse" : {
        "powerboardResponse": {
          "team_id": "mockTeamId"
        }
      }
    }
    service.setpowerboardLoginResponse(newResponse)
    spyOn(service,'checkVisibility').and.callFake(()=>{return null});
    service.checkLastLoggedIn();
    expect(router.navigate).toHaveBeenCalled();
    localStorage.setItem('TeamDetailsResponse', JSON.stringify(TeamDetailsResponse));
  })

  it('should store last logged in',()=>{
    service.lastCheckedInProjectId = "mockTeamIDB";
    service.storeLastLoggedIn();
    expect(localStorage.getItem).toHaveBeenCalled();
  })

  it('should store last logged in if my team is empty',()=>{
    let newPowerboardResponse : any ={
      "loginResponse": {
        "userId": "mock user id",
        "homeResponse": {
          "My_Team": []
        }
      }
    }
    localStorage.setItem('PowerboardDashboard', JSON.stringify(newPowerboardResponse));
    service.storeLastLoggedIn();
    expect(localStorage.getItem).toHaveBeenCalled();
    localStorage.setItem('PowerboardDashboard', JSON.stringify(checkData));
  })

  it('should check visibility',()=>{
    spyOn(service,'getLoginComplete').and.returnValue(true);
    service.checkVisibility();
    expect(service.isHomeVisible).toEqual(true);

  })

  it('should check visibility and make settings true',()=>{
    let permissions : any = [
      "add_team_admin",
      "view_links",
      "team_configuration"   
  ];
  spyOn(service,'getPermissions').and.returnValue(permissions);
    spyOn(service,'getLoginComplete').and.returnValue(true);
    service.checkVisibility();
    expect(service.isHomeVisible).toEqual(true);
    expect(service.isSettingsVisible).toEqual(true);
  })

  it('should check visibility and make settings true and show nav bar icons are true',()=>{
    let permissions : any = [
      "add_team_admin",
      "view_links",
      "team_configuration"   
  ];
  spyOn(service,'getPermissions').and.returnValue(permissions);
    spyOn(service,'getLoginComplete').and.returnValue(true);
    service.showNavBarIcons = true;
    service.checkVisibility();
    expect(service.isHomeVisible).toEqual(true);
    expect(service.isSettingsVisible).toEqual(true);
    expect(service.isLinksVisible).toEqual(true);
  })




});