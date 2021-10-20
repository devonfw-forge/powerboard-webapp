import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LinkResponse, LinksCategory } from 'src/app/model/general.model';
import { environment } from 'src/environments/environment';
import { ConfigureTeamSpirit, DailyMeetingLinksDetails, TeamLinksDetails, UpdateTeam } from '../../model/setting.model';

@Injectable({
  providedIn: 'root'
})
export class SetupService {

  constructor(private http: HttpClient) { }



 
  async addLogoToTeam(teamId, file:File):Promise<any>{
    // Headers
    const formData = new FormData();
    formData.append('logo', file, file.name);
    return await this.http
    .post<any>(environment.globalEndPoint + environment.uploadLogoEndPoint + teamId, formData).toPromise();
  }


  async deleteLogo(teamId:string):Promise<any>{
    return await this.http.delete<any>(
      environment.globalEndPoint + environment.deleteLogoEndPoint + teamId).toPromise();
  }


  async updateTeam(formData: UpdateTeam, teamId : string):Promise<any>{
    return await this.http.put<any>(
      environment.globalEndPoint + environment.updateTeamEndPoint+ teamId, formData ).toPromise();
  }


  
  async deleteLink(teamLinkId:string):Promise<any>{
    return await this.http.delete<any>(
      environment.globalEndPoint + environment.deleteLinkEndPoint + teamLinkId).toPromise();
  }

  async getLinkTypes(): Promise<any>{
    return await this.http.get<any>(environment.globalEndPoint + environment.getLinksCategoryEndPoint).toPromise();
  }


   /* async deleteFile(teamId:string, imageId : string):Promise<LinksCategory[]>{
    return await this.http.delete<LinksCategory[]>(
      'http://localhost:3001/v1/multimedia/deleteFile/' + teamId+'/'+imageId).toPromise();
  } */

  /* async deleteVideos(videoId : string):Promise<any>{
    return await this.http.delete<any>(
      'http://localhost:3001/v1/videos/delete/' + videoId).toPromise();
  } */

  async addLink(addLinkForm: LinksCategory){
    return await this.http.post(environment.globalEndPoint + environment.addLinkEndPoint, addLinkForm).toPromise();
  }


}
