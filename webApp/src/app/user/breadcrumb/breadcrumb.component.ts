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
  //count: number=0;

  constructor(public service: UserService, private route: Router) { }

  ngOnInit(): void {
 
 
  }

  drillingDown(id: number,name: string,i: number){
    console.log(id);
    this.service.count=1;
    this.service.data.user_breadCrumb=this.service.data.user_breadCrumb.splice(0,i+1);
    //console.log(this.service.data.user_breadCrumb.splice(0,id));
      this.service.zoomInFromOutside(id,name);
    this.route.navigate(['user/1/drill-down']);
    

  }

  home(id: number,name: string,i: number){
   
    console.log(id);
    this.service.count=1;
    this.service.data.user_breadCrumb=this.service.data.user_breadCrumb.splice(0,id);
    //console.log(this.service.data.user_breadCrumb.splice(0,id));
    this.service.zoomInFromHome(id,name);
    this.route.navigate(['user/1/drill-down']);
  }

  // myDashBoard(){
  //   this.service.count=0;
  //   this.service.data.user_breadCrumb= JSON.parse(sessionStorage.getItem('bu-data')).user_breadCrumb;
  //   this.service.data.dashboard=JSON.parse(sessionStorage.getItem('bu-data')).dashboard;
  //   this.route.navigate(['user/1/dashboard'])
  // }

}
