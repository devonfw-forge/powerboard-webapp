import { ChangeDetectorRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { TeamDetailResponse } from '../../../shared/model/general.model';
import { TeamDetailsService } from '../../../teams/services/team-details.service';
import { GeneralService } from '../../../shared/services/general.service';
import { PowerboardLoginResponse } from '../../model/auth.model';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  private authError: boolean;
  fieldTextType: boolean = false;
  private powerboardLoginResponse: PowerboardLoginResponse = new PowerboardLoginResponse();
  loginForm: FormGroup;
  teamDetails: TeamDetailResponse = new TeamDetailResponse();

  constructor(
    private fb: FormBuilder,
    private loginService: AuthService,
    private router: Router,
    private teamDetailsService: TeamDetailsService,
    private generalService: GeneralService,
    private changeDetector: ChangeDetectorRef
  ) {
    this.authError = null;
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      id: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  async login() {
    try {
      const data = await this.loginService.Login(
        this.loginForm.controls.id.value,
        this.loginForm.controls.password.value
      );
      this.powerboardLoginResponse = data;
      this.generalService.setPermissions(
        this.powerboardLoginResponse.loginResponse.privileges
      );
      localStorage.setItem(
        'PowerboardDashboard',
        JSON.stringify(this.powerboardLoginResponse)
      );
      console.log(this.generalService.getPermissions());
      this.generalService.setLoginComplete(true);

      this.changeDetector.detectChanges();
      this.generalService.setpowerboardLoginResponse(
        this.powerboardLoginResponse
      );
      if (this.powerboardLoginResponse.loginResponse.isPasswordChanged) {
        this.generalService.checkLastLoggedIn();
      } else {
        this.router.navigateByUrl('/resetpassword');
      }
      this.teamDetailsService.setTeamDetailPermissions();
      this.generalService.checkVisibility();
    } catch (e) {
      console.log(e);

      window.alert(e.error.message);
      this.router.navigateByUrl('/');
    }
  }
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  keyPressed() {
    this.authError = false;
  }

  getAuthError() {
    return this.authError;
  }

  async GuestLogin() {
    try {
      const data = await this.loginService.guestLogin();
      this.powerboardLoginResponse = data;
      this.generalService.setPermissions(
        this.powerboardLoginResponse.loginResponse.privileges
      );
      localStorage.setItem(
        'PowerboardDashboard',
        JSON.stringify(this.powerboardLoginResponse)
      );

      this.generalService.setLoginComplete(true);
      this.changeDetector.detectChanges();
      this.router.navigate(['/projects']);
    } catch (e) {
      console.log(e);
      window.alert(e.error.message);
      this.router.navigateByUrl('/');
    }
  }
}
