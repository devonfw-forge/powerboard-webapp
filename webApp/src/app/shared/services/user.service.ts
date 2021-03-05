import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BUInfo } from '../modals/bu-info.modal';
import { Dashboard } from '../modals/dashboard.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  data: any;
  buList: any;
  dumpBUData: BUInfo[];
  dashboard: Dashboard[]=[];
  private url= environment.url;
  private teamDetail_URL= environment.teamDetail_URL;
  private teamDashboard_URL= environment.teamDashboard_URL;
  count: number=0;

  constructor(private http: HttpClient) { }

  async zoomInFromOutside(id: number, name: string){
    this.buList=[];
    this.dumpBUData=JSON.parse(sessionStorage.getItem('bu-data')).dump_businessUnit;

    this.buList=this.dumpBUData.filter(d => d.parent_id == id && d.id != d.parent_id);
    if(this.buList.length===0){
      this.buList=await this.getTeamsName(id);
    }
    console.log(this.buList);

  }

  async zoomIn(id: number, name: string){
    this.buList=[];
    const bu: any = {};
    bu.bu_id=id;
    bu.bu_name=name;
    this.buList= this.dumpBUData.filter(d => d.parent_id === id && d.id != d.parent_id);
    let l= this.data.user_breadCrumb.length;
    this.data.user_breadCrumb[l]=bu;
    if(this.buList.length===0){
      this.buList=await this.getTeamsName(id);
    }
    console.log(this.buList);

  }

  zoomInFromHome(id: number,name: string){
    this.buList=[];
    this.dumpBUData=JSON.parse(sessionStorage.getItem('bu-data')).dump_businessUnit;

    this.buList=this.dumpBUData.filter(d => d.id === d.parent_id);
    if(this.buList.length===0){
      console.log("Call to rest api");
    }
    console.log(this.buList);
  }

  async otherProjectDashBoard(teamId: number, teamName: string){

    const bu: any = {};
    bu.bu_id=teamId;
    bu.bu_name=teamName;
    let l= this.data.user_breadCrumb.length;
    this.data.user_breadCrumb[l]=bu;
    await this.getTeamDashboard(teamId);
  }

  async getData(){
    let data= await this.http.get(this.url).toPromise();
    this.data=data;
    sessionStorage.setItem('bu-data', JSON.stringify(data));
  }

  async getTeamsName(bu_id: number)
  {
    return this.http.get(this.teamDetail_URL+'/'+bu_id).toPromise();
  }

  async getTeamDashboard(teamId: number){
    let data= await this.http.get(this.teamDashboard_URL+'/'+ teamId).toPromise();
    this.data.dashboard=data;
  }
}
