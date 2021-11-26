import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NotificationService } from 'src/app/shared/services/notification.service';

import { ViewTeamComponent } from './view-team.component';

describe('ViewTeamComponent', () => {
  let component: ViewTeamComponent;
  let fixture: ComponentFixture<ViewTeamComponent>;
  //let notificationService : NotificationService;

  class MockNotificationService{

  }

  class MockRouter{
    navigateByUrl(url:string){
    console.log(url);
    }
  }
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports :[RouterTestingModule, HttpClientModule],
      
      declarations: [ ViewTeamComponent ],
      providers : [
        {provide : NotificationService, useClass:MockNotificationService},
        {provide :Router, useClass:MockRouter},
      ]

    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
