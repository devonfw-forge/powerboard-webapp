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
  errorMsg:string = "";
  spinner: boolean;

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
  const file = (event.target as HTMLInputElement).files[0];
  try {
    this.errorMsg="";
    this.spinner = true;
    const data = await this.setupService.uploadXLSXFile(
      file,
      type,
      this.teamId
    );
    this.spinner = false;
    event.target.value= null;
    this.notifyService.showSuccess('', 'File uploaded successfully');
  } catch (e) {
    this.spinner = false;
    event.target.value= null;
    console.log(e.error.message);
    this.errorMsg=e.error.message;
    let errors = e.error.message.split(",");
    for(let error of errors){
      this.notifyService.showError('', error);
    }  
  }
}

changeSelected(num: number) {
  this.selected = num;
}

async uploadClientRating() {
  try {
    const data = await this.setupService.uploadClientRating(
      this.form.get('clientRating').value,
      "clientstatus",
      this.teamId
    );
    this.notifyService.showSuccess('', 'Client Rating updated successfully');
  } catch (e) {
    console.log(e.error.message);
    console.log(e);
    this.notifyService.showError('', e.error.message);
  }
}
}
