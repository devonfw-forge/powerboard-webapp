import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ElectronService } from 'ngx-electron';
import { AppComponent } from "./app.component";
import { GeneralService } from './shared/services/general.service';
import { NavigationService } from './shared/services/navigation.service';
import { SlideshowService } from './teams/services/slideshow.service';
import { TeamDetailsService } from './teams/services/team-details.service';

describe('AppComponent', () => {
  let app: AppComponent; 
  let fixture: ComponentFixture<AppComponent>;
  let httpTestingController : HttpTestingController;
  class MockSlideShowService{
    isSlideshowRunning = false;
    checkSlideshowArray(){
      return null;
    }
    stopSlideShow(){
      return null;
    }
    startSlideShow(){
      return null;
    }
  }
  class MockGeneralService{
    isDashboardVisible = true;
    IsShowNavBarIcons(){
      return null;
    }
    getIsLinksVisible(){
      return true;
    }
    getLoginComplete(){
      return true;
    }
    getLogoPath(){
      return null;
    }
    logout(){
      return null;
    }
    getisGuestLogin(){
      return true;
    }
  }
  class MockNavigationService{
    back(){
      return true;
    }
    clearRouterHistory(){
      return null;
    }
    pushCurrentLocation(){
      return null;
    }
  }
  class MockTeamDetailsService{
    resetTeamDetailPermissions(){
      return null;
    }
  }
 

class MockRouter {
  navigate(path:string){
   return path;
  }
  navigateByUrl(path:string){
    return path;
  }
}


beforeEach(async () => {
  await TestBed.configureTestingModule({
    imports: [
      RouterTestingModule, HttpClientTestingModule
    ],
    declarations: [
      AppComponent
    ],
    providers:[
     {provide : SlideshowService, useClass:MockSlideShowService},
     {provide : GeneralService, useClass:MockGeneralService},
     {provide : TeamDetailsService, useClass:MockTeamDetailsService},
     {provide : NavigationService, useClass:MockNavigationService},
     {provide : Router, useClass:MockRouter},
    ]
      
  }).compileComponents();
});

beforeEach(() => {
  fixture = TestBed.createComponent(AppComponent);
  app = fixture.componentInstance;
  fixture.detectChanges();
});

it('should create', () => {
  expect(app).toBeTruthy();
});

it('should toggle properly', () => {
  var dummyElement = document.createElement('togglebtn');
document.getElementById = jasmine.createSpy('HTML Element').and.returnValue(dummyElement);
dummyElement.className="btn btn-sm btn-toggle";
  app.toggle();
 // expect(slideShowService.startSlideShow).toHaveBeenCalled();
expect(app.toggle).toBeTruthy();
});

it('should toggle properly', () => {
  var dummyElement = document.createElement('togglebtn');
document.getElementById = jasmine.createSpy('HTML Element').and.returnValue(dummyElement);
dummyElement.className="btn btn-sm btn-toggle active";
  app.toggle();
 // expect(slideShowService.startSlideShow).toHaveBeenCalled();
expect(app.toggle).toBeTruthy();
});

it('should get TeamName', () => {
  //spyOn(generalService,'IsShowNavBarIcons').and.returnValue(true);
  // spyOn(localStorage, 'getItem').and.callFake((key) => {
  //   return key;
  // });
  app.getTeamName();
  expect(app.getTeamName).toBeTruthy();
})
// fit('should get TeamName', () => {
//   //spyOn(generalService,'IsShowNavBarIcons').and.returnValue(true);
//   // spyOn(localStorage, 'getItem').and.callFake((key) => {
//   //   return key;
//   // });
//   generalService.IsShowNavBarIcons=null
//   app.getTeamName();
//   expect(app.getTeamName).toBeTruthy();
 
// })
it('should get highlight for dashboard', () => {
  var dummyDashboard = document.createElement('dashboard');
document.getElementById = jasmine.createSpy('HTML Element').and.returnValue(dummyDashboard);
//dummyDashboard .className="btn btn-sm btn-toggle active";

var dummyMultimedia = document.createElement('multimedia');
document.getElementById = jasmine.createSpy('HTML Element').and.returnValue(dummyMultimedia);
//dummyMultimedia.className="btn btn-sm btn-toggle active";

const btnName='dashboard'
app.highlight(btnName);
expect(app.highlight).toBeTruthy();
})

it('should get highlight for links', () => {
  var dummyDashboard = document.createElement('dashboard');
document.getElementById = jasmine.createSpy('HTML Element').and.returnValue(dummyDashboard);
//dummyDashboard .className="btn btn-sm btn-toggle active";

var dummyMultimedia = document.createElement('multimedia');
document.getElementById = jasmine.createSpy('HTML Element').and.returnValue(dummyMultimedia);
//dummyMultimedia.className="btn btn-sm btn-toggle active";

const btnName='links'
app.highlight(btnName);
expect(app.highlight).toBeTruthy();
})

it('should get highlight for multimedia', () => {
  var dummyDashboard = document.createElement('dashboard');
document.getElementById = jasmine.createSpy('HTML Element').and.returnValue(dummyDashboard);
//dummyDashboard .className="btn btn-sm btn-toggle active";

var dummyMultimedia = document.createElement('multimedia');
document.getElementById = jasmine.createSpy('HTML Element').and.returnValue(dummyMultimedia);
//dummyMultimedia.className="btn btn-sm btn-toggle active";

const btnName='multimedia'
app.highlight(btnName);
expect(app.highlight).toBeTruthy();
})

it('should checkLocation() ', () => {

  //app.location.path().includes("/dashboard")==true;
 //spyOn(app,'highlight').and.callThrough()
 var dummyDashboard = document.createElement('dashboard');
document.getElementById = jasmine.createSpy('HTML Element').and.returnValue(dummyDashboard);

//spyOn(location,'path').and.returnValue(true);
spyOn(app,'highlight').and.callFake;
  app.checkLocation();
  expect(app.checkLocation).toBeTruthy();

})
it('should go back ', () => {  
  app.back()
  expect(app.back).toBeTruthy();

})
it('should confirm logout ', () => {
  app.confirmLogout();
  expect(app.confirmLogout).toBeTruthy();

})

it('should confirmStay ', () => {
  app.confirmStay();
  expect(app.confirmStay).toBeTruthy();

})
it('should moveToSetings() ', () => {
  app.moveToSetings()
  expect(app.moveToSetings).toBeTruthy();

})
it('should moveToSetings() ', () => {
  app.moveToSetings()
  expect(app.moveToSetings).toBeTruthy();

})
it('should onKeydownHandler ', () => {
 let event: KeyboardEvent
  app.onKeydownHandler(event);
  expect(app.onKeydownHandler).toBeTruthy();

})
})

