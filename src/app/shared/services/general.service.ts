import { HttpClient } from '@angular/common/http';
import { HostListener, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TeamDetails, PowerboardLoginResponse, HomeResponse } from 'src/app/auth/model/auth.model';
import { SetupService } from 'src/app/config/services/setup.service';
import { UrlPathConstants } from 'src/app/UrlPaths';
import { environment } from '../../../environments/environment';

import { MultimediaFilesNew, TeamDetailResponse } from '../../shared/model/general.model';
import { GetTeamDetails } from '../../teams/model/pbResponse.model';

@Injectable({
  providedIn: 'root',
})
export class GeneralService {
  teamDetails: TeamDetailResponse = new TeamDetailResponse();
  userIdTeamIdDetails: GetTeamDetails = new GetTeamDetails();
  lastCheckedInProjectId: string;
  teamsAssociatedWithUser: TeamDetails[];

  private powerboardLoginResponse: PowerboardLoginResponse = new PowerboardLoginResponse();
  private permissions: string[] = [];
  public configureButton: string = 'team_configuration';
  public viewLinks: string = 'view_links';
  public addTeam: string = 'register_team';
  public viewTeams: string = 'view_all_team';
  public deleteTeam: string = 'delete_team';
  public updateTeam: string = 'update_team';
  public addTeamMember: string = 'add_team_member';
  public viewTeamMembers: string = 'view_members_of_team';
  public deleteTeamMember: string = 'delete_team_members';
  public updateRole: string = 'update_role';
  public addGuest: string = 'add_guest_user';
  public teamConfiguration: string = 'team_configuration';
  public addTeamAdmin: string = 'add_team_admin';
  

  private loginComplete: boolean;

  isHomeVisible: boolean;
  isSlideshowVisible: boolean;
  isDashboardVisible: boolean;

  isLinksVisible: boolean;
  isMultimediaVisible: boolean;
  isSettingsVisible: boolean;
  isLogoutVisible: boolean;
  isGuestLogin: boolean;

  public showNavBarIcons: boolean;

  constructor(private router: Router, private http: HttpClient,
    private setupService: SetupService) {
    this.isHomeVisible = false;
    this.isLogoutVisible = false;
    this.isDashboardVisible = false;
    this.isMultimediaVisible = false;
    this.permissions = [];
    this.isLinksVisible = false;
    this.isSettingsVisible = false;
    this.isSlideshowVisible = false;
    this.isGuestLogin = false;
    this.loginComplete = false;
    this.showNavBarIcons = false;

    this.checkVisibility();
  }

  @HostListener('window:unload', ['$event'])
  public windowTabClosed($event: any) {
    this.logout();
    console.log('Window tab closed');
  }

  public getPermissions(): string[] {
    return this.permissions;
  }

  public setPermissions(value: string[]) {
    this.permissions = value;
  }

  public getpowerboardLoginResponse(): PowerboardLoginResponse {
    return this.powerboardLoginResponse;
  }

  public setpowerboardLoginResponse(value: PowerboardLoginResponse) {
    this.powerboardLoginResponse = value;
  }

  public appendPermissions(value: string[]) {
    if (this.permissions) {
      this.permissions = this.permissions.concat(value);
    }
    console.log(this.permissions);
  }
/**
 * Filter value from permissions
 * 
 */
  public removeTeamDetailsPermissions(value: string[]) {
    if (this.permissions && value) {
      this.permissions = this.permissions.filter(
        (ar) => !value.find((rm) => rm === ar)
      );
    }
  }
  /**
   * Check current team or project
   * Remove permissions and response 
   * Navigate to login screen
   */
  public logout() {
    this.sendLastLoggedIn();
    localStorage.removeItem('PowerboardDashboard');
    localStorage.removeItem('TeamDetailsResponse');
    localStorage.removeItem('currentTeam');
    this.setPermissions([]);
    this.setisGuestLogin(false);
    this.showNavBarIcons = false;
    this.setLoginComplete(false);
    this.checkVisibility();
    this.router.navigate(['/']);
  }
  /**
   * Check pemissions and set them, if permissions exists
   */
checkVisibilityIfLoginComplete(){
  this.isHomeVisible = true;
      this.isLogoutVisible = true;
     this.isSettingsVisible = false;
      if (this.getPermissions()) {
        for (let permission of this.getPermissions()) {
          if (this.configureButton == permission) {
            this.isSettingsVisible =true;
          }
        }
        
      }
}
/**
 * Check Permission for visiblity and set them accordingly for second nav bar
 */
checkVisibilityIfNavBarAndLoginTrue(){
  this.isDashboardVisible = true;
      this.isMultimediaVisible = true;
      this.isSettingsVisible =false;
      this.isLinksVisible = false;
      this.isSlideshowVisible = false;
      if (this.getPermissions()) {
        for (let permission of this.getPermissions()) {
          if (this.configureButton == permission) {
           this.isSettingsVisible = true;
          }
          if (this.viewLinks == permission) {
            this.isLinksVisible = true;
          }
        }
        
      }
}
/**
 * If login completed, check permissions and set accordingly
 */
  checkVisibility() {
    if (this.getLoginComplete()) {
       this.checkVisibilityIfLoginComplete();
    } else {
      this.isHomeVisible = false;
      this.isLogoutVisible = false;
      this.isSettingsVisible = false;
      this.isDashboardVisible = false;
      this.isMultimediaVisible = false;

      this.isLinksVisible = false;
      this.isSlideshowVisible = false;
    }


    if (this.showNavBarIcons && this.getLoginComplete()) {
       this.checkVisibilityIfNavBarAndLoginTrue()
    } else {
      this.isDashboardVisible = false;
      this.isMultimediaVisible = false;

      this.isLinksVisible = false;
      this.isSlideshowVisible = false;
    }
  }

