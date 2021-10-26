import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { VelocityResponse } from 'src/app/shared/model/general.model';

import TeamDetailsResponse from 'src/app/TeamDetailsResponse.json';
import { TeamSpiritComponent } from './team-spirit.component';


describe('TeamSpiritComponent', () => {
  let component: TeamSpiritComponent;
  let fixture: ComponentFixture<TeamSpiritComponent>;
 

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[RouterTestingModule, HttpClientModule],
      declarations: [ TeamSpiritComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    localStorage.setItem('TeamDetailsResponse', JSON.stringify(TeamDetailsResponse));
    fixture = TestBed.createComponent(TeamSpiritComponent);
    localStorage.setItem('TeamDetailsResponse', JSON.stringify(TeamDetailsResponse));
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
    let teamDetails = TeamDetailsResponse;
    teamDetails.powerboardResponse.dashboard.teamSpirit.teamSpiritRating = 3;
 localStorage.setItem('TeamDetailsResponse', JSON.stringify(teamDetails));
expect(component).toBeTruthy();

})

it('should check all conditions for higher team spirit rating', () =>{
 let teamDetails = TeamDetailsResponse;
 teamDetails.powerboardResponse.dashboard.teamSpirit.teamSpiritRating = 9;
localStorage.setItem('TeamDetailsResponse', JSON.stringify(teamDetails));
expect(component).toBeTruthy();

})
});