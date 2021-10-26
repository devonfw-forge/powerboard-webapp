import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import checkData from 'src/app/checkData.json'; 
import TeamDetailsResponse from 'src/app/teamDetailsResponse.json';
import { SetupService } from 'src/app/config/services/setup.service';
import { GeneralService } from 'src/app/shared/services/general.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { EditTeamComponent } from './edit-team.component';
import { nullSafeIsEquivalent } from '@angular/compiler/src/output/output_ast';
import { TeamsResponse } from 'src/app/config/model/config.model';

describe('EditTeamComponent', () => {
  let component: EditTeamComponent;
  let fixture: ComponentFixture<EditTeamComponent>;
  let generalService : GeneralService;
  let setupService : SetupService;
  let notificationService : NotificationService;
  

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[RouterTestingModule, HttpClientTestingModule, ReactiveFormsModule],
      declarations: [ EditTeamComponent ],
      providers: [{provide  : GeneralService, useValue : generalService}, {provide  : SetupService, useValue : setupService}, {provide  : NotificationService, useValue : notificationService}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    localStorage.setItem('PowerboardDashboard', JSON.stringify(checkData));
    localStorage.setItem('TeamDetailsResponse', JSON.stringify(TeamDetailsResponse));
    fixture = TestBed.createComponent(EditTeamComponent);
    component = fixture.componentInstance;
    generalService = TestBed.inject(GeneralService);
    setupService = TestBed.inject(SetupService);
    notificationService = TestBed.inject(NotificationService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change ad center', () =>{
    component.changeADCenter("SampleCenter");
    expect(component.team.adCenter).toEqual("SampleCenter");
  })

  it('should delete logo', () =>{
    let teamDetails : TeamsResponse = {
      teamId: null,
      teamName: null,
      teamCode: null,
      projectKey : null,
      adCenter: null
    }
    component.team = teamDetails;
    component.setDeleteLogo().catch(e =>{
      expect(e).toBeTruthy();
    })
  })


  it('should update team details', () =>{
    component.form.controls['teamName'].setValue(null);
    component.form.controls['teamCode'].setValue(null);
    component.form.controls['projectKey'].setValue(null);

  let teamDetails : TeamsResponse = {
    teamId: null,
    teamName: null,
    teamCode: null,
    projectKey : null,
    adCenter: null
  }

  component.team = teamDetails;
  component.submitForm().catch(e =>{
    expect(e).toBeTruthy();
  })
})

});
