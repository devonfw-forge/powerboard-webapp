import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TeamDetailResponse } from 'src/app/shared/model/general.model';
import { UrlPathConstants } from 'src/app/UrlPaths';
import { environment } from '../../../environments/environment';
import { RolesResponse, TeamsResponse } from '../model/config.model';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  roles: RolesResponse[] = [];
  teamAdminRole: string = '';
  teamMemberRole: string = '';
  guestRole: string = '';
  currentTeam: TeamsResponse = new TeamsResponse();
  public teamDetails: TeamDetailResponse = new TeamDetailResponse();

  /**
   * Get all roles of a user, when config component is called
   *
   */
  constructor(private http: HttpClient) {
    this.roles = [];
    this.getAllRoles();
  }

  /**
   * Get all roles
   *
   */
  public getAllRoles() {
    this.getRoles().then(
      (data) => {
        if (data) {
          this.roles = data;
          for (let role of this.roles) {
            if (role.roleName == 'team_admin') {
              this.teamAdminRole = role.roleId;
            }
            if (role.roleName == 'team_member') {
              this.teamMemberRole = role.roleId;
            }
            if (role.roleName == 'guest_user') {
              this.guestRole = role.roleId;
            }
          }
        } else {
          this.roles = [];
        }
      },
      (reason) => {
        console.log('error getting roles', reason);
      }
    );
  }

  /**
   * Get all team details from local storage
   *
   */
  public getTeamDetails() {
    this.teamDetails = new TeamDetailResponse();
    this.teamDetails = JSON.parse(localStorage.getItem('TeamDetailsResponse'));
  }

  public setTeamDetails() {
    localStorage.setItem(
      'TeamDetailsResponse',
      JSON.stringify(this.teamDetails)
    );
  }

  /**
   * Get all user roles from local storage
   */
  async getRoles(): Promise<RolesResponse[]> {
    return this.http
      .get<RolesResponse[]>(
        environment.globalEndPoint + UrlPathConstants.viewAllUserRolesEndPoint
      )
      .toPromise();
  }
}
