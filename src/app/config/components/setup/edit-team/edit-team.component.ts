import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ADCListDetails } from 'src/app/teams/model/team.model';
import { GeneralService } from 'src/app/shared/services/general.service';
import { TeamsResponse, UpdateTeam } from '../../../model/config.model';
import { SetupService } from '../../../services/setup.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { TeamDetailResponse } from 'src/app/shared/model/general.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-team',
  templateUrl: './edit-team.component.html',
  styleUrls: ['./edit-team.component.css'],
})
export class EditTeamComponent implements OnInit {
  isLogo: boolean;
  aws_asset: string;
  spinner: boolean;
  teamDetail : TeamDetailResponse = new TeamDetailResponse();
  team: TeamsResponse = new TeamsResponse();
  ADCList: ADCListDetails[] = [];
  updateTeam: UpdateTeam = new UpdateTeam();
  logo: string;
  
  newLogoPath : string;
  
  editLogoPath : string;
  form: FormGroup;
  constructor(
    public generalService: GeneralService,
    private setupService: SetupService,
    private notifyService : NotificationService,
    public fb: FormBuilder
  ) {
    this.isLogo = false;
   
  
    this.form = this.fb.group({
      teamName: [''],
      projectKey: [''],
      teamCode: ['']
    });
    this.spinner = false;
  }
/**
 * Get team details from local storage
 * 
 */
  ngOnInit(): void {
    this.aws_asset= environment.AWS_ASSETS_URL as string;
    this.team.teamId = JSON.parse(
      localStorage.getItem('TeamDetailsResponse')
    ).powerboardResponse.team_id;
    this.team.teamName = JSON.parse(
      localStorage.getItem('TeamDetailsResponse')
    ).powerboardResponse.team_name;
    this.team.teamCode = JSON.parse(
      localStorage.getItem('TeamDetailsResponse')
    ).powerboardResponse.team_code;
    this.team.projectKey = JSON.parse(
      localStorage.getItem('TeamDetailsResponse')
    ).powerboardResponse.project_key;
    this.team.adCenter = JSON.parse(
      localStorage.getItem('TeamDetailsResponse')
    ).powerboardResponse.center;
    this.logo = JSON.parse(
      localStorage.getItem('TeamDetailsResponse')
    ).powerboardResponse.logo;
    if (this.logo) {
      this.isLogo = true;
    
      this.editLogoPath =  this.logo;
    } else {
      this.isLogo = false;
    
    }
if(JSON.parse(
  localStorage.getItem('PowerboardDashboard')
).loginResponse.homeResponse){

  this.ADCList = JSON.parse(
    localStorage.getItem('PowerboardDashboard')
  ).loginResponse.homeResponse.ADC_List;
  console.log(this.ADCList);
}

    this.form.controls['teamName'].setValue(this.team.teamName);
    this.form.controls['teamCode'].setValue(this.team.teamCode);
    this.form.controls['projectKey'].setValue(this.team.projectKey);
  }
  public changeADCenter(centerName: string) {
    this.team.adCenter = centerName;
  }

/**
 * Delete logo using teamId
 * If logo deleted successfully, display success message
 * If error while deleting logo, display error message
 */
  async setDeleteLogo() {
    
    try{
    await this.setupService.deleteLogo(this.team.teamId);
    this.isLogo = false; 
    this.notifyService.showSuccess("", "Logo deleted successfully");
    }
    catch(e){
      console.log(e.error.message);
      this.notifyService.showError("", e.error.message);
    }
   
  }

  /**
   * Upload logo for a team
   * If logo uploaded successfully, update in list of teams and local storage, display success message
   * If error while uploading logo, display error message
   * 
   */
  async uploadFile(event){
    const file = (event.target as HTMLInputElement).files[0];
    try{
      this.spinner = true;
     const data = await this.setupService.addLogoToTeam(this.team.teamId, file);
     console.log(data);
     this.editLogoPath = data.logo; 
     this.spinner = false;
     this.isLogo = true;
     this.teamDetail = JSON.parse(localStorage.getItem('TeamDetailsResponse'));
     this.teamDetail.powerboardResponse.logo = data.logo;
     localStorage.setItem('TeamDetailsResponse', JSON.stringify(this.teamDetail));
     var image = <HTMLImageElement>document.getElementById('output');
     image.src = URL.createObjectURL(file); 
     this.notifyService.showSuccess("","Logo uploaded successfully");
    }catch(e){
      console.log(e);
      this.spinner = false;
      this.notifyService.showError("", e);
    }


  }

  /**
   * Update team using form group
   * If team updated successfully, display success message
   * If error while updating team, display error message
   * 
   */
  async submitForm() {
    this.updateTeam.teamId = this.team.teamId;
    this.updateTeam.teamName = this.form.get('teamName').value;
    this.updateTeam.projectKey = this.form.get('projectKey').value;
    this.updateTeam.teamCode = this.form.get('teamCode').value;

    try {
      
      const data = await this.setupService.updateTeam(this.updateTeam, this.team.teamId);
     this.notifyService.showSuccess("", "Team updated successfully");
    
      console.log(data);
    } catch (e) {
     
      console.log(e);
      this.notifyService.showError("", e);
    }
  }
}
