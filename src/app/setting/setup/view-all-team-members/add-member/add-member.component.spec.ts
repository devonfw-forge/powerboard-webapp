import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { GeneralService } from 'src/app/service/general.service';
import { NotificationService } from 'src/app/service/notification.service';
import { SettingService } from 'src/app/setting/service/setting.service';
import { TeamService } from 'src/app/setting/team/service/team.service';
import teamDetailsResponse from 'src/app/teamDetailsResponse.json'; 

import { AddMemberComponent } from './add-member.component';

describe('AddMemberComponent', () => {
  let component: AddMemberComponent;
  let settingService : SettingService;
  let fixture: ComponentFixture<AddMemberComponent>;
  let notificationService : NotificationService;
  let generalService : GeneralService;
  let teamService : TeamService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports :[RouterTestingModule, HttpClientModule, FormsModule, ReactiveFormsModule],
      declarations: [ AddMemberComponent ],
      providers:[{provide : SettingService, useValue : settingService}, {provide : NotificationService, useValue : notificationService},{provide : GeneralService, useValue : generalService}, {provide : TeamService, useValue : teamService}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    localStorage.setItem('TeamDetailsResponse', JSON.stringify(teamDetailsResponse));
    settingService = TestBed.inject(SettingService);
    notificationService = TestBed.inject(NotificationService);
    generalService = TestBed.inject(GeneralService);
    teamService = TestBed.inject(TeamService);
    fixture = TestBed.createComponent(AddMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
