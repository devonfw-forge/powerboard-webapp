import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BUInfo } from '../modals/bu-info.modal';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  data: any;
  buList: BUInfo[]=[];
  dumpBUData: BUInfo[];

  constructor(private http: HttpClient) { }

  zoomInFromOutside(id: number, name: string){
    this.buList=[];
    this.dumpBUData=JSON.parse(sessionStorage.getItem('bu-data')).businessUnit;

    this.buList=this.dumpBUData.filter(d => d.parent_id == id && d.id != d.parent_id);
    if(this.buList.length===0){
      console.log("Call to rest api");
    }
    console.log(this.buList);

  }

  zoomIn(id: number, name: string){
    this.buList=[];
    const bu: any = {};
    bu.bu_id=id;
    bu.bu_name=name;
    this.buList= this.dumpBUData.filter(d => d.parent_id === id && d.id != d.parent_id);
    let l= this.data.breadCrumb.length;
    this.data.breadCrumb[l]=bu;
    if(this.buList.length===0){
      console.log("Call to rest api");
    }
    console.log(this.buList);

  }

  zoomInFromHome(id: number,name: string){
    this.buList=[];
    this.dumpBUData=JSON.parse(sessionStorage.getItem('bu-data')).businessUnit;

    this.buList=this.dumpBUData.filter(d => d.id === d.parent_id);
    if(this.buList.length===0){
      console.log("Call to rest api");
    }
    console.log(this.buList);
  }

  async getData(){
    let data= await this.http.get('assets/data.json').toPromise();
    this.data=data;
    sessionStorage.setItem('bu-data', JSON.stringify(data));
  }
}
