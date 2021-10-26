import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BurndownResponse } from 'src/app/shared/model/general.model';
import TeamDetailsResponse from 'src/app/TeamDetailsResponse.json'
import { BurndownComponent } from './burndown.component';

describe('BurndownComponent', () => {
  let component: BurndownComponent;
  let fixture: ComponentFixture<BurndownComponent>;
 
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[RouterTestingModule, HttpClientModule],
      declarations: [ BurndownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BurndownComponent);
    localStorage.setItem('TeamDetailsResponse', JSON.stringify(TeamDetailsResponse));
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  /*  it('should have precise data',inject([HttpClient], async (http:HttpClient) => {
    let burndown : BurndownResponse = {
      "workUnit": "story point",
      "remainingDays": 3,
      "remainingWork": 122,
      "count": 107,
      "burndownStatus": "Behind Time"
  };
    
   let data :any = JSON.parse(localStorage.getItem('TeamDetailsResponse')).powerboardResponse.dashboard.burndown; 
   component.burnDown = data;
   
    fixture.detectChanges();
 expect(component.burnDown).toEqual(burndown);
   }));  
 */

});
