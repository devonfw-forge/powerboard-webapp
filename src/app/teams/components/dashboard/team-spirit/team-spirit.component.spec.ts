import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { VelocityResponse } from 'src/app/shared/model/general.model';
import { TeamSpiritComponent } from './team-spirit.component';


describe('TeamSpiritComponent', () => {
  let component: TeamSpiritComponent;
  let fixture: ComponentFixture<TeamSpiritComponent>;
  let teamDetailsResponse : any = 
  {
    powerboardResponse: {
        dashboard: {
            clientStatus: {
                clientSatisfactionRating: 5,
                sprintNumber: 10
            },
            teamSpirit: {
                teamSpiritRating: 5
            }
        }
    }
   
}

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[RouterTestingModule, HttpClientModule],
      declarations: [ TeamSpiritComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {

    var store = {};

    spyOn(localStorage, 'getItem').and.callFake(function (key) {
      return store[key];
    });
    spyOn(localStorage, 'setItem').and.callFake(function (key, value) {
      return store[key] = value + '';
    });
    spyOn(localStorage, 'clear').and.callFake(function () {
        store = {};
    });
  
    localStorage.setItem('TeamDetailsResponse', JSON.stringify(teamDetailsResponse));
    fixture = TestBed.createComponent(TeamSpiritComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /* it('should have precise data',inject([HttpClient], async (http:HttpClient) => {
    let teamSpirit : TeamSpiritResponse = {
      "teamSpiritRating": 7,
      "sprintNumber": 10
  }
    
   let data :any = JSON.parse(localStorage.getItem('TeamDetailsResponse')).powerboardResponse.dashboard.teamSpirit;
   component.teamSpirit= data;
   
    fixture.detectChanges();
 expect(component.teamSpirit).toEqual(teamSpirit);
   })); 
 */

   it('should check all conditions for lower team spirit rating', () =>{
    let teamDetails = teamDetailsResponse;
    teamDetails.powerboardResponse.dashboard.teamSpirit.teamSpiritRating = 3;
 localStorage.setItem('TeamDetailsResponse', JSON.stringify(teamDetails));
expect(component).toBeTruthy();

})

it('should check all conditions for mid value of team spirit rating', () =>{
  let teamDetails = teamDetailsResponse;
  teamDetails.powerboardResponse.dashboard.teamSpirit.teamSpiritRating = 5;
localStorage.setItem('TeamDetailsResponse', JSON.stringify(teamDetails));
expect(component).toBeTruthy();

})

it('should check all conditions for higher team spirit rating', () =>{
 let teamDetails = teamDetailsResponse;
 teamDetails.powerboardResponse.dashboard.teamSpirit.teamSpiritRating = 9;
localStorage.setItem('TeamDetailsResponse', JSON.stringify(teamDetails));
expect(component).toBeTruthy();

})
});