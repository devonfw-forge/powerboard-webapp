import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SetupService } from 'src/app/config/services/setup.service';
import { TeamDetailResponse } from 'src/app/shared/model/general.model';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-data-upload',
  templateUrl: './data-upload.component.html',
  styleUrls: ['./data-upload.component.css'],
})
export class DataUploadComponent implements OnInit {
  selected: number;
  form: FormGroup;
  teamId: string;
  spinner: boolean;
  errors:string[]= [];

  constructor(public setupService: SetupService,  private notifyService: NotificationService, public fb: FormBuilder) {
   const maxNumber = 10;
   const minNumber = 1;

    this.form = this.fb.group({
      clientRating: ['', [Validators.required, Validators.min(minNumber), Validators.max(maxNumber)]]
      
    });
  }

  ngOnInit(): void {
    this.teamId = JSON.parse(
      localStorage.getItem('TeamDetailsResponse')
    ).powerboardResponse.team_id;
    this.selected =1;
  }


  
/**
 * upload xlsx file
 * show success message if uploaded successfully
 * else show error message
 */
async uploadFile(event, type:string) {
  this.errors = [];
  const file = (event.target as HTMLInputElement).files[0];
  try {
    this.spinner = true;
   const data = await this.setupService.uploadXLSXFile(
      file,
      type,
      this.teamId
    );
    console.log(data);
    if(data){
      this.updateDashboard(data);
    }
    this.notifyService.showSuccess('', 'File uploaded successfully');
  } catch (e) {
    console.log(e.error.message);
    this.errors = e.error.message.split(",");
    this.notifyService.showError('', 'File not uploaded'); 
  }
  finally{
    this.spinner = false;
    event.target.value= null;
  }
}

async uploadJSONFile(event, type:string) {
  this.errors = [];
  const file = (event.target as HTMLInputElement).files[0];
  try {
    this.spinner = true;
    const data = await this.setupService.uploadJSONFile(
      file,
      type,
      this.teamId
    );
    console.log(data);
    if(data){
      this.updateDashboard(data);
    }
    this.notifyService.showSuccess('', 'File uploaded successfully');
  } catch (e) {
    console.log(e.error.message);
    this.errors = e.error.message.split(",");
    this.notifyService.showError('', 'File not uploaded'); 
  }
  finally{
    this.spinner = false;
    event.target.value= null;
  }
}

  async changeSelected(num: number) {
  this.selected = num;
  this.errors = [];
  if(num == 3){
    await this.canUploadClientRating();
  }
}


async canUploadClientRating() {
  try {
    const data  =
     await this.setupService.canUploadClientRating(this.teamId);
    console.log(data);
     } catch (e) {
    console.log(e.error.message);
    this.notifyService.showError('', e.error.message);
  }
}


async uploadClientRating() {
  try {
    const data  =
     await this.setupService.uploadClientRating(
      this.form.get('clientRating').value,
      "clientstatus",
      this.teamId
    );
   
    console.log(data);
    if(data){
      this.updateDashboard(data);
    }
    
    this.notifyService.showSuccess('', 'Client satisfaction rating updated successfully');
    
  } catch (e) {
    console.log(e.error.message);
    this.notifyService.showError('', e.error.message);
  }
}

updateDashboard(dashboard){
  let teamDetails : TeamDetailResponse = new TeamDetailResponse();
 teamDetails = JSON.parse(localStorage.getItem('TeamDetailsResponse'));
 console.log(dashboard);
 teamDetails.powerboardResponse.dashboard = dashboard;
 localStorage.setItem('TeamDetailsResponse', JSON.stringify(teamDetails));
}
}
