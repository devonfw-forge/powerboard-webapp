import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  FormBuilder,

  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { TeamDetailResponse } from 'src/app/shared/model/general.model';
import { GeneralService } from 'src/app/shared/services/general.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { TeamDetailsService } from 'src/app/teams/services/team-details.service';
import { environment } from 'src/environments/environment';
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

  imagePath : string;
  teamDetails : TeamDetailResponse = new TeamDetailResponse();
  asset_url: string;

  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
    private router: Router,
    private teamDetailsService : TeamDetailsService,
    private generalService: GeneralService,
    public notificationService : NotificationService,
    private changeDetector: ChangeDetectorRef
  ) {
    this.authError = null;
    this.imagePath = ""
  }

  ngOnInit(): void {
    this.asset_url= environment.AWS_ASSETS_URL as string;
    this.loginForm = this.fb.group({
      id: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  async login() {
    try {
      this.powerboardLoginResponse = new PowerboardLoginResponse();
      const data = await this.authService.Login(
        this.loginForm.controls['id'].value,
        this.loginForm.controls['password'].value
      );
      
      this.powerboardLoginResponse = data;
     
      this.generalService.setPermissions(
        this.powerboardLoginResponse.loginResponse.privileges
      );
      localStorage.setItem(
        'PowerboardDashboard',
        JSON.stringify(this.powerboardLoginResponse)
      );
      this.generalService.setLoginComplete(true);
      this.generalService.setpowerboardLoginResponse(this.powerboardLoginResponse);
      if (this.powerboardLoginResponse.loginResponse.isPasswordChanged) {   
        this.generalService.checkLastLoggedIn();
      } else {
        this.router.navigateByUrl('auth/resetpassword');
      }
      this.teamDetailsService.setTeamDetailPermissions();
      this.generalService.checkVisibility();
      this.changeDetector.detectChanges();
      this.notificationService.showSuccess("", "Login Successful");
    } catch (e) {
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
      const data:any = await this.authService.guestLogin();
 
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
      this.router.navigate(['teams/projects']);
  
    } catch (e) {
      window.alert(e.error.message);
      this.router.navigateByUrl('/');
    }
  }

}
