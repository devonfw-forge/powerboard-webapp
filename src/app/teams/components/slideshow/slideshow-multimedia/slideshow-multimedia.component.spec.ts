import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ElectronService } from 'ngx-electron';
import { GeneralServiceMock } from 'src/app/mocks/general.service.mock';
import { GeneralService } from 'src/app/shared/services/general.service';
import { SlideshowService } from 'src/app/teams/services/slideshow.service';

import { SlideshowMultimediaComponent } from './slideshow-multimedia.component';

describe('SlideshowMultimediaComponent', () => {
  let component: SlideshowMultimediaComponent;
  let fixture: ComponentFixture<SlideshowMultimediaComponent>;
  let generalService : GeneralService;
  let slideShowService: SlideshowService;
  let spy:any;
  // beforeEach(() => {
  //   var store = {};
  
  //   spyOn(localStorage, 'getItem').and.callFake( (key:string):string => {
  //    return store[key] || null;
  //   });
  //   spyOn(localStorage, 'removeItem').and.callFake((key:string):void =>  {
  //     delete store[key];
  //   });
  //   spyOn(localStorage, 'setItem').and.callFake((key:string, value:string):string =>  {
  //     return store[key] = <string>value;
  //   });
  //   spyOn(localStorage, 'clear').and.callFake(() =>  {
  //       store = {};
  //   });
  // });
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports :[RouterTestingModule, HttpClientTestingModule],
      declarations: [ SlideshowMultimediaComponent ],
      providers:[{provide :GeneralService, useValue : generalService},{provide:SlideshowService,useValue:slideShowService},
         SlideshowService, ElectronService]
    })
    .compileComponents().then(() => {
      fixture = TestBed.createComponent(SlideshowMultimediaComponent);
      component = fixture.componentInstance;
      generalService = TestBed.inject(GeneralService);
      slideShowService=TestBed.inject(SlideshowService);
      fixture.detectChanges();
    });;
  });

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(SlideshowMultimediaComponent);
  //   component = fixture.componentInstance;
  //   generalService = TestBed.inject(GeneralService);
  //   fixture.detectChanges();
  // });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check if it is image or video', () =>{
expect(component.isImage("testing.png")).toEqual(true);
expect(component.isImage("testing.mp4")).toEqual(false);
  })

/* it('should update slide show multimedia component', () =>{
const slideShowfiles:any=['bannerd8a32383-b767-44e7-b48c-d15fbecc9a49.jpg'];
const powerboardResponse:any={
  powerboardResponse:{
    team_id:'46455bf7-ada7-495c-8019-8d7ab76d488e'
  }
}
spyOn(localStorage,'getItem').and.returnValue(powerboardResponse);
generalService = TestBed.inject(GeneralService);
spyOn(generalService,'getSlideshowFiles').and.returnValue(slideShowfiles)
spyOn(component,'isImage').and.returnValue(true);
expect(component.updateComponent).toBeTruthy();
//expect(component.isImage).toHaveBeenCalled();
  }) */

describe('slideshowControl()',()=>{
    const currentIndex=0;
    it('if the file is image', () =>{
      
      const slideShowfiles:any=[
        {
          fileUrl:'bannerd8a32383-b767-44e7-b48c-d15fbecc9a49.jpg'
        }
    ]
    spyOn(component,'isImage').and.returnValue(true);    
    spyOn(slideShowService,'moveSlideshowNextComponent').and.callThrough();
    expect(component.slideshowControl).toBeTruthy();
    });
    it('if the file is video', () =>{
      const slideShowfiles:any=[
        {
          fileUrl:'bannerd8a32383-b767-44e7-b48c-d15fbecc9a49.mp4'
        }
    ]
    spyOn(component,'isImage').and.returnValue(false);
    spyOn(slideShowService,'moveSlideshowNextComponent').and.callThrough();
    expect(component.slideshowControl).toBeTruthy();
    })
})


it('onPlayerReady',()=>{
  expect(component.onPlayerReady).toBeTruthy();
});

describe('isImage',()=>{
  it(' isImage should return true if the file is an image',()=>{
    const url='photo.png';
    expect(component.isImage(url)).toBe(true);
  })
  
  it(' isImage should return false if the file is a video',()=>{
    const url='video.mp4';
    expect(component.isImage(url)).toBe(false)
  })
})

describe('nextVideo',()=>{
  it('should move slide show to Next Component',()=>{
  const slideShowfiles:any=['bannerd8a32383-b767-44e7-b48c-d15fbecc9a49.jpg'];
  const currentIndex=0;
spyOn(slideShowService,'moveSlideshowNextComponent').and.callThrough();
expect(component.nextVideo).toBeTruthy();
  })
})

describe('playVideo',()=>{
  it('should play the video properly',()=>{
expect(component.playVideo).toBeTruthy();
  })
})

describe('onTap',()=>{
  it('should stop or play the video',()=>{
expect(component.onTap).toBeTruthy();
  })
})
 /*  it('should check next video',() =>{
    let count = component.currentIndex;
    component.nextVideo();
    expect(component.currentIndex).toEqual(count + 1);
    
  }) */
});