import { Component,  OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';


@Component({
  selector: 'app-drill-down-page',
  templateUrl: './drill-down-page.component.html',
  styleUrls: ['./drill-down-page.component.css']
})
export class DrillDownPageComponent implements OnInit {


  constructor(public service: UserService, private route: Router) { }

  ngOnInit(): void {
    
    console.log("working fine");
  }

  async zoomIn(id: number, name: string)
  {
    await this.service.zoomIn(id,name);
  }

  async moveToDashboard(teamId: number,teamName: string){
    await this.service.otherProjectDashBoard(teamId, teamName);
    this.route.navigate(['user/1/dashboard']);
    console.log(this.service.data.user_breadCrumb);
    // this.service.count=0;
  }

}
