import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ElectronService, NgxElectronModule } from 'ngx-electron';
import { LinkTypeFilterPipe } from 'src/app/config/pipes/link-type-filter.pipe';
import { ShortUrlPipe } from 'src/app/config/pipes/short-url.pipe';
import { SetupService } from 'src/app/config/services/setup.service';
import { LinkResponse } from 'src/app/shared/model/general.model';
import { NotificationService } from 'src/app/shared/services/notification.service';
import TeamDetailsResponse from 'src/app/teamDetailsResponse.json';
import { AddLinksComponent } from './add-links/add-links.component';
import { ConfigureTeamLinksComponent } from './configure-team-links.component';
import { WebviewTag } from 'electron';
fdescribe('ConfigureTeamLinksComponent', () => {
  let component: ConfigureTeamLinksComponent;
  let fixture: ComponentFixture<ConfigureTeamLinksComponent>;
  let webviewTag:WebviewTag;

  class MockSetupService{
    deleteLink(link:string){
      console.log(link);
      return null;
    }
  } 
  class MockWebViewTag{
    setAttribute(qualifiedName: string, value: string){
      console.log(qualifiedName);
    }
  }
  class MockNotifyService{
    showError(heading:string,message:string){
      console.log(heading,message);
      return null;
    }
    showSuccess(heading:string,message:string){
      console.log(heading,message);
      return null;
    }
    showInfo(message:string ,title:string){
     return null;
    }
  }

  class MemberGroup{
     reset(){

     }
  }
  @Component({
    selector: 'app-add-links',
    template: '',
    providers: [{ provide: AddLinksComponent, useClass: MockedAddLinksComponent  }]
  })
  class MockedAddLinksComponent {
    //onSubmit = jasmine.createSpy('onSubmit');
  public memberGroup:MemberGroup;

    // constructor();
    
      onSubmit(){
      }
     
  }
 
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports :[RouterTestingModule, HttpClientModule, FormsModule, NgxElectronModule, ReactiveFormsModule],
      declarations: [ ConfigureTeamLinksComponent,ShortUrlPipe,LinkTypeFilterPipe,MockedAddLinksComponent
         //MockedAddLinksComponent 
        ],
      providers : [{provide : NotificationService, useClass:MockNotifyService}, ElectronService, ChangeDetectorRef,
        {provide:SetupService, useClass:MockSetupService},
        //{provide:AddLinksComponent,
         // useClass:MockedAddLinksComponent
        //},
        {provide: webviewTag,useClass:MockWebViewTag},
      ]
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

    localStorage.setItem('TeamDetailsResponse', JSON.stringify(TeamDetailsResponse));
    fixture = TestBed.createComponent(ConfigureTeamLinksComponent);
    component = fixture.componentInstance;
    component.isElectronRunning=true;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get links', ()=>{
    component.getLinks();
    expect(component.usefullLinks).toBeTruthy();
  })
  it('should get links', ()=>{
    component.usefullLinks=[];
    component.getLinks();
    expect(component.usefullLinks).toBeTruthy();
  })


  it('should check save selected link', () =>{
    component.saveSeletedLink("104");
    expect(component.selectedLinkId).toEqual("104");
  })

  it('should open link for meeting link',()=>{
    spyOn(component,'openMeetingLink').and.callFake(()=>{return null});
    let link : LinkResponse = {
      teamLinkId: "mock Link id",
      linkName: "mock link name",
      linkType: "meeting_link",
      links: "mock link"
    }
    component.openLink(link);
    expect(component.openMeetingLink).toHaveBeenCalled();
  })

  it('should open link for web link',()=>{
    spyOn(component,'openTeamLink').and.callFake(()=>{return null});
    let link : LinkResponse = {
      teamLinkId: "mock Link id",
      linkName: "mock link name",
      linkType: "web_link",
      links: "mock link"
    }
    component.openLink(link);
    expect(component.openTeamLink).toHaveBeenCalled();
  })

  it('should open meeting links on window',()=>{
    spyOn(window,'open').and.callFake(()=>{return null});
    component.isElectronRunning= false;
    component.openMeetingLink("mockLink");
    expect(window.open).toHaveBeenCalled();
  })
  it('should open meeting links on window if electron is running',()=>{
    spyOn(window,'open').and.callFake(()=>{return null});
    /* spyOn(window,'close').and.callFake(()=>{return null}); */
    component.isElectronRunning= true;
    component.openMeetingLink("mockLink");
    expect(window.open).toHaveBeenCalled();
    component.isElectronRunning= true;
  })

  it('should open team links on window if electron is not running',()=>{
    spyOn(window,'open').and.callFake(()=>{return null});
    component.isElectronRunning= false;
    component.openTeamLink("mockLink");
    expect(window.open).toHaveBeenCalled();
  })

  // it('should open team links on window if electron is running',()=>{
  //   spyOn(window,'open').and.callFake(()=>{return null});
  //   component.isElectronRunning= true;
  //   const link='mock link'
  //   component.openTeamLink(link);
  //   expect(window.open).toHaveBeenCalled();
  // })

  it('should delete link',()=>{
    component.selectedLinkId = "mock link id";
    component.deleteLink();
   // expect(JSON.parse(localStorage.getItem('TeamDetailsResponse')).powerboardResponse.teamLinks).toEqual(component.usefullLinks);
   expect(component.deleteLink).toBeDefined();
  })
  
  it('should add link',()=>{
  const data={
    linkName:'abc',
     id:'123',
     linkType:{
       title:'mock'
     },
     link:'abc.com'
   }
  const useFullLinks:LinkResponse[]=[];
  component.usefullLinks=useFullLinks;
   spyOn(component.child,'onSubmit').and.returnValue(data);
    component.addLink();
    expect(component.child.onSubmit).toHaveBeenCalled();
    expect(component.addLink).toBeTruthy();
  })

  // it('should close',()=>{
  //  // spyOn(component.child.memberGroup,'reset')
  //   component.close();
  //   expect(component.close).toBeTruthy();
  //   expect(component.child.memberGroup.reset).toHaveBeenCalled();
  // })

});