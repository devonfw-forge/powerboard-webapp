import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlPathConstants } from 'src/app/UrlPaths';
import { environment } from 'src/environments/environment';
import {
  TeamMemberDetails,
  TeamsResponse,
  UpdateRoles
} from '../model/config.model';

@Injectable({
  providedIn: 'root',
})
export class TeamService {

  requestOptions: Object = {
    headers: new HttpHeaders().set('Content-Type', 'application/json'),
    responseType: 'text' 
 }

  constructor(private http: HttpClient) { }

  /* async addTeam(team : TeamInfo):Promise<any>{
    return  this.http.post<any>(
      'http://localhost:3000/v1/teams/team/addTeam',team ).toPromise();
  } */

  async addTeamWithLogo(formData : FormData):Promise<any>{
    return  this.http.post<any>(
      environment.globalEndPoint + UrlPathConstants.addTeamEndPoint, formData).toPromise();
  }
  

  async deleteTeam(teamId : string):Promise<any>{
    return  this.http.delete<any>(
      environment.globalEndPoint + UrlPathConstants.deleteTeamEndPoint+ teamId, this.requestOptions).toPromise();
  }

  async viewAllTeams():Promise<TeamsResponse[]>{
    return  this.http.get<TeamsResponse[]>(
      environment.globalEndPoint + UrlPathConstants.viewAllTeamsEndPoint).toPromise();
  }




  async addTeamMember(teamMember : TeamMemberDetails):Promise<any>{
    
    return  this.http.post<any>(
      environment.globalEndPoint + UrlPathConstants.addTeamMemberEndPoint, teamMember, this.requestOptions
        
   ).toPromise();
  }

  async viewTeamMembersOfTeam(teamId : string):Promise<any>{
    return  this.http.get<any>(
      environment.globalEndPoint + UrlPathConstants.viewAllMembersOfTeamEndPoint + teamId).toPromise();
  }

   async deleteTeamMember(userteamId : string):Promise<any>{
    return  this.http.delete<any>(
      environment.globalEndPoint + UrlPathConstants.deleteTeamMemberEndPoint + userteamId).toPromise();
  } 

  async updateAccessRole(updateRole : UpdateRoles):Promise<any>{
    return  this.http.put<any>(
      environment.globalEndPoint + UrlPathConstants.updateUserRoleEndPoint,updateRole).toPromise();
  }
}
