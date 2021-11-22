import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { webviewTag } from 'electron';
import { ElectronService } from 'ngx-electron';
import TeamDetailsResponse from 'src/app/TeamDetailsResponse.json';
import { LinksComponent } from './links.component';
import { WebviewTag } from 'electron';
describe('LinksComponent', () => {

  // class MockedWebView{
  //   setAttribute(qualifiedName: string, value: string){
  //     return null;
  //   }
  // }
  class MockedElectronService{

  }
  let component: LinksComponent;
  let fixture: ComponentFixture<LinksComponent>;
  let electronService : ElectronService;
  const mockDocument = jasmine.createSpyObj('Document', ['querySelectorAll','setAttribute'])
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      
      imports :[RouterTestingModule, HttpClientModule],
      declarations: [ LinksComponent  ],
       providers:[
         {provide:ElectronService,useClass:MockedElectronService},
         {provide: Document, useValue: mockDocument }
         //{provide:WebviewTag,useClass:MockedWebView}
        ],
    })
    .compileComponents();
  });

  beforeEach(() => {

    // var store = {};

    // spyOn(localStorage, 'getItem').and.callFake(function (key) {
    //   return store[key];
    // });
    // spyOn(localStorage, 'setItem').and.callFake(function (key, value) {
    //   return store[key] = value + '';
    // });
    // spyOn(localStorage, 'clear').and.callFake(function () {
    //     store = {};
    // });

    fixture = TestBed.createComponent(LinksComponent);
    component = fixture.componentInstance;
    localStorage.setItem('TeamDetailsResponse', JSON.stringify(TeamDetailsResponse));
    //electronService= TestBed.inject(ElectronService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should get links',() =>{
    component.getLinks();
    expect(component.teamLinks).toEqual(JSON.parse(localStorage.getItem('TeamDetailsResponse')).powerboardResponse.teamLinks);
  });

  it('should automateWebLinks',() =>{
    spyOn(component,'openLink').and.callFake(()=>{return null});
    component.automateWebLinks(0);
    expect(component.automateWebLinks).toBeTruthy();
  })

  // it('should  openMeetingLink when electron is not running',() =>{
  //   component.isElectronRunning=false;
  //   const meetingLink="mock link"
  //   spyOn(window,'open');
  //   component.openMeetingLink(meetingLink);
  //   expect(window.open).toHaveBeenCalled();
  //   expect(component.openMeetingLink).toBeTruthy();
  // })
  // it('should  openMeetingLink when electron is running',() =>{
  //   component.isElectronRunning=true;
  //   const meetingLink="mock link"
  //   spyOn(window,'open');
  //   component.openMeetingLink(meetingLink);
  //   expect(window.open).toHaveBeenCalled();
  //   expect(component.openMeetingLink).toBeTruthy();
  // })
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
  it('should openLink on window if electron is not running',()=>{
   const link='mock link'
   component.isElectronRunning=false;
   spyOn(window,'open').and.callFake(()=>{return null});
   component.openLink(link);
   expect(window.open).toHaveBeenCalled();
  })

  // it('should openLink on window if electron is running',()=>{
  //   const link='mock link'
  //   component.isElectronRunning=true;
    // let webview:WebviewTag={} as WebviewTag
    // component.webview=webview;
    // let li = document.createElement('li');
    // li.setAttribute('src', 'mock');
    //spyOn(webview,'setAttribute').and.callFake(()=>{return null})
   // var element = document.createElement('div');
    //expect(setAttributes(element, {})).toEqual(element);
  //   spyOn(window,'open').and.callFake(()=>{return null});
  //   component.openLink(link);
  //   expect(window.open).toHaveBeenCalled();
  //   expect(component.openLink).toBeTruthy();
  //  });

  //  it('should  ngAfterViewInit',()=>{
     
  //   spyOn(component.webview, 'setAttribute').and.callFake
  //  const mockDocument = jasmine.createSpyObj('document', ['querySelector','setAttribute']);
  //   component.webview=mockDocument;
  //   component.isElectronRunning=true;
  //   component.ngAfterViewInit();

  //   expect(component.ngAfterViewInit).toBeTruthy();
  //  })
  // it('should open link if electron is not running',()=>{
  //   spyOn(window,'open').and.callFake(()=>{return null});
  //   spyOn(window,'close').and.callFake(()=>{return null});
  //   component.isElectronRunning = false;
  //   component.openLink("mockLink");
  //   expect(window.open).toHaveBeenCalled();
  // })

  // it('check ngDestroy',()=>{
  //   component.intervalID =1223;
  //   component.ngOnDestroy();
  //   expect(component.counter).toEqual(0)

  // })
  // it('should  automateWebLinks',()=>{
  //  // component.intervalID =1223;
  //   // component.ngOnDestroy();
  //   const intervalID=134
  //   component.automateWebLinks(intervalID);
  //   expect(component.automateWebLinks).toBeTruthy();
  //   //expect(component.counter).toEqual(0)

  // })
  
    // it('ngAfterViewInit', () =>{
    //   var dummyElement = document.createElement('togglebtn');
    //   document.getElementById = jasmine.createSpy('HTML Element').and.returnValue(dummyElement);
    //     component.ngAfterViewInit();
    //     expect(component.ngAfterViewInit).toBeTruthy();
    // })


  //  it('should open link', () =>{
  //   component.isElectronRunning = false;
  //   component.openLink("sampleLink.com");
  //   expect(component.openLink).toBeTruthy();
  //  // expect(component.src).toEqual("sampleLink.com");
  // }) 
});
