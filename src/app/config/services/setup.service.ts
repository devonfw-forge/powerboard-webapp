import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LinkResponse, LinksCategory } from 'src/app/shared/model/general.model';
import { environment } from '../../../environments/environment';
import {
  ConfigureTeamSpirit,
  DailyMeetingLinksDetails,
  DeleteResponse,
  TeamLinksDetails,
  UpdateTeam,
} from '../model/config.model';

@Injectable({
  providedIn: 'root',
})
export class SetupService {

  
  viewSubFolder: boolean= false;
  selectedSubFolderId: string='';
  selectedSubFolderName: string= '';

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



  
  async addFilesToTeam(teamId, file:File):Promise<any>{
    // Headers
    const formData = new FormData();
    formData.append('file', file, file.name);
    return await this.http
    .post<any>(environment.globalEndPoint + environment.uploadFileEndPoint + teamId, formData).toPromise();
  }
  


   async addFolderToTeam(teamId: string, name :string):Promise<any>{
    // Headers
    return await this.http
    .post<any>(environment.globalEndPoint + environment.addFolderEndPoint + teamId, {name}).toPromise();
  }
 


  async addFileInSubFolder(folderId, teamId, file:File):Promise<any>{
    // Headers
    const formData = new FormData();
    formData.append('file', file, file.name);
    return await this.http
    .post<any>(environment.globalEndPoint + environment.uploadFileToFolderEndPoint + folderId + '/' + teamId, formData).toPromise();
  }
  
  
  async deleteFilesAndFolders(teamId : string , deleteResponse : DeleteResponse):Promise<any>{
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: deleteResponse,
    };
    
    return await this.http.delete<any>(
      environment.globalEndPoint + environment.deleteFilesAndFoldersEndPoint + teamId , options).toPromise();
  }


  async addToSlideshow(teamId: string,  fileAndFolderIds : string[]):Promise<any>{
    // Headers
    return await this.http
    .post<any>(environment.globalEndPoint + environment.addToSlideshowEndPoint + teamId, {fileAndFolderIds}).toPromise();
  }
}
