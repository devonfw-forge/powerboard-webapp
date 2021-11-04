import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ClientStatusResponse } from 'src/app/shared/model/general.model';
import { ClientSatisfactionComponent } from './client-satisfaction.component';

describe('ClientSatisfactionComponent', () => {
  let component: ClientSatisfactionComponent;
  let fixture: ComponentFixture<ClientSatisfactionComponent>;
  let teamDetailsResponse : any = 
  {
    powerboardResponse: {
        dashboard: {
            clientStatus: {
                clientSatisfactionRating: 5,
                sprintNumber: 10
            },
            teamSpirit: {
                teamSpiritRating: 8
            }
        }
    }
   
}
  

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[RouterTestingModule, HttpClientModule],
      declarations: [ ClientSatisfactionComponent ]
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
    fixture = TestBed.createComponent(ClientSatisfactionComponent);
   
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /* it('should have precise data',inject([HttpClient], async (http:HttpClient) => {
    let clientStatus : ClientStatusResponse = {
      "clientSatisfactionRating": 5,
      "sprintNumber": 10
  };
    
   let data :any = JSON.parse(localStorage.getItem('TeamDetailsResponse')).powerboardResponse.dashboard.clientStatus;
   component.clientStatus = data;
   
    fixture.detectChanges();
 expect(component.clientStatus).toEqual(clientStatus);
   }));  */

   it('should check all conditions for lower client satisfaction rating', () =>{
       let teamDetails = teamDetailsResponse;
       teamDetails.powerboardResponse.dashboard.clientStatus.clientSatisfactionRating = 3;
    localStorage.setItem('TeamDetailsResponse', JSON.stringify(teamDetails));
   expect(component).toBeTruthy();
  
   })


   it('should check all conditions for mid value of client satisfaction rating', () =>{
    let teamDetails = teamDetailsResponse;
    teamDetails.powerboardResponse.dashboard.clientStatus.clientSatisfactionRating = 5;
 localStorage.setItem('TeamDetailsResponse', JSON.stringify(teamDetails));
expect(component).toBeTruthy();

})

   it('should check all conditions for higher client satisfaction rating', () =>{
    let teamDetails = teamDetailsResponse;
    teamDetails.powerboardResponse.dashboard.clientStatus.clientSatisfactionRating = 9;
 localStorage.setItem('TeamDetailsResponse', JSON.stringify(teamDetails));
expect(component).toBeTruthy();

})
});
