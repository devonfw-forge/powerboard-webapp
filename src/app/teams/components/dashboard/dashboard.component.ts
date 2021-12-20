import { Component, OnInit } from '@angular/core';
import { UrlPathConstants } from 'src/app/UrlPaths';
import { Dashboard, SprintDetailResponse } from '../../../shared/model/general.model';
import { SlideshowService } from '../../services/slideshow.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  sprintDetails: SprintDetailResponse = new SprintDetailResponse();
  teamStatus: number;
  intervalID: any; 
  interval= UrlPathConstants.slideshowInterval;
  constructor(public slideshowService: SlideshowService) { }
  noData : boolean = false;
  dashboard : Dashboard = new Dashboard();
  ngOnInit(): void {
    this.dashboard = JSON.parse(localStorage.getItem('TeamDetailsResponse')).powerboardResponse.dashboard;
    this.sprintDetails = this.dashboard.sprintDetail;
    this.teamStatus = this.dashboard.teamStatus;
    if(this.dashboard.burndown || this.dashboard.codeQuality || this.dashboard.clientStatus || this.dashboard.velocity || this.dashboard.teamSpirit){
      this.noData = false;
    }
    else{
      this.noData = true;
    }
  }
  ngAfterViewInit(){
    if(this.slideshowService.getSlideShow()){
      this.intervalID = setTimeout(()=>{
         if(this.slideshowService.getSlideShow()){
           this.slideshowService.moveSlideshowNextComponent();
         }
       },this.interval);
     }
     else{
       console.log(" slideshow is not running");
     }
  }
  ngOnDestroy() {
    if (this.intervalID) {
      window.clearInterval(this.intervalID);
    }
    else{
      console.log("no interval ID")
    }
  }
  
}
