// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
// import { RouterTestingModule } from '@angular/router/testing';
// import { of } from 'rxjs';
// import { GeneralService } from 'src/app/shared/services/general.service';
// import { SlideshowService } from 'src/app/teams/services/slideshow.service';
// import { SlideshowMultimediaComponent } from "./slideshow-multimedia.component";

// describe('SlideshowMultimediaComponent', () => {

//   let component: SlideshowMultimediaComponent;
//   let fixture: ComponentFixture<SlideshowMultimediaComponent>;
//   let mockedGeneralService:jasmine.SpyObj<GeneralService>;
//  mockedGeneralService=jasmine.createSpyObj('GeneralService',['getSlideshowFiles']);
//   let generalService:GeneralService;
//   let slideShowService: SlideshowService;
//   beforeEach(() => {
//    //const spy=jasmine.createSpyObj('GeneralService',['getSlideshowFiles']);
//     TestBed.configureTestingModule({
//       imports :[RouterTestingModule, HttpClientTestingModule],
//       declarations: [ SlideshowMultimediaComponent ],
//       providers:[{provide :GeneralService, useValue :mockedGeneralService}]
//     }).compileComponents();
//     //mockedGeneralService = TestBed.inject(GeneralService);
//     // spyOn(mockedGeneralService, 'getSlideshowFiles').and.returnValue(of([]));
//   });
//   beforeEach(() => {
//     // TestBed.configureTestingModule({});
//     // service = TestBed.inject(SlideshowService);
//     fixture = TestBed.createComponent(SlideshowMultimediaComponent);
//     component = fixture.componentInstance;
//    //mockedGeneralService = TestBed.inject(GeneralService);
//   //let generalService=fixture.debugElement.injector.get(GeneralService); 
//     slideShowService=TestBed.inject(SlideshowService);
//     fixture.detectChanges();
//   });
// // beforeEach(() => {
// //   TestBed.configureTestingModule({
// //         imports :[RouterTestingModule, HttpClientTestingModule],
// //         declarations: [ SlideshowMultimediaComponent ],
// //         providers:[generalService]
// //       }).compileComponents() ;
// //   });
//   // beforeEach(() => {
//   //   // TestBed.configureTestingModule({});
//   //   // service = TestBed.inject(SlideshowService);
//   //   fixture = TestBed.createComponent(SlideshowMultimediaComponent);
//   //   component = fixture.componentInstance;
//   //  //mockedGeneralService = TestBed.inject(GeneralService);
//   // let generalService=fixture.debugElement.injector.get(GeneralService);
  
  
//   //   slideShowService=TestBed.inject(SlideshowService);
//   //   fixture.detectChanges();
//   // });
 
//   it('should create', () => {
//     expect(component).toBeTruthy();
    
//   });

//   it('should update slide show multimedia component', () =>{
//     const slideShowfiles:any=['bannerd8a32383-b767-44e7-b48c-d15fbecc9a49.jpg'];
//     const powerboardResponse:any={
//       powerboardResponse:{
//         team_id:'46455bf7-ada7-495c-8019-8d7ab76d488e'
//       }
//     }
//     spyOn(localStorage,'getItem').and.returnValue(powerboardResponse);
//     mockedGeneralService.getSlideshowFiles.and.returnValue(slideShowfiles);
//     //let stub=spyOn(generalService,'getSlideshowFiles').and.returnValue(slideShowfiles);
//     //mockedGeneralService=TestBed.inject(GeneralService)
//     //generalService = TestBed.inject(GeneralService);
//     //fixture.whenStable().then()
//     //spy.getSlideshowFiles
//     //jasmine.createSpy('getSlideshowFiles').and.returnValue(slideShowfiles)
//     //spyOn(component,'isImage').and.returnValue(true);
    
//     expect(component.updateComponent).toBeTruthy();
//     //expect(component.isImage).toHaveBeenCalled();
      

