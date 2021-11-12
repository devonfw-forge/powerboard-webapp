import { HttpClientModule } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthServiceMock } from 'src/app/mocks/auth.service.mock';
import { GeneralServiceMock } from 'src/app/mocks/general.service.mock';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { ProjectsComponent } from 'src/app/teams/components/project-display/projects/projects.component';
import { TeamDetailsService } from 'src/app/teams/services/team-details.service';
import { GeneralService } from '../../../shared/services/general.service';
import { PowerboardLoginResponse } from '../../model/auth.model';
import { AuthService } from '../../services/auth.service';

import { AuthComponent } from './auth.component';

describe('AuthComponent', () => {

  class TeamDetailsServiceMock{
    setTeamDetailPermissions(){

    }
  }

  class MockNotificationService{
    showSuccess(message:string){
     return message;
    }
  }
class MockRouter{
  navigateByUrl(){
   
  };
}

// class MockLocalStorage{
//   // getItem: (key: string): string => {
//   //   return key in store ? store[key] : null;
//   // },
//   // setItem: (key: string, value: string) => {
//   //   store[key] = `${value}`;
//   // }
//   setItem(key: string, value: string){
   
//   }
//   getItem(){
//     return 'some object'
//   }
// }

  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;
  let generalService : GeneralService;
  let notificationService : NotificationService;
  let authService: AuthService;
  let router:Router;
  let PowerboardDashboard :any = {
    loginResponse: {
      homeResponse: {     
        My_Team: [
          {
            teamId: "mockTeamId",
            teamName: "Team Mock",
            teamLogo: "mock logo",
            myRole: "mock role",
            teamStatus: 3
          }
        ]
      }
    }
  }
 
  // beforeEach(() => {

  //   var store = {};



  // spyOn(localStorage, 'getItem').and.callFake(function (key) {

  //   return store[key];

  // });

  // spyOn(localStorage, 'setItem').and.callFake(function (key, value) {

  //   return store[key] = value + '';

  // });

  // spyOn(localStorage, 'removeItem').and.callFake(function (key) {

  //   return store[key] = null;

  // });

  // spyOn(localStorage, 'clear').and.callFake(function () {

  //     store = {};

  // });
  //  // localStorage.setItem("PowerboardDashboard",JSON.stringify(PowerboardDashboard));
  // });
    // spyOn(localStorage, 'getItem')
    //   .and.callFake(mockLocalStorage.getItem);
   
    // spyOn(localStorage, 'removeItem')
    //   .and.callFake(mockLocalStorage.removeItem);
    // spyOn(localStorage, 'clear')
    //   .and.callFake(mockLocalStorage.clear);
  
  
  // let router;
  beforeEach(async () => {
     
    await TestBed.configureTestingModule({
      imports :[RouterTestingModule.withRoutes([]), HttpClientModule, FormsModule, ReactiveFormsModule],
      declarations: [ AuthComponent ],
       providers:[
         {provide : GeneralService, useClass:GeneralServiceMock},
         {provide:AuthService,useClass:AuthServiceMock},
      {provide : Router, useClass : MockRouter},
      {provide : TeamDetailsService, useClass : TeamDetailsServiceMock},
      {provide : NotificationService, useClass:MockNotificationService},
     // {provide :Storage , useClass:MockLocalStorage}
     ] 
    })
    .compileComponents();
  });

  beforeEach(() => {

    var store = {};
  
    spyOn(localStorage, 'setItem').and.callFake((key:string, value:string):string =>  {
      return store[key] = <string>value;
    });

    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    // generalService= TestBed.inject(GeneralService);
    // notificationService = TestBed.inject(NotificationService);
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should get login complete when isPasswordchanged is true', () =>{
    let response : any = {
       loginResponse: {
       userId: "mock user id",
       isPasswordChanged: true,
       homeResponse: {
           My_Center: null,
           My_Team: [],
           Teams_In_ADC: [],
           ADC_List: []
       },
       privileges: []
       }
     }
     component.loginForm.controls['id'].setValue("mock user id");
     component.loginForm.controls['password'].setValue("mock password");
     spyOn(component.authService,'Login').and.callFake(()=>{return response});
     component.login();
     expect(component.authService.Login).toHaveBeenCalled();
   })

  it('should get login complete when isPasswordchanged is false', () =>{
   let response : any = {
      loginResponse: {
      userId: "mock user id",
      isPasswordChanged: false,
      homeResponse: {
          My_Center: null,
          My_Team: [],
          Teams_In_ADC: [],
          ADC_List: []
      },
      privileges: []
      }
    }
    component.loginForm.controls['id'].setValue("mock user id");
    component.loginForm.controls['password'].setValue("mock password");
    spyOn(component.authService,'Login').and.callFake(()=>{return response});
    component.login();
    expect(component.authService.Login).toHaveBeenCalled();
  })

  it('should get error for login with null values', () =>{
   component.loginForm.controls['id'].setValue("raj11");
    component.loginForm.controls['password'].setValue("password");
    let response :any ={
      error : {message:"error logging in"}
    }
    spyOn(component.authService,'Login').and.throwError(response);
    spyOn(window,'alert');
   component.login()
   expect(component.authService.Login).toHaveBeenCalled();
   expect(window.alert).toHaveBeenCalled();
 })

 it('should toggle field text type',()=>{
   component.fieldTextType = false;
   component.toggleFieldTextType();
   expect(component.fieldTextType).toEqual(true);
 })



  it('should return auth error value', () => {
   expect(component.getAuthError()).toEqual(null);
  });

  it('should login user successfully',async () => {
    let powerboardLoginResponse=new PowerboardLoginResponse();
    component.powerboardLoginResponse=powerboardLoginResponse;
    const loginResponse:any={}
    //let service=new AuthServiceMock();
    component.loginForm.controls['id'].setValue("test@test.com");
    component.loginForm.controls['password'].setValue("password");
   // spyOn(localStorage, 'setItem').and.callThrough();
   // localStorage.setItem("PowerboardDashboard",JSON.stringify(PowerboardDashboard));
    //spyOn(localStorage, 'setItem').and.callFake(localStorageMock)
    //spyOn(authService,'Login').and.callFake(()=>{return loginResponse})
    component.login();
    //expect(generalService.setPermissions).toHaveBeenCalled();
    expect(component.login).toBeTruthy();
  //   component.keyPressed();
  //   expect(component.getAuthError()).toEqual(false);
  //  });
  //  it('should get login complete', () =>{
  //    component.loginForm.controls['id'].setValue("raj11");
  //    component.loginForm.controls['password'].setValue("password");
  //    component.login().then((data) =>{
  //     expect(generalService.getLoginComplete()).toEqual(true);
  //    })
     
   })

  //  it('should get error for login with null values', () =>{
  //   component.loginForm.controls['id'].setValue("raj11");
  //    component.loginForm.controls['password'].setValue("password");
  //   component.login().then((data) =>{
     
  //   }).catch((e) =>{
  //     expect(router.navigate).toHaveBeenCalledWith(['/']);
  //     expect(window.alert()).toHaveBeenCalled();
  //   })
    
  // })

   it('should login for guest users',async () =>{
  //  const navigateSpy = spyOn(router, 'navigate');
  //   spyOn(localStorage,'setItem')
    component.GuestLogin();

   //expect(router.navigate).toHaveBeenCalledWith(['/projects']);
   expect(component.GuestLogin).toBeTruthy();
    }) 

    it(' toggleFieldTextType()',async () =>{
      component.fieldTextType=true;
      component.toggleFieldTextType();
      expect(component.toggleFieldTextType).toBeTruthy();
    })

    it('keyPressed()',async () =>{
      component.keyPressed();
      expect(component.keyPressed).toBeTruthy();
    })

   // fit('should throw error if there is any',async () =>{
      
     // spyOn(authService,'guestLogin').and.resolveTo(undefined);
     
    //  expect(component.GuestLogin).toBeFalsy();
   // })
})
