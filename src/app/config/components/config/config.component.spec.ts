import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { GeneralService } from 'src/app/shared/services/general.service';

import { ConfigComponent } from './config.component';

describe('ConfigComponent', () => {
  let component: ConfigComponent;
  let fixture: ComponentFixture<ConfigComponent>;
  let generalService : GeneralService;
  let spy :any;
  /* let router = {
    navigate: jasmine.createSpy('navigate')
  } */
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports :[RouterTestingModule, HttpClientTestingModule],
      declarations: [ ConfigComponent ],
      providers: [{provide : GeneralService, usevalue : generalService}]
    })
    .compileComponents();
  });

  beforeEach(() => {
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
});
