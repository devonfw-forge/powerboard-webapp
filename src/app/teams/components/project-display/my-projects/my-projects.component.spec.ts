import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { GeneralService } from 'src/app/shared/services/general.service';
import { TeamDetailsService } from '../../../services/team-details.service';
import checkData from 'src/app/checkData.json'; 
import { MyProjectsComponent } from './my-projects.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SlideshowService } from 'src/app/teams/services/slideshow.service';
import { ElectronService } from 'ngx-electron';
class MockRouter{
  navigateByUrl(url : string){
    return url ;
  }
}
describe('MyProjectsComponent', () => {
  let component: MyProjectsComponent;
  let fixture: ComponentFixture<MyProjectsComponent>;
  let teamDetailsService : TeamDetailsService;
  let PowerboardDashboard :any = {
    loginResponse: {
      homeResponse: {     
        My_Team: [
          {
            teamId: "mockTeamId",
            teamName: "Team Mock",
            teamLogo: "mock logo",
            myRole: "mock role",
            teamStatus: 3
          }
        ]
      }
    }
  }
  beforeEach(async () => {
    
    await TestBed.configureTestingModule({
      
      imports :[RouterTestingModule, HttpClientTestingModule],
      declarations: [ MyProjectsComponent ],
      providers : [TeamDetailsService,GeneralService, SlideshowService, ElectronService]
      
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
  localStorage.setItem("PowerboardDashboard",JSON.stringify(PowerboardDashboard));


    teamDetailsService = TestBed.inject(TeamDetailsService);
    fixture = TestBed.createComponent(MyProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    
    
    expect(JSON.parse(localStorage.getItem('PowerboardDashboard'))).toEqual(PowerboardDashboard);
    
    expect(component).toBeTruthy();
  });

 /*  it('get team details should throw error on passing team Id as null',() =>{
    component.getTeamDetails(null).then((data) =>{
    }).catch((e) => {
      expect(e.error.message).toEqual('Team Not Found');
    })
  }) */

  it('get team details should run',() =>{
    spyOn(teamDetailsService, 'processTeamDetails').and.returnValue(null);
    component.getTeamDetails('sampleTeamId');
    expect(teamDetailsService.processTeamDetails).toHaveBeenCalled();
  });

  it('get team details should run',() =>{
    spyOn(teamDetailsService, 'processTeamDetails').and.throwError("error getting details");
    component.getTeamDetails('sampleTeamId');
    expect(teamDetailsService.processTeamDetails).toHaveBeenCalled();
  });
});
