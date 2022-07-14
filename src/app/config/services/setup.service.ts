import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

  isTeamConfigured: boolean = true;
  
  viewSubFolder: boolean= false;
  selectedSubFolderId: string='';
  selectedSubFolderName: string= '';
  openConfigureLinks: boolean = false;
  isShowAddAggregationLinkModal:boolean = false;
  constructor(private http: HttpClient) { }

  activeAdminSetup(){
    this.isTeamConfigured = false;
  }
  deactiveAdminSetup(){
    this.isTeamConfigured = true;
  }

  goToConfigureLinks(){
    this.openConfigureLinks = true;
  }
  getOpenConfigureLinks(){
    return this.openConfigureLinks;
  }
  setOpenConfigureLinksToFalse(){
    this.openConfigureLinks = false;
  }

  showAddAggregationLinkModal(){
    this.isShowAddAggregationLinkModal = true;
  }
  hideAddAggregationLinkModal(){
    this.isShowAddAggregationLinkModal = false;
  }
  getIsShowAddAggregationLinkModal(){
    return this.isShowAddAggregationLinkModal;
  }
 
 
  async addLogoToTeam(teamId, file:File):Promise<any>{
    const formData = new FormData();
    formData.append('logo', file, file.name);
    return this.http
    .post<any>(environment.globalEndPoint + UrlPathConstants.uploadLogoEndPoint + teamId, formData).toPromise();
  }


  async deleteLogo(teamId:string):Promise<any>{
    return this.http.delete<any>(
      environment.globalEndPoint + UrlPathConstants.deleteLogoEndPoint + teamId).toPromise();
  }

  async updateTeamConfigured(teamId:string,isTeamConfiguredStatus:boolean):Promise<any>{
    let teamConfigurationStatus : any = {
      isTeamConfigured: isTeamConfiguredStatus
    }
    return this.http.put<any>(
      environment.globalEndPoint + UrlPathConstants.updateTeamConfigurationEndPoint + teamId,teamConfigurationStatus).toPromise();
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


  async addLink(addLinkForm){
    return this.http.post(environment.globalEndPoint + UrlPathConstants.addLinkEndPoint, addLinkForm).toPromise();
  }



  
  async addFilesToTeam(teamId, file:File):Promise<any>{
    const formData = new FormData();
    formData.append('file', file, file.name);
    return this.http
    .post<any>(environment.globalEndPoint + UrlPathConstants.uploadFileEndPoint + teamId, formData).toPromise();
  }
  


   async addFolderToTeam(teamId: string, name :string):Promise<any>{
    return this.http
    .post<any>(environment.globalEndPoint + UrlPathConstants.addFolderEndPoint + teamId, {name}).toPromise();
  }
 


  async addFileInSubFolder(folderId, teamId, file:File):Promise<any>{
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
    return this.http
    .post<any>(environment.globalEndPoint + UrlPathConstants.addToSlideshowEndPoint + teamId, {fileAndFolderIds}).toPromise();
  }



  async uploadXLSXFile(file:File, type, teamId):Promise<any>{
    const formData = new FormData();
    formData.append('file', file, file.name);
    return this.http
    .post<any>(environment.globalEndPoint + UrlPathConstants.uploadXLSXEndPoint + type + '/' + teamId, formData).toPromise();
  }

  async uploadJSONFile(file:File, type, teamId):Promise<any>{
    const formData = new FormData();
    formData.append('file', file, file.name);
    return this.http
    .post<any>(environment.globalEndPoint + UrlPathConstants.uploadJSONFileEndPoint + type + '/' + teamId, formData).toPromise();
  }

  
  async uploadClientRating(clientRating, type, teamId):Promise<any>{
    return this.http
    .post<any>(environment.globalEndPoint + UrlPathConstants.uploadClientRatingEndPoint + type + '/' + teamId, {clientRating}).toPromise();
  }

  async getAggregationLinkTypes(): Promise<any>{
    return this.http.get<any>(environment.globalEndPoint + UrlPathConstants.getAggregationLinksCategoryEndPoint).toPromise();
  }

  async deleteAggregationLink(aggregationLinkId:string):Promise<any>{
    return this.http.delete<any>(
      environment.globalEndPoint + UrlPathConstants.deleteAggregationLinkEndPoint + aggregationLinkId).toPromise();
  }

  async addAggregationLink(addAggregationLinkForm){
    return this.http.post(environment.globalEndPoint + UrlPathConstants.addAggregationLinkEndPoint, addAggregationLinkForm).toPromise();
  }

   capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}


