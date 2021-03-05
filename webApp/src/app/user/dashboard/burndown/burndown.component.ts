import { Component, OnInit } from '@angular/core';
import { BurnDown } from 'src/app/shared/modals/burnDown.modal';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-burndown',
  templateUrl: './burndown.component.html',
  styleUrls: ['./burndown.component.css']
})
export class BurndownComponent implements OnInit {

  // burnDown: any = { "status": "Ahead Time",
  // "remainingDays": 5, "remainingWork": 18 , "count": 4 };
  constructor(private service: UserService) { }
  burnDown: BurnDown;
  ngOnInit(): void {
    this.burnDown=this.service.data.dashboard.burndownDTO;
  }

}
