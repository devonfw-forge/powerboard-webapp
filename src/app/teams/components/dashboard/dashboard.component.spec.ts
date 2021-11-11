import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ElectronService } from 'ngx-electron';
import { SlideshowService } from '../../services/slideshow.service';
import TeamDetailsResponse from 'src/app/TeamDetailsResponse.json';
import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
 
  let fixture: ComponentFixture<DashboardComponent>;

  class MockSlideshowService{
    isSlideshowRunning = false;
    moveSlideshowNextComponent(){
      return null;
    }
    public getSlideShow():boolean{
      return  this.isSlideshowRunning ;
       }
       public startSlideShow(){
         this.isSlideshowRunning =true;
       }
       public stopSlideShow(){
         this.isSlideshowRunning = false;
       }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[RouterTestingModule, HttpClientModule],
      declarations: [ DashboardComponent ],
      providers:[{provide: SlideshowService,useClass:MockSlideshowService}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    
    
    localStorage.setItem('TeamDetailsResponse', JSON.stringify(TeamDetailsResponse));
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /* it('should check is slideshow running',() =>{
    let slideshowService = TestBed.inject(SlideshowService);
    slideshowService.isSlideshowRunning = true;
    expect(component.intervalID).toBeTruthy();
  }) */

  it('should check ngAfterviewInit when slideshow is running',()=>{
    component.slideshowService.startSlideShow();
    component.ngAfterViewInit();
    expect(component.interval).toBeTruthy();
  })
  it('should check ngAfterviewInit when slideshow is not running',()=>{
    spyOn(console,'log').and.callThrough();
    component.slideshowService.stopSlideShow();
    component.ngAfterViewInit();
    expect(console.log).toHaveBeenCalled();
  })
  

  it('should check ngOndestroy',()=>{
    spyOn(window,'clearInterval').and.callThrough();
    component.intervalID = 12345;
    component.ngOnDestroy();
    expect(window.clearInterval).toHaveBeenCalled();

  })
  it('should check ngOndestroy',()=>{
    spyOn(console,'log').and.callThrough();
    component.intervalID = undefined;
    component.ngOnDestroy();
    expect(console.log).toHaveBeenCalled();
  })

});
