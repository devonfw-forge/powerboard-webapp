import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

  addFileInRoot(){

  }
  


   async addFolderToTeam(teamId: string, folderName :string):Promise<any>{
    // Headers
    return await this.http
    .post<any>('http://localhost:3001/v1/multimedia/addFolder/' + teamId+ '/' + folderName,{}).toPromise();
  }
 


  async addFileInSubFolder(folderId, teamId, file:File):Promise<any>{
    // Headers
    const formData = new FormData();
    formData.append('file', file, file.name);
    return await this.http
    .post<any>('http://localhost:3001/v1/multimedia/uploadFileToFolder/' + folderId + '/' + teamId, formData).toPromise();
  }
  deleteItemsInRoot(){

  }
  
  async deleteFilesInSubFolder(teamId : string , deleteResponse : DeleteResponse):Promise<any>{
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: deleteResponse,
    };
    
    return await this.http.delete<any>(
      'http://localhost:3001/v1/multimedia/deleteFilesAndFolders/' + teamId , options).toPromise();
  }
}
