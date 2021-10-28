import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GeneralService } from 'src/app/shared/services/general.service';


@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css'],
})
export class ConfigComponent implements OnInit {
  teamName: string;

 
  constructor( private router : Router, public generalService : GeneralService, private route: ActivatedRoute) {   
  }

  ngOnInit(): void {
    this.checkNextRoute();
  }
  checkNextRoute(){
    if(this.generalService.IsShowNavBarIcons()){
      this.router.navigate(['setup'], {relativeTo:this.route});
    }else{
      this.router.navigate(['team'], {relativeTo:this.route});
    }
  }
}
