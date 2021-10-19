import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HomeResponse, TeamDetails } from 'src/app/login/model/login.model';
import { PowerboardResponse, TeamDetailResponse } from 'src/app/model/general.model';
import { GeneralService } from 'src/app/service/general.service';
import { GetTeamDetails } from '../model/pbResponse.model';
import { ProjectTeamDetail } from '../my-projects/model/team.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeamDetailsService {
 
private teamDetailPermissions : string[] = [];
  constructor(private http: HttpClient, private generalService : GeneralService) { 
    
  }
  
  async getTeamDetails(userIdTeamIdDetails : GetTeamDetails):Promise<PowerboardResponse>{
    return await this.http.post<PowerboardResponse>(
      environment.globalEndPoint + environment.getTeamDetailsEndPoint, userIdTeamIdDetails ).toPromise();
  }

  async getTeamsInADCenter(centerId : string):Promise<ProjectTeamDetail[]>{
    return await this.http.get<ProjectTeamDetail[]>(
      environment.globalEndPoint + environment.getTeamsCenterEndPoint  + centerId ).toPromise();
  }

/* new call */

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

  public resetTeamDetailPermissions(){
    this.teamDetailPermissions = [];
  }

}
