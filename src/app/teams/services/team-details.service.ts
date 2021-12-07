import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PowerboardResponse, TeamDetailResponse } from 'src/app/shared/model/general.model';
import { GeneralService } from 'src/app/shared/services/general.service';
import { GetTeamDetails } from '../model/pbResponse.model';
import { ProjectTeamDetail } from '../../teams/model/team.model';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { UrlPathConstants } from 'src/app/UrlPaths';

@Injectable({
  providedIn: 'root'
})
export class TeamDetailsService {
  userId : string;
  private teamDetailPermissions : string[] = [];
  UserIdTeamIdDetails : GetTeamDetails = new GetTeamDetails();
  teamDetails : TeamDetailResponse = new TeamDetailResponse();
    constructor(private http: HttpClient, private generalService : GeneralService, private router:Router) { 
      
    }
    
    async getTeamDetails(userIdTeamIdDetails : GetTeamDetails):Promise<PowerboardResponse>{
      return this.http.post<PowerboardResponse>(
        environment.globalEndPoint + UrlPathConstants.getTeamDetailsEndPoint, userIdTeamIdDetails ).toPromise();
    }
  
    async getTeamsInADCenter(centerId : string):Promise<ProjectTeamDetail[]>{
      return this.http.get<ProjectTeamDetail[]>(
        environment.globalEndPoint + UrlPathConstants.getTeamsCenterEndPoint  + centerId ).toPromise();
    }
  
    public getTeamDetailPermissions(): string[]
    {
      return this.teamDetailPermissions;
    }
  
    public setTeamDetailPermissions()
    {
      console.log(this.teamDetailPermissions);
      this.generalService.removeTeamDetailsPermissions(this.teamDetailPermissions);
      const teamDetails = localStorage.getItem('TeamDetailsResponse');
        if(teamDetails){
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
  
  
  
  
    public async processTeamDetails(teamId:string){
      this.userId = JSON.parse(localStorage.getItem('PowerboardDashboard')).loginResponse.userId;
      try{
        this.UserIdTeamIdDetails.teamId = teamId;
        this.UserIdTeamIdDetails.userId = this.userId;
  
        const data = await this.getTeamDetails(this.UserIdTeamIdDetails);
        this.teamDetails.powerboardResponse = data;
        
        localStorage.setItem('TeamDetailsResponse', JSON.stringify(this.teamDetails));
        this.setTeamDetailPermissions();
        this.generalService.showNavBarIcons = true;
        this.generalService.checkVisibility();
        this.router.navigateByUrl('teams/dashboard');
        this.generalService.storeLastLoggedIn();
      }
      catch(e){
        console.log(e.error.message);
      }
    }

}