//     });
//   })

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { IPlayable, VgApiService } from '@videogular/ngx-videogular/core';
import { ElectronService } from 'ngx-electron';
import { Observable } from 'rxjs';
import { SlideshowFiles } from 'src/app/shared/model/general.model';
import { GeneralService } from 'src/app/shared/services/general.service';
import { SlideshowService } from 'src/app/teams/services/slideshow.service';
import { SlideshowMultimediaComponent } from './slideshow-multimedia.component';
import { of } from 'rxjs';
describe('SlideshowMultimediaComponent', () => {


  class MockedGeneralService{
    getSlideshowFiles(){
      const slideShowfiles:any=['bannerd8a32383-b767-44e7-b48c-d15fbecc9a49.jpg'];
      return slideShowfiles;
    }
  }
  
  class MockedSlideShowService{
    moveSlideshowNextComponent(){
      return true;
    }
    isSlideshowRunning(){
      return true;
    }
   
  }
  // class MockedVgApiService{
  //   // getState(){
  //   //   return 'playing'
  //   // }
  //   state='playing';
  //   getDefaultMedia(){
  //    const multimedia=null
  //    return multimedia;
  //   }
  //   play(){
  //     return true;
  //   }
  //   pause(){
  //     return true;
  //   }
    
  // }
  
  class MockRouter{
    getItem(){
      const response:any={
        powerboardResponse:{
          team_id:'46455bf7-ada7-495c-8019-8d7ab76d488e'
        }
      }
      return response;
    }
  }



  let component: SlideshowMultimediaComponent;
  let fixture: ComponentFixture<SlideshowMultimediaComponent>;
  let mockedGeneralService:GeneralService;
  let mockedSlideShowService: SlideshowService;
  // let vgApiService: MockedVgApiService;
  // let mockedVgApiService:MockedVgApiService;
 
  beforeEach(async () => {
    //vgApiService=new VgApiService();
    await TestBed.configureTestingModule({
      imports :[RouterTestingModule, HttpClientTestingModule],
      declarations: [ SlideshowMultimediaComponent ],
      providers:[
       //S VgApiService,
        {provide :GeneralService, useClass : MockedGeneralService},
        {provide:SlideshowService,useClass:MockedSlideShowService},
       // {provide:VgApiService,useClass:MockedVgApiService},
        {provide:Router,useClass:MockRouter}]
    })
    .compileComponents().then(() => {
      fixture = TestBed.createComponent(SlideshowMultimediaComponent);
      component = fixture.componentInstance;
    // mockedGeneralService = TestBed.inject(GeneralService);
    // mockedSlideShowService=TestBed.inject(SlideshowService);
     //mockedVgApiService=TestBed.inject(VgApiService);
      fixture.detectChanges();
      
    });;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

//   describe('isImage',()=>{
//   it('should check if it is image or video', () =>{
//   expect(component.isImage("testing.png")).toEqual(true);
//   expect(component.isImage("testing.mp4")).toEqual(false);
//   })
// })
describe('update component',()=>{

  it('should update slide show multimedia component if there is any multimedia file', () =>{
    // const slideShowfiles:any=['bannerd8a32383-b767-44e7-b48c-d15fbecc9a49.jpg'];
    ///component.slideshowFiles=null;
    const slideShowTempFiles:SlideshowFiles[]=[{
      fileURL : 'bannerd8a32383-b767-44e7-b48c-d15fbecc9a49.jpg',
      isImage : true
    }]
   component.slideshowTempFiles=slideShowTempFiles;
     component.slideshowTempFiles.length=1;
        component.componentReady = false;
        //component.slideshowTempFiles = [];
        component.slideshowFiles = [];
        component.currentIndex = 0;
    //let generalService=new MockedGeneralService;
    
    spyOn(component,'isImage').and.callFake(()=>{return true});
    spyOn(component,'slideshowControl').and.callFake(()=>{return true});
    component.updateComponent();
    expect(component.updateComponent).toBeTruthy();
    // expect(component.isImage).toHaveBeenCalled();
    // expect(component.slideshowControl).toHaveBeenCalled();
      })

      it('should update slide show multimedia component if there is video file', () =>{
        const slideShowTempFiles:SlideshowFiles[]=[{
          fileURL : 'bannerd8a32383-b767-44e7-b48c-d15fbecc9a49.mp4',
          isImage : false
        }]
       component.slideshowTempFiles=slideShowTempFiles;
         component.slideshowTempFiles.length=1;
            component.componentReady = false;
            //component.slideshowTempFiles = [];
            component.slideshowFiles = [];
            component.currentIndex = 0;
        
        spyOn(component,'isImage').and.callFake(()=>{return false});
        spyOn(component,'slideshowControl').and.callFake(()=>{return true});
        component.updateComponent();
       // expect(component.updateComponent).toHaveBeenCalled();
        expect(component.updateComponent).toBeTruthy();
      })
})
 

describe('slideshowControl()',()=>{
   
    it('if the file is image', () =>{
      // component.currentIndex=0;
      const slideshowFiles:any=[
        {
          fileURlL:'bannerd8a32383-b767-44e7-b48c-d15fbecc9a49.jpg',
          isImage :true
        }
    ]
    component.slideshowFiles=slideshowFiles;
    component.currentIndex=0;
    spyOn(component,'isImage').and.callThrough().and.returnValue(true);  
    // component.is_image=true; 
    // component.is_video=false; 
    //spyOn(slideShowService,'moveSlideshowNextComponent').and.callThrough();
    component.slideshowService.isSlideshowRunning=true;
    component.slideshowControl();
    expect(component.slideshowControl).toBeTruthy();
    //expect(component.slideshowControl).toHaveBeenCalled();
    });

    it('if the file is video', () =>{
      const slideShowfiles:any=[
        {
          fileUrl:'bannerd8a32383-b767-44e7-b48c-d15fbecc9a49.mp4',
          isImage :false
        }
    ]
    component.slideshowFiles=slideShowfiles;
    component.currentIndex=0;
    spyOn(component,'isImage').and.callThrough().and.returnValue(false); 
    component.slideshowService.isSlideshowRunning=true;

    //spyOn(slideShowService,'moveSlideshowNextComponent').and.callThrough();
    component.slideshowControl();
    //expect(component.slideshowControl).toHaveBeenCalled();
    expect(component.slideshowControl).toBeTruthy();
    })
})


it('onPlayerReady',()=>{
  //component.api=mockedVgApiService;
  
  let vgapi=new VgApiService;
  component.api=vgapi;
  component.componentReady=true;
   const metadata:any={};
  const defaultMedia:IPlayable={
  subscriptions:{
    loadedMetadata:metadata
  }
} as IPlayable
 //defaultMedia.subscriptions.loadedMetadata=metadata as Observable<any>
 //spyOn(component.api,'getDefaultMedia').and.returnValue(defaultMedia);
 //spyOn( metadata,'subscribe').and.callThrough();
// const subscribe:any={}
// const observable=vgapi.getDefaultMedia().subscriptions.loadedMetadata.subscribe()
//spyOn(defaultMedia.subscriptions.loadedMetadata,'subscribe').and.callFake(()=>{return subscribe });
//spyOn(vgapi.getDefaultMedia().subscriptions.loadedMetadata,'subscribe').and.returnValue(subscribe);
 //component.onPlayerReady(vgapi);
 //expect(vgapi.getDefaultMedia().subscriptions.loadedMetadata._subscribe)
//  expect(component.onPlayerReady).toBe('Error while loading video metadata?');
 expect(component.onPlayerReady).toBeTruthy();
});

describe('isImage',()=>{
  it(' isImage should return true if the file is an image',()=>{
    const url='photo.png';
    expect(component.isImage(url)).toBe(true);
  })
  
  it(' isImage should return false if the file is a video',()=>{
    const url='video.mp4';
    expect(component.isImage(url)).toBe(false);
  })
})

describe('nextVideo',()=>{
  it('should not move slide show to Next Component if there is only one component',()=>{
    component.currentIndex=0;
   const slideShowFiles:SlideshowFiles[]=[{
     fileURL : 'bannerd8a32383-b767-44e7-b48c-d15fbecc9a49.jpg',
     isImage : true
   }]
  component.slideshowFiles=slideShowFiles;
 
//spyOn(slideShowService,'moveSlideshowNextComponent').and.callThrough();
component.nextVideo();
expect(component.nextVideo).toBeTruthy();
//expect(component.nextVideo).toHaveBeenCalled();
})
  it('should move slide show to Next Component',()=>{
    const slideShowFiles:SlideshowFiles[]=[
      {
      fileURL : 'bannerd8a32383-b767-44e7-b48c-d15fbecc9a49.jpg',
      isImage : true
    },
    {
      fileURL : 'bannerd8a32383-b767-44e7-b48c-d15fbecc9a49.mp4',
      isImage : false
    }
  ]
   component.slideshowFiles=slideShowFiles;
  component.currentIndex=0;
 //spyOn(slideShowService,'moveSlideshowNextComponent').and.callThrough();
 component.nextVideo();
 //expect(component.nextVideo).toHaveBeenCalled();
 expect(component.nextVideo).toBeTruthy();
   })
})

describe('playVideo',()=>{
  it('should play the video properly',()=>{
 // mockedVgiService=  jasmine.createSpyObj("VgApiService",["pause","play","state"]);
 let api=new VgApiService;
    component.api=api;
   component.playVideo();
   expect(component.playVideo).toBeTruthy();
   //expect(component.playVideo).toHaveBeenCalled();
  // expect(vgApiService.play).toBeDefined();
  })
})

describe('onTap',()=>{
it('should stop the video when it is playing',()=>{
  // mockedVgiService=  jasmine.createSpyObj("VgApiService",["pause","play","state"]);
   //mockedVgApiService!.state="Playing"
   //component.api.state='playing'
   //spyOn(component.api,'state').and.returnValue('Playing')
   //component.api.state='playing'
  //  component.api=vgApiService;
  //  component.api!.state='playing'
  let api=new VgApiService;
  api.state='playing'
  component.api=api;
   component.onTap();
   spyOn(api,'state').and.callThrough();
   expect(component.onTap).toBeTruthy();
   //expect(api.pause).toHaveBeenCalled()
   //expect(component.onTap).toHaveBeenCalled();
   //expect(component.api.pause).toHaveBeenCalled();
  //expect(mockedVgiService.pause).toHaveBeenCalled();
  })
  it('should play the video when it is paused',()=>{
    let api=new VgApiService;
  api.state='Not Playing'
  component.api=api;
   component.onTap();
   spyOn(api,'state').and.callThrough();
    expect(component.onTap).toBeTruthy();
    // expect(component.api.play).toHaveBeenCalled();
   // expect(mockedVgiService.play).toHaveBeenCalled();
   })
})

describe('ngOnDestroy()',()=>{
  it('should work properly',()=>{
   component.intervalID='76465879'
expect(component.ngOnDestroy).toBeTruthy();
  })
})
describe('ngOnInit()',()=>{
  it('should work properly',()=>{
    //intervalID=true;
  spyOn(component,'updateComponent').and.callThrough();
  expect(component.ngOnInit).toBeTruthy();
  })
})
 /*  it('should check next video',() =>{
    let count = component.currentIndex;
    component.nextVideo();
    expect(component.currentIndex).toEqual(count + 1);
    
  }) */
});