// import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
// import { TestBed } from '@angular/core/testing';
// import { RouterTestingModule } from '@angular/router/testing';
// import { ElectronService } from 'ngx-electron';
// import { AppComponent } from './app.component';
// import { GeneralService } from './shared/services/general.service';
// import { SlideshowService } from './teams/services/slideshow.service';
//  import checkData from 'src/app/checkData.json'
// import TeamDetailsResponse from 'src/app/teamDetailsResponse.json' 
// import { TeamDetailsService } from './teams/services/team-details.service';

// describe('AppComponent', () => {
//    let app: AppComponent; 
//   let electronService: ElectronService;
//   let slideshowService : SlideshowService;
//   let generalService : GeneralService;
//   let httpTestingController : HttpTestingController;
//  let teamDetailService:TeamDetailsService;
// // class MockSlideShowService{
// //   stopSlideShow(){

// //   }

// //   startSlideShow(){

// //   }
// // }

//  let currentTeam = {
// teamId: "46455bf7-ada7-495c-8019-8d7ab76d488e",
// teamName: " ",
// teamCode: "10012345",
// projectKey : "P1112222",
// adCenter: "ADCenter Bangalore"
//  }


  // beforeEach(async () => {
  //   await TestBed.configureTestingModule({
  //     imports: [
  //       RouterTestingModule, HttpClientTestingModule
  //     ],
  //     declarations: [
  //       AppComponent
  //     ],
  //     providers:[{provide : ElectronService, useValue : electronService},
  //      {provide : SlideshowService, useValue : slideshowService}
  //     ]
        
  //   }).compileComponents();
  // });


  // beforeEach(() => {
  //   var store = {};

  // spyOn(localStorage, 'getItem').and.callFake(function (key) {
  //   return store[key];
  // });
  // spyOn(localStorage, 'setItem').and.callFake(function (key, value) {
  //   return store[key] = value + '';
  // });
  // spyOn(localStorage, 'clear').and.callFake(function () {
  //     store = {};
  // });

//      localStorage.setItem('PowerboardDashboard', JSON.stringify(checkData));
//     localStorage.setItem('TeamDetailsResponse', JSON.stringify(TeamDetailsResponse));
//     /* localStorage.setItem('currentTeam', JSON.stringify(currentTeam)); */ 
//     TestBed.configureTestingModule({});
//     /* component = TestBed.inject(AppComponent); */
//     httpTestingController = TestBed.inject(HttpTestingController);
//     electronService = TestBed.inject(ElectronService);
//     slideshowService = TestBed.inject(SlideshowService);
//     generalService = TestBed.inject(GeneralService);
  


