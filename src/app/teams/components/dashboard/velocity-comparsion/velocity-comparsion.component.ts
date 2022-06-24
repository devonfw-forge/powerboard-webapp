import { Component, OnInit } from '@angular/core';
import { VelocityResponse } from 'src/app/shared/model/general.model';

@Component({
  selector: 'app-velocity-comparsion',
  templateUrl: './velocity-comparsion.component.html',
  styleUrls: ['./velocity-comparsion.component.css'],
})
export class VelocityComparsionComponent implements OnInit {
  velocity:VelocityResponse = new VelocityResponse();
  workUnit : string;
  jiraLink : string;
  
  ngOnInit(): void {
    this.velocity = JSON.parse(localStorage.getItem('TeamDetailsResponse')).powerboardResponse.dashboard.velocity;
    this.workUnit =  JSON.parse(localStorage.getItem('TeamDetailsResponse')).powerboardResponse.dashboard.sprintWorkUnit;
    this.jiraLink = "https://e-3d-jira2.capgemini.com/jira2/secure/RapidBoard.jspa?rapidView=15074&projectKey=P002659&view=detail&selectedIssue=P002659-1171";
  }

  openJiraLink(jiraLink: string) {
    
      window.open(jiraLink, '_blank');
  }

}
