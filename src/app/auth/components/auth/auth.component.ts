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
import { NotificationService } from 'src/app/shared/services/notification.service';
import { environment } from 'src/environments/environment';

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
  multimediaPrefix = environment.multimediaPrefix;
  imagePath : string;
  /* localLoader : boolean; */
  teamDetails : TeamDetailResponse = new TeamDetailResponse();

  constructor(
    private fb: FormBuilder,
    private loginService: AuthService,
    private router: Router,
    private teamDetailsService : TeamDetailsService,
    private generalService: GeneralService,
    private notificationService : NotificationService,
    private changeDetector: ChangeDetectorRef
  ) {
    this.authError = null;
    /* this.localLoader = false; */
    this.imagePath = this.multimediaPrefix + "multimedia/46455bf7-ada7-495c-8019-8d7ab76d490e/Screenshot(3)2fd7e5fd-5340-47b3-b704-f18596a38656.png"
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      id: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  async login() {
    try {
    /*  this.localLoader = true; */
      const data = await this.loginService.Login(
        this.loginForm.controls.id.value,
        this.loginForm.controls.password.value
      );
      this.powerboardLoginResponse = data;
     /*  this.localLoader = false; */
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
      this.generalService.setpowerboardLoginResponse(this.powerboardLoginResponse);
    
      if (this.powerboardLoginResponse.loginResponse.isPasswordChanged) {
        
        this.generalService.checkLastLoggedIn();
      } else {
        this.router.navigateByUrl('/resetpassword');
      }
      this.teamDetailsService.setTeamDetailPermissions();
      this.generalService.checkVisibility();
      
      this.notificationService.showSuccess("", "Login Successful");
    } catch (e) {
     /*  this.localLoader = false; */
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

  async GuestLogin(){

    try {
      const data:any = await this.loginService.guestLogin();
 
      this.powerboardLoginResponse.loginResponse.homeResponse = data.homeResponse;
      this.generalService.setisGuestLogin(true);
      this.generalService.setPermissions(
        
        null
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
