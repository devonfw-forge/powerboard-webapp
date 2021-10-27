import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ResetPasswordComponent } from './reset-password.component';
import checkData from 'src/app/checkData.json';
import { GeneralService } from 'src/app/shared/services/general.service';
import { AuthService } from '../../services/auth.service';

class MockRouter{
  navigate(url : string){
    return url ;
  }
}
describe('ResetPasswordComponent', () => {
  let component: ResetPasswordComponent;
  let fixture: ComponentFixture<ResetPasswordComponent>;
  let authService : AuthService;
  let generalService : GeneralService;
  let spy :any;
  let spy1 :any;
  let router = {
    navigate: jasmine.createSpy('navigate')
  }
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports :[RouterTestingModule, HttpClientModule, FormsModule],
      declarations: [ ResetPasswordComponent ],
      providers:[{provide : Router, useClass : MockRouter}] 
    })
    .compileComponents();
  });

  beforeEach(() => {
    generalService = TestBed.inject(GeneralService);
    authService = TestBed.inject(AuthService);
    localStorage.setItem('PowerboardDashboard', JSON.stringify(checkData));
    fixture = TestBed.createComponent(ResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should go to home', () =>{
    spy = spyOn(generalService, 'checkLastLoggedIn');
    component.gotoHome();
expect(generalService.checkLastLoggedIn).toHaveBeenCalled();
  })

  it('should reset password', ()=>{
    let response : any = "password reset successfully";
    spy = spyOn(authService, 'resetPassword').and.returnValue(response);
    spy1 = spyOn(generalService, 'logout');
    component.resetPassword();
    expect(authService.resetPassword).toHaveBeenCalled();
  })

  it('should throw error for reset password', ()=>{
    let response : any = {
      error : {
        message : "error for reset password"
      }
    }
    spy = spyOn(authService, 'resetPassword').and.throwError(response);
    spy1 = spyOn(generalService, 'logout');
    component.resetPassword().catch(e =>{
      
    })
    expect(authService.resetPassword).toHaveBeenCalled();
  })
});
