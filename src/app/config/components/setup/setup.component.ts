import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SetupService } from '../../services/setup.service';
import { environment } from '../../../../environments/environment';
@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.css'],
})
export class SetupComponent implements OnInit {
  aws_asset: string;
  constructor(private route:ActivatedRoute,private router:Router,public setupService:SetupService) { }
                
  ngOnInit(): void {
    this.aws_asset = environment.AWS_ASSETS_URL as string;
    console.log("reached setup .................................");
    this.router.navigate(['editTeam'], {relativeTo:this.route});
  }
  
  public showTeamLink(){
    this.router.navigate(['configure-links'], {relativeTo:this.route});
  }

  public showMultimedia(){
    
    this.router.navigate(['configure-multimedia'], {relativeTo:this.route});
  }

  public showViewTeamMember(){
    this.router.navigate(['view-members'], {relativeTo:this.route});
  }

  public showDataUpload(){
    this.router.navigate(['upload-data'], {relativeTo:this.route});
  }

  public changeActive(index:number){
    let list = document.querySelectorAll('.list');
    let j=0;
    while(j<list.length){
      list[j++].className = 'list';
    }
    list[index-1].className = 'list active';
  }

  public showEditTeam(){
    this.router.navigate(['editTeam'], {relativeTo:this.route});
  }

}
