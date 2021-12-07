import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralService } from 'src/app/shared/services/general.service';

@Component({
  selector: 'app-view-team',
  templateUrl: './view-team.component.html',
  styleUrls: ['./view-team.component.css'],
})
export class ViewTeamComponent implements OnInit {


    constructor( public generalService : GeneralService, private router : Router) {
    }
 
   ngOnInit(): void {
 this.router.navigateByUrl('/config');
 }
 
}
