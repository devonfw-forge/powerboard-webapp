import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import checkData from 'src/app/checkData.json'; 
import { GeneralService } from 'src/app/shared/services/general.service';
import { AuthService } from '../../services/auth.service';
import { ResetPasswordComponent } from './reset-password.component';
class MockRouter{
  navigate(url : string){
    return url ;
  }
}
describe('ResetPasswordComponent', () => {
  let component: ResetPasswordComponent;
  let fixture: ComponentFixture<ResetPasswordComponent>;
  class MockRouter {
    navigate(path:string){
     return path;
    }
    navigateByUrl(path:string){
      return path;
    }
  }
  class MockAuthService{
    resetPassword(form:any){
      return null;
    }
  }
  class MockGeneralService{
    logout(){
      return null;
    }
    checkLastLoggedIn(){
      return null;
    }
  }
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports :[RouterTestingModule, HttpClientModule, FormsModule, ReactiveFormsModule],
      declarations: [ ResetPasswordComponent ],
      providers:[{provide : Router, useClass : MockRouter},
        {provide:AuthService,useClass:MockAuthService},
        {provide:GeneralService,useClass:MockGeneralService}
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
   spyOn(localStorage, 'clear').and.callFake(function () {
       store = {};
   });
  
   localStorage.setItem('PowerboardDashboard', JSON.stringify(checkData));
    fixture = TestBed.createComponent(ResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should go to home', () =>{
    spyOn(component.generalService, 'checkLastLoggedIn');
    component.gotoHome();
expect(component.generalService.checkLastLoggedIn).toHaveBeenCalled();
  })

  it('should reset password', ()=>{
    component.resetPasswordForm.controls['oldPassword'].setValue("mockpassword");
    component.resetPasswordForm.controls['newPassword'].setValue("mocknewPassword");
    let response : any = "password reset successfully";
    spyOn(component.authService, 'resetPassword').and.callFake(()=>{return response});
    spyOn(component.generalService, 'logout').and.callFake(()=>{return null});
    component.resetPassword();
    expect(component.authService.resetPassword).toHaveBeenCalled();
  })

  it('should throw error for reset password', ()=>{
    component.resetPasswordForm.controls['oldPassword'].setValue("mockpassword");
    component.resetPasswordForm.controls['newPassword'].setValue("mocknewPassword");
    let response : any = {
      error : {
        message : "error for reset password"
      }
    }
    spyOn(console,'log').and.callFake(()=>{return null});
    spyOn(component.authService, 'resetPassword').and.throwError(response);
    spyOn(component.generalService, 'logout').and.callFake(()=>{return null});
    component.resetPassword()
    expect(component.authService.resetPassword).toHaveBeenCalled();
    expect(console.log).toHaveBeenCalled();
  })

  it('should toggle Field TextType Old',()=>{
    component.fieldTextTypeOld = false;
    component.toggleFieldTextTypeOld();
    expect(component.fieldTextTypeOld).toEqual(true);
  })
  it('should toggle Field TextType New',()=>{
    component.fieldTextTypeNew = false;
    component.toggleFieldTextTypeNew();
    expect(component.fieldTextTypeNew).toEqual(true);
  })
  it('should toggle Field TextType Confirm',()=>{
    component.fieldTextTypeConfirm = false;
    component.toggleFieldTextTypeConfirm();
    expect(component.fieldTextTypeConfirm).toEqual(true);
  })
});
