import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralService } from 'src/app/shared/services/general.service';
import { PasswordResetForm } from '../../model/auth.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  password: string;
  resetForm: PasswordResetForm = new PasswordResetForm();
  constructor(
    private authService: AuthService,
    private router: Router,
    private generalService: GeneralService
  ) {}

  ngOnInit(): void {
    this.resetForm.userId = JSON.parse(
      localStorage.getItem('PowerboardDashboard')
    ).loginResponse.userId;
  }
  async resetPassword() {
    try {
      const data = await this.authService.resetPassword(this.resetForm);
      console.log(data);
      this.generalService.logout();
    } catch (e) {
      console.log(e.error.message);
      this.generalService.logout();
    }
  }

  public gotoHome() {
    this.generalService.checkLastLoggedIn();
  }
}
