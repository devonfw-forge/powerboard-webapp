import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ElectronService } from 'ngx-electron';
import { AppComponent } from './app.component';
import { SlideshowService } from './teams/services/slideshow.service';
/* import checkData from 'src/app/checkData.json'
import TeamDetailsResponse from 'src/app/teamsDetailsResponse.json' */

describe('AppComponent', () => {
/*   let component: AppComponent; */
  let electronService: ElectronService;
  let slideshowService : SlideshowService;
  let httpTestingController : HttpTestingController;
 


 let currentTeam = {
teamId: "46455bf7-ada7-495c-8019-8d7ab76d488e",
teamName: " ",
teamCode: "10012345",
projectKey : "P1112222",
adCenter: "ADCenter Bangalore"
 }


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule, HttpClientTestingModule
      ],
      declarations: [
        AppComponent
      ],
      providers:[{provide : ElectronService, useValue : electronService},{provide : SlideshowService, useValue : slideshowService}]
        
    }).compileComponents();
  });


  beforeEach(() => {
    /* localStorage.setItem('PowerboardDashboard', JSON.stringify(checkData));
    localStorage.setItem('TeamDetailsResponse', JSON.stringify(TeamDetailsResponse));
    localStorage.setItem('currentTeam', JSON.stringify(currentTeam)); */
    TestBed.configureTestingModule({});
    /* component = TestBed.inject(AppComponent); */
    httpTestingController = TestBed.inject(HttpTestingController);
    electronService = TestBed.inject(ElectronService);
    slideshowService = TestBed.inject(SlideshowService);
  });


  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should have as title PowerboardFW_new ', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('PowerboardFW_new');
  });

  /* it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.content span').textContent).toContain('PowerboardFW_new app is running!');
  });  */


});
