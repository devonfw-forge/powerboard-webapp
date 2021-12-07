import { HttpClientModule } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { TeamDetailsService } from 'src/app/teams/services/team-details.service';
import { GeneralService } from '../../../shared/services/general.service';
import { AuthService } from '../../services/auth.service';

import { AuthComponent } from './auth.component';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;
  

  class MockRouter{
    navigateByUrl(url : string){
      return url ;
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
  class MockGeneralService{
    setPermissions(data:any){
      return data;
    }
    setLoginComplete(data:boolean){
      return data;
    }
    setpowerboardLoginResponse(data:any){
      return data;
    }
    checkLastLoggedIn(){
      return null;
    }
    checkVisibility(){
      return null;
    }
    setisGuestLogin(data:any){
      return data;
    }


  }
   
  class MockAuthService{
   response : any = {
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
    Login(userID:any,password:any){
      console.log(userID,password)
        return this.response;
    }
    guestLogin(){
      
        return this.response;
    }
  }
  class MockTeamDetailsService{
    setTeamDetailPermissions(){
      return null;
    }
  }
  class MockChangeDetector{
    detectChanges(){
      return null;
    }
  }
  beforeEach(async () => {
     
    await TestBed.configureTestingModule({
      imports :[RouterTestingModule.withRoutes([]), HttpClientModule, FormsModule, ReactiveFormsModule],
      declarations: [ AuthComponent ],
       providers:[
         {provide : GeneralService, useClass:MockGeneralService},
         {provide:AuthService,useClass:MockAuthService},
      {provide : Router, useClass:MockRouter},
      {provide : NotificationService, useClass: MockNotifyService} ,
    {provide: TeamDetailsService,useClass:MockTeamDetailsService},
  {provide:ChangeDetectorRef,useClass:MockChangeDetector}] 
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
     component.login().catch(e => {});
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
    component.login().catch(e => {});
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
   component.login().catch(e => {});
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

  it('should make auth error value to false', () => {
    component.keyPressed();
    expect(component.getAuthError()).toEqual(false);
   });
   

   it('should login for guest users',() =>{
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
    spyOn(component.authService,'guestLogin').and.callFake(()=>{return response});
    component.GuestLogin().catch(e => {});
    expect(component.authService.guestLogin).toHaveBeenCalled();
    })  

    it('should login for guest users',() =>{
      let response : any = {
        error:{message:"error loggin as guest user"}
      }
      spyOn(component.authService,'guestLogin').and.throwError(response);
      spyOn(window,'alert');
      component.GuestLogin().catch(e => {});
      expect(component.authService.guestLogin).toHaveBeenCalled();
      expect(window.alert).toHaveBeenCalled();
      }) 

})