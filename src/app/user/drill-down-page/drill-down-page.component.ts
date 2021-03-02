import { Component,  OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';


@Component({
  selector: 'app-drill-down-page',
  templateUrl: './drill-down-page.component.html',
  styleUrls: ['./drill-down-page.component.css']
})
export class DrillDownPageComponent implements OnInit {


  constructor(public service: UserService) { }

  ngOnInit(): void {
    
    console.log("working fine");
  }

  zoomIn(id: number, name: string)
  {
    this.service.zoomIn(id,name);
  }

}
