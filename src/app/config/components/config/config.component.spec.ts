import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { GeneralService } from 'src/app/shared/services/general.service';
import { SetupComponent } from '../setup/setup.component';
import { TeamComponent } from '../team/team.component';
import TeamDetailsResponseJSON from 'src/app/teamDetailsResponse.json';
import { ConfigComponent } from './config.component';
import { TeamDetailResponse } from 'src/app/shared/model/general.model';

describe('ConfigComponent', () => {
  let component: ConfigComponent;
  let fixture: ComponentFixture<ConfigComponent>;
  let generalService : GeneralService;
  let spy :any;
  /* let router = {
    navigate: jasmine.createSpy('navigate')
  } */
  let router: Router;
  const routes: Routes = [{
    path: '',
    component: ConfigComponent,
    children: [
      {
        path: 'team', component: TeamComponent,
      },
      {
        path: 'setup', component: SetupComponent,
      }
    ]
  },]
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports :[RouterTestingModule.withRoutes(routes), HttpClientTestingModule],
      declarations: [ ConfigComponent ],
      providers: [{provide : GeneralService, usevalue : generalService}]
    })
    .compileComponents();
  });

  beforeEach(() => {


    var store = {};
    spyOn(localStorage, 'getItem').and.callFake(function (key) {
      return store[key];
    });
    spyOn(localStorage, 'setItem').and.callFake(function (key, value) {
      return (store[key] = value + '');
    });
    spyOn(localStorage, 'clear').and.callFake(function () {
      store = {};
    });

    localStorage.setItem(
      'TeamDetailsResponse',
      JSON.stringify(TeamDetailsResponseJSON)
    );



    router = TestBed.inject(Router);
    generalService = TestBed.inject(GeneralService);
    fixture = TestBed.createComponent(ConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    spyOn(router,'navigate');
    spy = spyOn(generalService, 'IsShowNavBarIcons').and.returnValue(true);
    spyOn(component,'checkNextRoute').and.callFake(()=>{});
    expect(component).toBeTruthy();
  });

it('should navigate to team',() =>{
  spyOn(router,'navigate').and.returnValue(null);
  spy = spyOn(generalService, 'IsShowNavBarIcons').and.returnValue(false);
  component.checkNextRoute();
  expect(generalService.IsShowNavBarIcons).toHaveBeenCalled();
})

it('should navigate to setup',() =>{
  spyOn(router,'navigate').and.returnValue(null);
  spy = spyOn(generalService, 'IsShowNavBarIcons').and.returnValue(true);
  component.checkNextRoute();
  expect(generalService.IsShowNavBarIcons).toHaveBeenCalled();
})


it('should activate admin setup',() =>{
 let teamDetails : TeamDetailResponse = new TeamDetailResponse();
 teamDetails = JSON.parse(localStorage.getItem('TeamDetailsResponse'));
 teamDetails.powerboardResponse.isTeamConfigured = true;
 localStorage.setItem(
  'TeamDetailsResponse',
  JSON.stringify(teamDetails)
);
  component.toggleAdminSetup();
  expect(localStorage.getItem).toHaveBeenCalled();
})

it('should deactivate admin setup',() =>{
  let teamDetails : TeamDetailResponse = new TeamDetailResponse();
  teamDetails = JSON.parse(localStorage.getItem('TeamDetailsResponse'));
  teamDetails.powerboardResponse.isTeamConfigured = false;
  localStorage.setItem(
   'TeamDetailsResponse',
   JSON.stringify(teamDetails)
 );
   component.toggleAdminSetup();
   expect(localStorage.getItem).toHaveBeenCalled();
 })
});
