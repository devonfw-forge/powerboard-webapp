import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DeleteResponse } from '../../model/setting.model';

@Injectable({
  providedIn: 'root'
})
export class ConfigureMultimediaServiceService {

  viewSubFolder: boolean= false;
  selectedSubFolderId: string='';
  selectedSubFolderName: string= '';

  constructor(private http: HttpClient) { }

  addFolder(){

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
