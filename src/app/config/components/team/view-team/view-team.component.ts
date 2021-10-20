import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ADCListDetails } from 'src/app/teams/model/team.model';
import { GeneralService } from 'src/app/shared/services/general.service';
import { TeamInfo, TeamsResponse, UpdateTeam } from '../../../model/config.model';
import { ConfigService } from '../../../services/config.service';

@Component({
  selector: 'app-view-team',
  templateUrl: './view-team.component.html',
  styleUrls: ['./view-team.component.css'],
})
export class ViewTeamComponent implements OnInit {
  /* team : TeamsResponse = new TeamsResponse();
ADCList: ADCListDetails[] = [];
updateTeam: UpdateTeam = new UpdateTeam();
isEdit: boolean; */

  constructor(
    private configService: ConfigService,
    public generalService: GeneralService,
    private router: Router
  ) {
    /* this.isEdit = false; */
  }

  ngOnInit(): void {
    /*   this.team = JSON.parse(localStorage.getItem('currentTeam')); */
    this.router.navigateByUrl('/setting');
    /*   this.ADCList = JSON.parse(localStorage.getItem('PowerboardDashboard')).loginResponse.ADC_List;
console.log(this.ADCList);
  }
public changeADCenter(centerName: string){
this.team.adCenter = centerName; */
  }

  /* async updateTeamInfo(){
  this.updateTeam.teamId = this.team.teamId;
  this.updateTeam.teamCode = this.team.teamCode;
  this.updateTeam.projectKey = this.team.projectKey; */
  /* for(let list of this.ADCList){
    if(this.team.adCenter == list.centerName){
      this.updateTeam.ad_center.id = list.centerId;
    }
  } */

  /* try{
    console.log(this.updateTeam);
    const data = await this.configService.updateTeam(this.updateTeam);
    console.log(data);
    this.isEdit = false; 
  }
  catch(e){
    console.log(e);
    
  }
}

public showEdit(){
this.isEdit = true;
}

public closeEdit(){
this.isEdit =false;
} */
}
