import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ADCListDetails } from 'src/app/teams/model/team.model';
import { GeneralService } from 'src/app/shared/services/general.service';
import { TeamsResponse, UpdateTeam } from '../../../model/config.model';
import { ConfigService } from '../../../services/config.service';
import { SetupService } from '../../../services/setup.service';

@Component({
  selector: 'app-edit-team',
  templateUrl: './edit-team.component.html',
  styleUrls: ['./edit-team.component.css'],
})
export class EditTeamComponent implements OnInit {
  isLogo: boolean;
  spinner: boolean;
  team: TeamsResponse = new TeamsResponse();
  ADCList: ADCListDetails[] = [];
  updateTeam: UpdateTeam = new UpdateTeam();
  logo: string;
  form: FormGroup;
  constructor(
    public generalService: GeneralService,
    private setupService: SetupService,
    public fb: FormBuilder
  ) {
    this.isLogo = false;

    this.form = this.fb.group({
      teamName: [''],
      projectKey: [''],
      teamCode: [''],
    });
    this.spinner = false;
  }

  ngOnInit(): void {
    this.team.teamId = JSON.parse(
      localStorage.getItem('TeamDetailsResponse')
    ).powerboardResponse.team_id;
    this.team.teamName = JSON.parse(
      localStorage.getItem('TeamDetailsResponse')
    ).powerboardResponse.team_name;
    this.team.teamCode = JSON.parse(
      localStorage.getItem('TeamDetailsResponse')
    ).powerboardResponse.team_code;
    this.team.projectKey = 'P1123';
    this.team.adCenter = JSON.parse(
      localStorage.getItem('TeamDetailsResponse')
    ).powerboardResponse.center;
    this.logo = JSON.parse(
      localStorage.getItem('TeamDetailsResponse')
    ).powerboardResponse.logo;
    if (this.logo) {
      this.isLogo = true;
    } else {
      this.isLogo = false;
    }

    this.ADCList = JSON.parse(
      localStorage.getItem('PowerboardDashboard')
    ).loginResponse.ADC_List;
    console.log(this.ADCList);

    this.form.controls['teamName'].setValue(this.team.teamName);
    this.form.controls['teamCode'].setValue(this.team.teamCode);
    this.form.controls['projectKey'].setValue(this.team.projectKey);
  }
  public changeADCenter(centerName: string) {
    this.team.adCenter = centerName;
  }

  async setDeleteLogo() {
    try {
      await this.setupService.deleteLogo(this.team.teamId);
      this.isLogo = false;
    } catch (e) {
      console.log(e.error.message);
    }
  }

  async uploadFile(event) {
    const file = (event.target as HTMLInputElement).files[0];
    try {
      this.spinner = true;
      const data = await this.setupService.addLogoToTeam(
        this.team.teamId,
        file
      );
      this.spinner = false;
      /* var image = <HTMLImageElement>document.getElementById('output');
     image.src = URL.createObjectURL(file); */
    } catch (e) {
      console.log(e);
      this.spinner = false;
    }
  }

  async submitForm() {
    var formData: any = new FormData();
    formData.append('teamName', this.form.get('teamName').value);
    formData.append('projectKey', this.form.get('projectKey').value);
    formData.append('teamId', this.team.teamId);
    formData.append('teamCode', this.form.get('teamCode').value);
    this.updateTeam.teamId = this.team.teamId;
    this.updateTeam.teamName = this.form.get('teamName').value;
    this.updateTeam.projectKey = this.form.get('projectKey').value;
    this.updateTeam.teamCode = this.form.get('teamCode').value;

    try {
      const data = await this.setupService.updateTeam(this.updateTeam);

      console.log(data);
    } catch (e) {
      console.log(e);
    }
  }
}
