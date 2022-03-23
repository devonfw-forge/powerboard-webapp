import { Component, OnInit } from '@angular/core';
import { SetupService } from 'src/app/config/services/setup.service';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-data-upload',
  templateUrl: './data-upload.component.html',
  styleUrls: ['./data-upload.component.css'],
})
export class DataUploadComponent implements OnInit {
  selected: number;

  teamId: string;

  constructor(public setupService: SetupService,  private notifyService: NotificationService,) {}

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
    try {
      const file = (event.target as HTMLInputElement).files[0];
      const data = await this.setupService.uploadXLSXFile(
        file,
        type,
        this.teamId
      );
      this.notifyService.showSuccess('', 'File uploaded successfully');
    } catch (e) {
      console.log(e.error.message);
      this.notifyService.showError('', e.error.message);
    }
  }

  changeSelected(num: number) {
    this.selected = num;
  }
}
