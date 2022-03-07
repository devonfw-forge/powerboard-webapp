import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GeneralService } from 'src/app/shared/services/general.service';
import { PasswordResetForm } from '../../model/auth.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
password : string;
fieldTextTypeOld: boolean = false;
fieldTextTypeNew: boolean = false;
fieldTextTypeConfirm: boolean = false;
resetForm : PasswordResetForm = new PasswordResetForm();
resetPasswordForm: FormGroup;
  constructor(public authService : AuthService, private router :Router, private fb: FormBuilder, public generalService : GeneralService) { }
/**
 * Form group is created
 * Set validations for user
 * Get userId from the local storage
 */
  ngOnInit(): void {
    this.resetPasswordForm = this.fb.group({
      oldPassword: ['', [Validators.required, Validators.minLength(3)]],
      newPassword: ['', [Validators.required, Validators.minLength(3)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(3)]],
    });
    this.resetForm.userId = JSON.parse(localStorage.getItem('PowerboardDashboard')).loginResponse.userId;
  }
  /**
   * Sends a reset password form containing 
   * old password, new password and userID to the auth service
   */
  async resetPassword(){
    try{
      this.resetForm.oldPassword = this.resetPasswordForm.controls['oldPassword'].value;
      this.resetForm.newPassword = this.resetPasswordForm.controls['newPassword'].value;
      const data = await this.authService.resetPassword(this.resetForm);
      console.log(data);
      this.generalService.logout();
    }
    catch(e){
      console.log(e.error.message);
      this.generalService.logout();
     
    }
  }

  public gotoHome(){
  
    this.generalService.checkLastLoggedIn();
  }


  toggleFieldTextTypeOld() {
    this.fieldTextTypeOld = !this.fieldTextTypeOld;
  }

  
  toggleFieldTextTypeNew() {
    this.fieldTextTypeNew = !this.fieldTextTypeNew;
  }

  toggleFieldTextTypeConfirm() {
    this.fieldTextTypeConfirm = !this.fieldTextTypeConfirm;
  }
}
