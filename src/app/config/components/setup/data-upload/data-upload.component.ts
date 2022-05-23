import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SetupService } from 'src/app/config/services/setup.service';
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
    

    this.form = this.fb.group({
      clientRating: ['', [Validators.required]]
      
    });
  }

  ngOnInit(): void {
    this.teamId = JSON.parse(
      localStorage.getItem('TeamDetailsResponse')
    ).powerboardResponse.team_id;


    
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
    await this.setupService.uploadXLSXFile(
      file,
      type,
      this.teamId
    );
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
    await this.setupService.uploadJSONFile(
      file,
      type,
      this.teamId
    );
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

changeSelected(num: number) {
  this.selected = num;
}

async uploadClientRating() {
  try {
     await this.setupService.uploadClientRating(
      this.form.get('clientRating').value,
      "clientstatus",
      this.teamId
    );
    this.notifyService.showSuccess('', 'Client Rating updated successfully');
  } catch (e) {
    console.log(e.error.message);
    this.notifyService.showError('', e.error.message);
  }
}
}
