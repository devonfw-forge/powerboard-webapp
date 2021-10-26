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

 
  /* it('should open link', () =>{
    component.isElectronRunning = false;
    component.openLink("sampleLink.com");
    expect(component.src).toEqual("sampleLink.com");
  }) */
});
