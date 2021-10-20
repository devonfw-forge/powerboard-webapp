import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TeamDetails } from 'src/app/auth/model/auth.model';
import { PowerboardResponse, TeamDetailResponse } from 'src/app/shared/model/general.model';
import { GeneralService } from 'src/app/shared/services/general.service';
import { GetTeamDetails } from '../model/pbResponse.model';
import { ProjectTeamDetail } from '../../teams/model/team.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeamDetailsService {
 
private teamDetailPermissions : string[] = [];
  constructor(private http: HttpClient, private generalService : GeneralService) { 
    
  }
  
  async getTeamDetails(userIdTeamIdDetails : GetTeamDetails):Promise<PowerboardResponse>{
    return await this.http.post<PowerboardResponse>(
      environment.restPathRoot + 'v1/teams/powerboard/team', userIdTeamIdDetails ).toPromise();
  }

  async getTeamsInADCenter(centerId : string):Promise<ProjectTeamDetail[]>{
    return await this.http.get<ProjectTeamDetail[]>(
      environment.restPathRoot + 'v1/teams/center/' + centerId ).toPromise();
  }



  public getTeamDetailPermissions(): string[]
  {
    return this.teamDetailPermissions;
  }

  public setTeamDetailPermissions()
  {
    console.log(this.teamDetailPermissions);
    this.generalService.removeTeamDetailsPermissions(this.teamDetailPermissions);
    if(localStorage.getItem('TeamDetailsResponse')!=null){
      this.teamDetailPermissions = JSON.parse(localStorage.getItem('TeamDetailsResponse')).powerboardResponse.privileges;
    }else{
      this.teamDetailPermissions = [];
    }
    
    console.log(this.teamDetailPermissions);

    this.generalService.appendPermissions(this.teamDetailPermissions);
  }

  public setPermissionsOfTeamDetails(value : []){
    this.teamDetailPermissions = value;
    
  }

}
