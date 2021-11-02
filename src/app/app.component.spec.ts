import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ElectronService } from 'ngx-electron';
import { AppComponent } from './app.component';
import { GeneralService } from './shared/services/general.service';
import { SlideshowService } from './teams/services/slideshow.service';
 import checkData from 'src/app/checkData.json'
import TeamDetailsResponse from 'src/app/teamDetailsResponse.json' 

describe('AppComponent', () => {
   let app: AppComponent; 
  let electronService: ElectronService;
  let slideshowService : SlideshowService;
  let generalService : GeneralService;
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

     localStorage.setItem('PowerboardDashboard', JSON.stringify(checkData));
    localStorage.setItem('TeamDetailsResponse', JSON.stringify(TeamDetailsResponse));
    /* localStorage.setItem('currentTeam', JSON.stringify(currentTeam)); */ 
    TestBed.configureTestingModule({});
    /* component = TestBed.inject(AppComponent); */
    httpTestingController = TestBed.inject(HttpTestingController);
    electronService = TestBed.inject(ElectronService);
    slideshowService = TestBed.inject(SlideshowService);
    generalService = TestBed.inject(GeneralService);
  


    const fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;

    
    const spyObj = jasmine.createSpyObj(app.slideShowService,['stopSlideShow','startSlideShow']);
    spyObj.startSlideShow.and.callFake(()=>{});
    spyObj.stopSlideShow.and.callFake(()=>{});  
/*     spyOn(slideshowService,'startSlideShow').and.callFake(()=>{ return null});
    spyOn(slideshowService,'stopSlideShow').and.callFake(()=>{ return null}); */
/*     spyOn(app.slideShowService,'startSlideShow').and.callFake(()=>{ return null});
    spyOn(app.slideShowService,'stopSlideShow').and.callFake(()=>{ return null}); */
  });


  it('should create the app', () => {   
    expect(app).toBeTruthy();
  });

  it('should have as title PowerboardFW_new ', () => {
    expect(app.title).toEqual('PowerboardFW_new');
  });

  /* it('check toggle',()=>{
    //uncomment when we can mock slideshow service
    var newElement = document.createElement('div');
    newElement.className = "mock name";
    spyOn(document,'getElementById').and.returnValue(newElement);
    app.toggle();
  }) */

  it('should get team name',()=>{
    spyOn(generalService,'IsShowNavBarIcons').and.returnValue(true);
    app.getTeamName();
    expect(generalService.IsShowNavBarIcons).toHaveBeenCalled();
  })
  it('should get team name as empty',()=>{
    spyOn(generalService,'IsShowNavBarIcons').and.returnValue(false);
    app.getTeamName();
    expect(generalService.IsShowNavBarIcons).toHaveBeenCalled();
  })


  /* it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.content span').textContent).toContain('PowerboardFW_new app is running!');
  });  */
  

  it('should check highlight logic for dashboard',()=>{
    var newElement = document.createElement('div');
    newElement.className = "mock name";
    spyOn(document,'getElementById').and.returnValue(newElement);
    spyOn(generalService,'IsShowNavBarIcons').and.returnValue(true);
    spyOn(generalService,'getIsLinksVisible').and.returnValue(true);
    app.highlight("dashboard");
    expect(generalService.IsShowNavBarIcons).toHaveBeenCalled();
  })

  it('should check highlight logic for links',()=>{
    var newElement = document.createElement('div');
    newElement.className = "mock name";
    spyOn(document,'getElementById').and.returnValue(newElement);
    spyOn(generalService,'IsShowNavBarIcons').and.returnValue(true);
    spyOn(generalService,'getIsLinksVisible').and.returnValue(true);
    app.highlight("links");
    expect(generalService.IsShowNavBarIcons).toHaveBeenCalled();
  })
  it('should check highlight logic for multimedia',()=>{
    var newElement = document.createElement('div');
    newElement.className = "mock name";
    spyOn(document,'getElementById').and.returnValue(newElement);
    spyOn(generalService,'IsShowNavBarIcons').and.returnValue(true);
    spyOn(generalService,'getIsLinksVisible').and.returnValue(true);
    app.highlight("multimedia");
    expect(generalService.IsShowNavBarIcons).toHaveBeenCalled();
  })







  it('move to settings ',()=>{  
    /* let loc
     const location = jasmine.createSpyObj(Location,["path"]);
    location.path.and.callFake(()=>{return "config"});  */
    /* let location : Location;
    location = TestBed.inject(Location);
    spyOn(location,'path(').and.returnValue("config");  */
    app.checklocationPath = "config";
    app.moveToSetings();
    
  })

  
});
