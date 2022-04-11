import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LinksCategory } from 'src/app/shared/model/general.model';
import { UrlPathConstants } from 'src/app/UrlPaths';
import { environment } from '../../../environments/environment';
import {
  DeleteResponse,
  UpdateTeam
} from '../model/config.model';

@Injectable({
  providedIn: 'root',
})
export class SetupService {

  admin_setup: boolean = false;
  
  viewSubFolder: boolean= false;
  selectedSubFolderId: string='';
  selectedSubFolderName: string= '';

  constructor(private http: HttpClient) { }

  activeAdminSetup(){
    this.admin_setup = true;
  }
  deactiveAdminSetup(){
    this.admin_setup = false;
  }

 
  async addLogoToTeam(teamId, file:File):Promise<any>{
    // Headers
    const formData = new FormData();
    formData.append('logo', file, file.name);
    return this.http
    .post<any>(environment.globalEndPoint + UrlPathConstants.uploadLogoEndPoint + teamId, formData).toPromise();
  }


  async deleteLogo(teamId:string):Promise<any>{
    return this.http.delete<any>(
      environment.globalEndPoint + UrlPathConstants.deleteLogoEndPoint + teamId).toPromise();
  }


  async updateTeam(formData: UpdateTeam, teamId : string):Promise<any>{
    return this.http.put<any>(
      environment.globalEndPoint + UrlPathConstants.updateTeamEndPoint+ teamId, formData ).toPromise();
  }


  
  async deleteLink(teamLinkId:string):Promise<any>{
    return this.http.delete<any>(
      environment.globalEndPoint + UrlPathConstants.deleteLinkEndPoint + teamLinkId).toPromise();
  }

  async getLinkTypes(): Promise<any>{
    return this.http.get<any>(environment.globalEndPoint + UrlPathConstants.getLinksCategoryEndPoint).toPromise();
  }


  async addLink(addLinkForm: LinksCategory){
    return this.http.post(environment.globalEndPoint + UrlPathConstants.addLinkEndPoint, addLinkForm).toPromise();
  }



  
  async addFilesToTeam(teamId, file:File):Promise<any>{
    // Headers
    const formData = new FormData();
    formData.append('file', file, file.name);
    return this.http
    .post<any>(environment.globalEndPoint + UrlPathConstants.uploadFileEndPoint + teamId, formData).toPromise();
  }
  


   async addFolderToTeam(teamId: string, name :string):Promise<any>{
    // Headers
    return this.http
    .post<any>(environment.globalEndPoint + UrlPathConstants.addFolderEndPoint + teamId, {name}).toPromise();
  }
 


  async addFileInSubFolder(folderId, teamId, file:File):Promise<any>{
    // Headers
    const formData = new FormData();
    formData.append('file', file, file.name);
    return this.http
    .post<any>(environment.globalEndPoint + UrlPathConstants.uploadFileToFolderEndPoint + folderId + '/' + teamId, formData).toPromise();
  }
  
  
  async deleteFilesAndFolders(teamId : string , deleteResponse : DeleteResponse):Promise<any>{
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: deleteResponse,
    };
    
    return this.http.delete<any>(
      environment.globalEndPoint + UrlPathConstants.deleteFilesAndFoldersEndPoint + teamId , options).toPromise();
  }


  async addToSlideshow(teamId: string,  fileAndFolderIds : string[]):Promise<any>{
    // Headers
    return this.http
    .post<any>(environment.globalEndPoint + UrlPathConstants.addToSlideshowEndPoint + teamId, {fileAndFolderIds}).toPromise();
  }



  async uploadXLSXFile(file:File, type, teamId):Promise<any>{
    const formData = new FormData();
    formData.append('file', file, file.name);
    console.log(formData);
    return this.http
    .post<any>(environment.globalEndPoint + UrlPathConstants.uploadXLSXEndPoint + type + '/' + teamId, formData).toPromise();

  }

  
  async uploadClientRating(clientRating, type, teamId):Promise<any>{
    console.log({clientRating});
    console.log(type);
    console.log(teamId);
    return this.http
    .post<any>(environment.globalEndPoint + UrlPathConstants.uploadClientRatingEndPoint + type + '/' + teamId, {clientRating}).toPromise();

  }
}


