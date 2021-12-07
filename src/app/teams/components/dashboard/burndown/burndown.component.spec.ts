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

    fixture = TestBed.createComponent(BurndownComponent);
    localStorage.setItem('TeamDetailsResponse', JSON.stringify(TeamDetailsResponse));
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    spyOn(component,'checkWorkUnit').and.callThrough();
    expect(component).toBeTruthy();
  });

  it('should check work unit if value is more than 1',()=>{
    let newValues : BurndownResponse ={
      workUnit: "storypoint",
      remainingDays: 10,
      remainingWork: 20,
      count: 30,
      burndownStatus: "mock status"
    }
    component.burnDown = newValues;
    component.checkWorkUnit();
    expect(component.unit).toEqual("storypoints");
  })

  it('should check work unit if value is less than 1',()=>{
    let newValues : BurndownResponse ={
      workUnit: "storypoint",
      remainingDays: 10,
      remainingWork: 0,
      count: 30,
      burndownStatus: "mock status"
    }
    component.burnDown = newValues;
    component.checkWorkUnit();
    expect(component.unit).toEqual("storypoint");
  })
});