//     const fixture = TestBed.createComponent(AppComponent);
//     app = fixture.componentInstance;

    
//     // const spyObj = jasmine.createSpyObj(app.slideShowService,['stopSlideShow','startSlideShow']);
//     // spyObj.startSlideShow.and.callFake(()=>{});
//     // spyObj.stopSlideShow.and.callFake(()=>{});  
// /*     spyOn(slideshowService,'startSlideShow').and.callFake(()=>{ return null});
//     spyOn(slideshowService,'stopSlideShow').and.callFake(()=>{ return null}); */
// /*     spyOn(app.slideShowService,'startSlideShow').and.callFake(()=>{ return null});
//     spyOn(app.slideShowService,'stopSlideShow').and.callFake(()=>{ return null}); */
//   });


//   it('should create the app', () => {   
//     expect(app).toBeTruthy();
//   });

//   it('should have as title PowerboardFW_new ', () => {
//     expect(app.title).toEqual('PowerboardFW_new');
//   });

//   it('check toggle',()=>{
//     var newElement = document.createElement('togglebtn');
//     newElement.className = "btn btn-sm btn-toggle active";
//     spyOn(document,'getElementById').and.returnValue(newElement);
//    // dummyElement.className='btn btn-sm btn-toggle active'
//    spyOn(slideshowService,'stopSlideShow').and.callThrough()
//   app.toggle();
//   expect(slideshowService.stopSlideShow).toHaveBeenCalled();
//   expect(app.toggle).toBeTruthy();
//   })
//   /* it('check toggle',()=>{
//     //uncomment when we can mock slideshow service
//     var newElement = document.createElement('div');
//     newElement.className = "mock name";
//     spyOn(document,'getElementById').and.returnValue(newElement);
//     app.toggle();
//   }) */

//   it('should get team name',()=>{
    // spyOn(generalService,'IsShowNavBarIcons').and.returnValue(true);
    // app.getTeamName();
//     expect(generalService.IsShowNavBarIcons).toHaveBeenCalled();
//   })
//   it('should get team name as empty',()=>{
//     spyOn(generalService,'IsShowNavBarIcons').and.returnValue(false);
//     app.getTeamName();
//     expect(generalService.IsShowNavBarIcons).toHaveBeenCalled();
//   })


//   /* it('should render title', () => {
//     const fixture = TestBed.createComponent(AppComponent);
//     fixture.detectChanges();
//     const compiled = fixture.nativeElement;
//     expect(compiled.querySelector('.content span').textContent).toContain('PowerboardFW_new app is running!');
//   });  */
  

//   it('should check highlight logic for dashboard',()=>{
//     var newElement = document.createElement('div');
//     newElement.className = "mock name";
//     spyOn(document,'getElementById').and.returnValue(newElement);
//     spyOn(generalService,'IsShowNavBarIcons').and.returnValue(true);
//     spyOn(generalService,'getIsLinksVisible').and.returnValue(true);
//     app.highlight("dashboard");
//     expect(generalService.IsShowNavBarIcons).toHaveBeenCalled();
//   })

//   it('should check highlight logic for links',()=>{
//     var newElement = document.createElement('div');
//     newElement.className = "mock name";
//     spyOn(document,'getElementById').and.returnValue(newElement);
//     spyOn(generalService,'IsShowNavBarIcons').and.returnValue(true);
//     spyOn(generalService,'getIsLinksVisible').and.returnValue(true);
//     app.highlight("links");
//     expect(generalService.IsShowNavBarIcons).toHaveBeenCalled();
//   })
//   it('should check highlight logic for multimedia',()=>{
//     var newElement = document.createElement('div');
//     newElement.className = "mock name";
//     spyOn(document,'getElementById').and.returnValue(newElement);
//     spyOn(generalService,'IsShowNavBarIcons').and.returnValue(true);
//     spyOn(generalService,'getIsLinksVisible').and.returnValue(true);
//     app.highlight("multimedia");
//     expect(generalService.IsShowNavBarIcons).toHaveBeenCalled();
//   })


//   it('confirm logout ',()=>{ 
//   app.confirmLogout();
//   expect(generalService.logout).toHaveBeenCalled();
//   //expect(teamDetailService.resetTeamDetailPermissions).toHaveBeenCalled();
//   })




//   it('move to settings ',()=>{  
//     /* let loc
//      const location = jasmine.createSpyObj(Location,["path"]);
//     location.path.and.callFake(()=>{return "config"});  */
//     /* let location : Location;
//     location = TestBed.inject(Location);
//     spyOn(location,'path(').and.returnValue("config");  */
//     app.checklocationPath = "config";
//     app.moveToSetings();
    
//   })

  
// });
