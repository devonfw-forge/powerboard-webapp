import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { NavigationEnd, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { GeneralService } from './general.service';
import { SlideshowService } from 'src/app/teams/services/slideshow.service';
import { NavigationService } from './navigation.service';
import { Observable } from 'rxjs';
import checkData from 'src/app/checkData.json';

describe('NavigationService', () => {
  let service: NavigationService;
  let httpTestingController : HttpTestingController;
  let generalService : GeneralService;
  let slideshowService : SlideshowService;

  class MockRouter {
    navigateByUrl(url: string) {
      return { url };
    }
  public ne = new NavigationEnd(0, 'http://localhost:4200/login', 'http://localhost:4200/login');
  public events = new Observable(observer => {
    observer.next(this.ne);
    observer.complete();
  });
}
class MockSlideshowService {
  public getSlideShow(){
    return false;
  }
}

class MockGeneralService {
  public getProjectDetails(userId : string){
    console.log(userId);
    return "";
  }
  public showNavBarIcons = false;
}
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[RouterTestingModule, HttpClientTestingModule],
      providers: [{provide: Router, useClass : MockRouter},
                  {provide: GeneralService, useClass: MockGeneralService},
                  {provide: SlideshowService, useClass: MockSlideshowService}]
      
    })
    .compileComponents().then(()=>{
      
    })
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
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavigationService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });


   it('should be created', () => {
    expect(service).toBeTruthy();
  }); 

  it('should go back properly',()=>{
    service.history = ['/login','/dashboard','/multimedia'];
    service.back();
    expect(service.history).toEqual(['/login']);
  })

  it('should go back properly for inside config',()=>{
    service.history = ['/login','/dashboard','/multimedia','/config','/config/setup','/config/viewTeam'];
    service.back();
    expect(service.history).toEqual(['/login','/dashboard']);
  })

  it('should go back properly for inside teams',()=>{
    spyOn(service,'moveToHome').and.callFake(()=>{return null});
    service.history = ['/login','/dashboard','/multimedia','/teams/projects','/teams/projects/adc'];
    service.back();
    expect(service.history).toEqual(['/login','/dashboard','/multimedia']);
  })

  it('should go back properly if reaches end',()=>{
    spyOn(service,'moveToHome').and.callFake(()=>{return null});
    service.history = ['/login','/dashboard'];
    expect(service.back()).toEqual(false);
  })

  it('should clear history',()=>{
    service.clearRouterHistory();
    expect(service.history).toEqual([]);
  })

  it('should clear history',()=>{
    service.history= [];
    service.currentLocation = '/login'
    service.pushCurrentLocation();
    expect(service.history).toEqual(['/login']);
  })

  it('should move to home if homeresponse is not undefined',()=>{
    service.moveToHome();
    expect(localStorage.getItem).toHaveBeenCalled();
  })

  it('should move to home if homeresponse is undefined',()=>{
    let newPowerBoardResponse : any = {
      "loginResponse": {
        "userId": null,
        "isPasswordChanged": true,
        "homeResponse": undefined,
        "privileges": []
      }
    }
    localStorage.setItem('PowerboardDashboard', JSON.stringify(newPowerBoardResponse));
    spyOn(service.generalService,'getProjectDetails');
    service.moveToHome();
    expect(localStorage.getItem).toHaveBeenCalled();
    expect(service.generalService.getProjectDetails).toHaveBeenCalled();
    localStorage.setItem('PowerboardDashboard', JSON.stringify(checkData));
  }) 

});
