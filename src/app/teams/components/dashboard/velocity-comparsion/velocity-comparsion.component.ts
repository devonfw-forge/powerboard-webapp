import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { SetupService } from 'src/app/config/services/setup.service';
import { VelocityResponse } from 'src/app/shared/model/general.model';
import { GeneralService } from 'src/app/shared/services/general.service';
import { UrlPathConstants } from 'src/app/UrlPaths';

@Component({
  selector: 'app-velocity-comparsion',
  templateUrl: './velocity-comparsion.component.html',
  styleUrls: ['./velocity-comparsion.component.css'],
})
export class VelocityComparsionComponent implements OnInit {
  velocity:VelocityResponse = new VelocityResponse();
  workUnit : string;
  checklocationPath: string;
  jiraLink: string;
  
  constructor(
    public router: Router,
    public location: Location,
    public setupSerive: SetupService,
    public generalService: GeneralService
  ){

  }
  ngOnInit(): void {
    this.velocity = JSON.parse(localStorage.getItem('TeamDetailsResponse')).powerboardResponse.dashboard.velocity;
    this.workUnit =  JSON.parse(localStorage.getItem('TeamDetailsResponse')).powerboardResponse.dashboard.sprintWorkUnit;
    let links = JSON.parse(localStorage.getItem('TeamDetailsResponse')).powerboardResponse.aggregationLinks;
    for(let link of links){
      let name : string  =  link.name;
      if(name.toLowerCase() == UrlPathConstants.jiraLinkCategoryTitle){
        this.jiraLink = link.url;
      }
    }
  }

  openJiraLink(jiraLink: string) {
    
      window.open(jiraLink, '_blank');
  }

  public moveToSetings() {
    this.checklocationPath = this.location.path();
    if (this.checklocationPath.includes('config')) {
      console.log('already in config');
    } else {
      this.setupSerive.goToConfigureLinks();
      this.setupSerive.deactiveAdminSetup();
      
      this.router.navigateByUrl('/config');
    }
  }

  openAddAggregationLinkModal(){
    this.setupSerive.showAddAggregationLinkModal();
    this.moveToSetings();
  }

}
