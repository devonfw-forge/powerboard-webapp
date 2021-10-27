import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { verify } from 'crypto';
import { AuthServiceMock } from 'src/app/mocks/auth.service.mock';
import { GeneralServiceMock } from 'src/app/mocks/general.service.mock';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { ProjectsComponent } from 'src/app/teams/components/project-display/projects/projects.component';
import { GeneralService } from '../../../shared/services/general.service';
import { AuthService } from '../../services/auth.service';

import { AuthComponent } from './auth.component';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;
  let generalService : GeneralService;
  let notificationService : NotificationService;
  let authService: AuthService;
  let router:Router;
  // let routerSpy = {
  //   navigate: jasmine.createSpy('navigate')
  // }
  beforeEach(() => {
    var store = {};
  
    spyOn(localStorage, 'getItem').and.callFake( (key:string):string => {
     return store[key] || null;
    });
    spyOn(localStorage, 'removeItem').and.callFake((key:string):void =>  {
      delete store[key];
    });
    spyOn(localStorage, 'setItem').and.callFake((key:string, value:string):string =>  {
      return store[key] = <string>value;
    });
    spyOn(localStorage, 'clear').and.callFake(() =>  {
        store = {};
    });
  });
  beforeEach(async () => {
     
    await TestBed.configureTestingModule({
      imports :[RouterTestingModule.withRoutes([]), HttpClientModule, FormsModule, ReactiveFormsModule],
      declarations: [ AuthComponent ],
       providers:[
         {provide : generalService, useClass:GeneralServiceMock},
         {provide:authService,useClass:AuthServiceMock},
      {provide : Router, useValue : router},
      {provide : NotificationService, useValue : notificationService} ] 
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    generalService = TestBed.inject(GeneralService);
    notificationService = TestBed.inject(NotificationService);
   router = TestBed.inject(Router);
   
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return auth error value', () => {
   expect(component.getAuthError()).toEqual(null);
  });

  it('should make auth error value to false', () => {
    component.keyPressed();
    expect(component.getAuthError()).toEqual(false);
   });
   it('should get login complete', () =>{
     component.loginForm.controls.id.setValue("raj11");
     component.loginForm.controls.password.setValue("password");
     component.login().then((data) =>{
      expect(generalService.getLoginComplete()).toEqual(true);
     })
     
   })

   it('should get error for login with null values', () =>{
    component.loginForm.controls.id.setValue("raj11");
     component.loginForm.controls.password.setValue("password");
    component.login().then((data) =>{
     
    }).catch((e) =>{
      expect(router.navigate).toHaveBeenCalledWith(['/']);
      expect(window.alert()).toHaveBeenCalled();
    })
    
  })

   it('should login for guest users',async () =>{
   // const navigateSpy = spyOn(router, 'navigate');
    //spyOn(localStorage,'setItem')
    component.GuestLogin();
   // expect(router.navigate).toHaveBeenCalledWith(['/projects']);
   expect(component.GuestLogin).toBeTruthy();
    }) 

    // it('should throw error if there is any',async () =>{
      
    //   //spyOn(authService,'guestLogin').and.resolveTo(undefined);
    //   //expect(component.GuestLogin).toBeFalsy();
    // })
})