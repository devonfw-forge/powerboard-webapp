import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserBreadCrumb } from 'src/app/shared/modals/user-breadcrumb.modal';
import { UserService } from 'src/app/shared/services/user.service';


@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {

  path: UserBreadCrumb[];
  count: number=0;

  constructor(public service: UserService, private route: Router) { }

  ngOnInit(): void {
 
 
  }

  drillingDown(id: number,name: string,i: number){
    this.count+=1;
    this.service.data.breadCrumb=this.service.data.breadCrumb.splice(0,id);
    if(this.count>1){
      this.service.zoomInFromOutside(id,name);
    }
    else{
      this.service.zoomInFromOutside(id,name);
    this.route.navigate(['user/1/drill-down']);
    }

  }

  home(id: number,name: string,i: number){
    this.count+=1;
    this.service.data.breadCrumb=this.service.data.breadCrumb.splice(0,id);
    if(this.count>1){
      this.service.zoomInFromHome(id,name);
    }
    else{
      this.service.zoomInFromHome(id,name);
    this.route.navigate(['user/1/drill-down']);
    }
  }

  myDashBoard(){
    this.count=0;
    this.service.data.breadCrumb= JSON.parse(sessionStorage.getItem('bu-data')).breadCrumb;
    this.route.navigate(['user/1/dashboard'])
  }

}
