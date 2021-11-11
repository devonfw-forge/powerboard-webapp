import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ElectronService } from 'ngx-electron';
import TeamDetailsResponse from 'src/app/TeamDetailsResponse.json';
import { LinksComponent } from './links.component';

describe('LinksComponent', () => {
  let component: LinksComponent;
  let fixture: ComponentFixture<LinksComponent>;
  let electronService : ElectronService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports :[RouterTestingModule, HttpClientModule],
      declarations: [ LinksComponent  ],
       providers:[ElectronService],
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

    fixture = TestBed.createComponent(LinksComponent);
    component = fixture.componentInstance;
    localStorage.setItem('TeamDetailsResponse', JSON.stringify(TeamDetailsResponse));
    electronService= TestBed.inject(ElectronService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should get links',() =>{
    component.getLinks();
    expect(component.teamLinks).toEqual(JSON.parse(localStorage.getItem('TeamDetailsResponse')).powerboardResponse.teamLinks);
  });

  it('should open meeting links on window',()=>{
    spyOn(window,'open').and.callFake(()=>{return null});
    component.isElectronRunning= false;
    component.openMeetingLink("mockLink");
    expect(window.open).toHaveBeenCalled();
  })
  it('should open meeting links on window if electron is running',()=>{
    spyOn(window,'open').and.callFake(()=>{return null});
    spyOn(window,'close').and.callFake(()=>{return null});
    component.isElectronRunning= true;
    component.openMeetingLink("mockLink");
    expect(window.open).toHaveBeenCalled();
    component.isElectronRunning= true;
  })

  it('should open link if electron is not running',()=>{
    spyOn(window,'open').and.callFake(()=>{return null});
    spyOn(window,'close').and.callFake(()=>{return null});
    component.isElectronRunning = false;
    component.openLink("mockLink");
    expect(window.open).toHaveBeenCalled();
  })

  it('check ngDestroy',()=>{
    component.intervalID =1223;
    component.ngOnDestroy();
    expect(component.counter).toEqual(0)

  })
  
  /* it('should open link', () =>{
    component.isElectronRunning = false;
    component.openLink("sampleLink.com");
    expect(component.src).toEqual("sampleLink.com");
  }) */
});
