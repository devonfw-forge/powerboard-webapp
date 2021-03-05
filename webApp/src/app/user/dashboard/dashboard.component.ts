import { Component, OnInit } from '@angular/core';
import { Data } from 'src/app/shared/modals/data.modal';

import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private service: UserService) { }
  data: Data;
  ngOnInit(): void {
    // console.log(this.service.getData());
 
    // this.service.count=0;
  }

}