  public getLoginComplete(): boolean {
    return this.loginComplete;
  }

  public setLoginComplete(value: boolean) {
    this.loginComplete = value;
  }

  public getisGuestLogin(): boolean {
    return this.isGuestLogin;
  }

  public setisGuestLogin(value: boolean) {
    this.isGuestLogin = value;
  }
/**
 * If last logged in project details exists, navigate directly to the dashboard on next login
 * else navigated to project display screen
 */
  public checkLastLoggedIn() {
    if (this.powerboardLoginResponse.loginResponse.powerboardResponse) {
      this.teamDetails.powerboardResponse = this.powerboardLoginResponse.loginResponse.powerboardResponse;
      localStorage.setItem(
        'TeamDetailsResponse',
        JSON.stringify(this.teamDetails)
      );
      
      this.showNavBarIcons = true;
      this.checkVisibility();
      this.checkIsTeamConfigured();
    } else {
      this.router.navigate(['teams/projects']);
    }
  }


  checkIsTeamConfigured(){
    if (this.powerboardLoginResponse.loginResponse.powerboardResponse) {
     let isTeamConfigured = this.powerboardLoginResponse.loginResponse.powerboardResponse.isTeamConfigured;
     this.checkDashboardOrConfig(isTeamConfigured);
    }
  }

  checkDashboardOrConfig(isTeamConfigured:boolean){
    if(isTeamConfigured){
      this.router.navigate(['teams/dashboard']);
     }
     else{
      this.router.navigate(['config']);
     }
  }
  


  /**
   * Store the last checked in project details 
   */
  storeLastLoggedIn() {
    this.userIdTeamIdDetails.userId = JSON.parse(
      localStorage.getItem('PowerboardDashboard')
    ).loginResponse.userId;
    this.teamsAssociatedWithUser = JSON.parse(
      localStorage.getItem('PowerboardDashboard')
    ).loginResponse.homeResponse.My_Team;
    this.lastCheckedInProjectId = JSON.parse(
      localStorage.getItem('TeamDetailsResponse')
    ).powerboardResponse.team_id;

    if (this.teamsAssociatedWithUser.length > 0) {
      for (let team of this.teamsAssociatedWithUser) {
        if (this.lastCheckedInProjectId == team.teamId) {
          this.userIdTeamIdDetails.teamId = team.teamId;
        }
      }
    } else {
      this.userIdTeamIdDetails.teamId = this.lastCheckedInProjectId;
    }
  }

  /* new end point call */
  async getProjectDetails(userId: string): Promise<HomeResponse> {
    return this.http
      .get<HomeResponse>(environment.globalEndPoint + UrlPathConstants.getProjectDetailsEndpoint + userId)
      .toPromise();
  }

  async sendLastLoggedIn() {
     this.http
      .put<any>(
        environment.globalEndPoint + UrlPathConstants.lastLoggedEndPoint,
        this.userIdTeamIdDetails
      )
      .toPromise();
  }
/**
 * Check if logo path is null or undefined
 * If it is null or undefined, return null
 * else extract logo path and return the path
 */
  public getLogoPath(){
    if(JSON.parse(localStorage.getItem('TeamDetailsResponse')).powerboardResponse.logo){
      const path = JSON.parse(localStorage.getItem('TeamDetailsResponse')).powerboardResponse.logo;
      const tempextension = path.split(".");
    const  extension = tempextension[tempextension.length-2];
    const Logo = ["null", "undefined", null, undefined];
      if(extension.includes(Logo[0]) || extension.includes(Logo[1]) || extension.includes(Logo[2]) || extension.includes(Logo[3])){
        return null;
      }
      return JSON.parse(localStorage.getItem('TeamDetailsResponse')).powerboardResponse.logo;
    }
    else{
      return null;
    }
   }


   async getAllFilesFromFolder(teamId: string, folderId : string): Promise<MultimediaFilesNew[]> {
    return this.http
      .get<MultimediaFilesNew[]>(environment.globalEndPoint + UrlPathConstants.FilesFromFolderEndpoint + teamId + '/' + folderId)
      .toPromise();
  }

  async getAllFilesFromTeam(teamId: string): Promise<MultimediaFilesNew[]> {
    return this.http
      .get<MultimediaFilesNew[]>(environment.globalEndPoint + UrlPathConstants.FilesForTeamEndpoint + teamId)
      .toPromise();
  }
  async getSlideshowFiles(teamId: string) : Promise<any>{
    return this.http.get<any>(environment.globalEndPoint + UrlPathConstants.getSlideshowFilesEndpoint + teamId).toPromise();
    }

    public IsShowNavBarIcons(){
      return this.showNavBarIcons;
    }

    public setShowNavbarIconsAsTrue(){
      this.showNavBarIcons = true;
    }

    public setShowNavbarIconsAsFalse(){
      this.showNavBarIcons = false;
    }
    public getIsLinksVisible(){
      return this.isLinksVisible;
    }
}
