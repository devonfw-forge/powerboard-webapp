import { Component, OnInit } from '@angular/core';
import { timeStamp } from 'console';
import { environment } from 'src/environments/environment';
import { SprintDetailResponse } from '../../../shared/model/general.model';
import { GeneralService } from '../../../shared/services/general.service';
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
  interval= environment.slideshowInterval;
  constructor(public slideshowService: SlideshowService) { }

  ngOnInit(): void {
    this.sprintDetails = JSON.parse(localStorage.getItem('TeamDetailsResponse')).powerboardResponse.dashboard.sprintDetail;
    this.teamStatus = JSON.parse(localStorage.getItem('TeamDetailsResponse')).powerboardResponse.dashboard.teamStatus;
 
  }
  ngAfterViewInit(){
    this.afterViewCode();
  }
  afterViewCode(){
    if(this.slideshowService.isSlideshowRunning){
      this.intervalID = setTimeout(()=>{
         if(this.slideshowService.isSlideshowRunning){
           this.slideshowService.moveSlideshowNextComponent();
         }
       },this.interval);
     }
  }
  ngOnDestroy() {
    if (this.intervalID) {
      clearInterval(this.intervalID);
    }
  }
  
}
