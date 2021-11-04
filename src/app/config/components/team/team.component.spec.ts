import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ConfigComponent } from '../config/config.component';

import { TeamComponent } from './team.component';
import { ViewAllTeamsComponent } from './view-all-teams/view-all-teams.component';

describe('TeamComponent', () => {
  let component: TeamComponent;
  let fixture: ComponentFixture<TeamComponent>;
  let router : Router;


  const routes: Routes = [{
    path: '',
    component: ConfigComponent,
    children: [
      {
        path: 'team', component: TeamComponent,
        children: [
          { path: '', redirectTo: 'viewAllTeams', pathMatch: 'full' },
          { path: 'viewAllTeams', component: ViewAllTeamsComponent },
        ]
      }
    ]
  },]

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports :[RouterTestingModule.withRoutes(routes), HttpClientTestingModule],
      declarations: [ TeamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    spyOn(component,'checkRoute').and.callFake(()=>{});
    expect(component).toBeTruthy();
  });

  it('should check route',()=>{
    router = TestBed.inject(Router);
    spyOn(router,'navigate').and.returnValue(null);
    component.checkRoute();
    expect(component).toBeTruthy();
  })
});
