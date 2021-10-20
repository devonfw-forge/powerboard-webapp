import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { ConfigureTeamSpirit } from '../../../model/config.model';
import { ConfigService } from '../../../services/config.service';
import { SetupService } from '../../../services/setup.service';

@Component({
  selector: 'app-configure-team-spirit',
  templateUrl: './configure-team-spirit.component.html',
  styleUrls: ['./configure-team-spirit.component.css'],
})
export class ConfigureTeamSpiritComponent implements OnInit {
  private authError: boolean;
  form: FormGroup;
  teamName: string;
  sendStatus = 0;
  teamSpiritDetails: ConfigureTeamSpirit = new ConfigureTeamSpirit();
  constructor(
    private configService: ConfigService,
    private notifyService: NotificationService,
    private setupService: SetupService
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      teammembers: new FormControl(),
      sprintlength: new FormControl(),
      startdate: new FormControl(),
    });
    this.teamName = JSON.parse(
      localStorage.getItem('TeamDetailsResponse')
    ).powerboardResponse.team_name;
  }

  async sendTeamSpriritConfig(configTeamSpirit: NgForm) {
    this.teamSpiritDetails.Name = this.teamName;
    this.teamSpiritDetails.Num_mumbers = this.form.value.teammembers;
    this.teamSpiritDetails.Frequency = this.form.value.sprintlength;
    this.teamSpiritDetails.StartDate = this.form.value.startdate;

    try {
      const data = await this.setupService.sendDetailsTeamSpirit(
        this.teamSpiritDetails
      );
      this.notifyService.showSuccess(
        'Data sent to team spirit successfully !!',
        ''
      );
      configTeamSpirit.reset();
      console.log(data);
      this.sendStatus = 1;
      this.form.reset();
    } catch (e) {
      this.sendStatus = 2;
      console.log(e.error.message);
      this.notifyService.showError('', e.error.message);
    }
  }

  keyPressed() {
    this.authError = false;
  }

  getAuthError() {
    return this.authError;
  }
}
