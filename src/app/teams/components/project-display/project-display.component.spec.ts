import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { GeneralService } from '../../../shared/services/general.service';
import checkData from 'src/app/checkData.json'; 
import { TeamDetailsService } from '../../services/team-details.service';
import { ProjectDisplayComponent } from './project-display.component';

describe('ProjectDisplayComponent', () => {
  let component: ProjectDisplayComponent;
  let fixture: ComponentFixture<ProjectDisplayComponent>;

  class MockGeneralService{
    isSettingsVisible = false;
    showNavBarIcons = false;
    checkVisibility(){
      return null;
    }
  }
  class MockTeamDetailsService{
    setTeamDetailPermissions(){
      return null;
    }
    setPermissionsOfTeamDetails(){
      return null;
    }

  }


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectDisplayComponent ],
      imports :[RouterTestingModule, HttpClientModule],
      providers : [
        {provide:GeneralService,useClass:MockGeneralService},
        {provide:TeamDetailsService,useClass:MockTeamDetailsService}]
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
  spyOn(localStorage, 'removeItem').and.callFake(function (key) {
    return store[key] = null;
  });
  spyOn(localStorage, 'clear').and.callFake(function () {
      store = {};
  });

    localStorage.setItem('PowerboardDashboard', JSON.stringify(checkData));
    fixture = TestBed.createComponent(ProjectDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    spyOn(component,'checkMyProjects').and.callFake(()=>{return null});
    expect(component).toBeTruthy();
  });

  it('should check team is present',()=>{
    localStorage.setItem('PowerboardDashboard', JSON.stringify(checkData));
    component.checkMyProjects();
    expect(component.isMyProjects).toEqual(true);
  })

  it('should check team is not present',()=>{
    let newData : any={
      "loginResponse": {
         "homeResponse": {
          "My_Team": [
          ],    
        }
      }
    }
    localStorage.setItem('PowerboardDashboard', JSON.stringify(newData));
    component.checkMyProjects();
    expect(component.isMyProjects).toEqual(false);
    localStorage.setItem('PowerboardDashboard', JSON.stringify(checkData));
  })

});