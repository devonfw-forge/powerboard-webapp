import { HttpClientModule } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ElectronService, NgxElectronModule } from 'ngx-electron';
import { NotificationService } from 'src/app/service/notification.service';
import teamDetailsResponse from 'src/app/teamDetailsResponse.json'
import { ConfigureTeamLinksComponent } from './configure-team-links.component';

describe('ConfigureTeamLinksComponent', () => {
  let component: ConfigureTeamLinksComponent;
  let fixture: ComponentFixture<ConfigureTeamLinksComponent>;
  let notificationService : NotificationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports :[RouterTestingModule, HttpClientModule, FormsModule, NgxElectronModule, ReactiveFormsModule],
      declarations: [ ConfigureTeamLinksComponent ],
      providers : [{provide : NotificationService, useValue : notificationService}, ElectronService, ChangeDetectorRef]
    })
    .compileComponents();
  });

  beforeEach(() => {
    localStorage.setItem('TeamDetailsResponse', JSON.stringify(teamDetailsResponse));
    fixture = TestBed.createComponent(ConfigureTeamLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
