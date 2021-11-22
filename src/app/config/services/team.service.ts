import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import {
  TeamMemberDetails,
  TeamsResponse,
  UpdateRoles
} from '../model/config.model';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  constructor(private http: HttpClient) { }

  /* async addTeam(team : TeamInfo):Promise<any>{
    return await this.http.post<any>(
      'http://localhost:3001/v1/teams/team/addTeam',team ).toPromise();
  } */

  async addTeamWithLogo(formData : FormData):Promise<any>{
    return this.http.post<any>(
      environment.globalEndPoint + environment.addTeamEndPoint, formData).toPromise();
  }
  

  async deleteTeam(teamId : string):Promise<any>{
    const requestOptions: Object = {
      
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      responseType: 'text' 
   }
    return this.http.delete<any>(
      environment.globalEndPoint + environment.deleteTeamEndPoint+ teamId, requestOptions).toPromise();
  }

  async viewAllTeams():Promise<TeamsResponse[]>{
    return this.http.get<TeamsResponse[]>(
      environment.globalEndPoint + environment.viewAllTeamsEndPoint).toPromise();
  }




  async addTeamMember(teamMember : TeamMemberDetails):Promise<any>{
    const requestOptions: Object = {
      
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      responseType: 'text' 
   }
    return this.http.post<any>(
      environment.globalEndPoint + environment.addTeamMemberEndPoint, teamMember, requestOptions
        
   ).toPromise();
  }

  async viewTeamMembersOfTeam(teamId : string):Promise<any>{
    return this.http.get<any>(
      environment.globalEndPoint + environment.viewAllMembersOfTeamEndPoint + teamId).toPromise();
  }

   async deleteTeamMember(userteamId : string):Promise<any>{
    return this.http.delete<any>(
      environment.globalEndPoint + environment.deleteTeamMemberEndPoint + userteamId).toPromise();
  } 

  async updateAccessRole(updateRole : UpdateRoles):Promise<any>{
    return this.http.put<any>(
      environment.globalEndPoint + environment.updateUserRoleEndPoint,updateRole).toPromise();
  }
}
