import { Component, OnInit } from '@angular/core';
import { BurndownResponse } from 'src/app/shared/model/general.model';

@Component({
  selector: 'app-burndown',
  templateUrl: './burndown.component.html',
  styleUrls: ['./burndown.component.css'],
})
export class BurndownComponent implements OnInit {
  burnDown: BurndownResponse = new BurndownResponse();
  unit: string;
  
  
  ngOnInit(): void {
    
    this.burnDown = JSON.parse(localStorage.getItem('TeamDetailsResponse')).powerboardResponse.dashboard.burndown; 
    this.checkWorkUnit();
  }

  checkWorkUnit(){
    if (this.burnDown.remainingWork > 1) {
      this.unit = this.burnDown.workUnit + 's';
    } else {
      this.unit = this.burnDown.workUnit;
    }
  }

}
