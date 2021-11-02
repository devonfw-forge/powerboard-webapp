import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { SetupService } from 'src/app/config/services/setup.service';
import { LinksCategory } from 'src/app/shared/model/general.model';
import { NotificationService } from 'src/app/shared/services/notification.service';
import teamDetailsResponse from 'src/app/teamDetailsResponse.json'
import { AddLinksComponent } from './add-links.component';


describe('AddLinksComponent', () => {
  let component: AddLinksComponent;
  let fixture: ComponentFixture<AddLinksComponent>;
  let notifyService : NotificationService;
  let setupService : SetupService;
  let spy :any;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports :[HttpClientTestingModule],
      declarations: [ AddLinksComponent ],
      providers : [FormBuilder,SetupService, {provide: NotificationService, useValue: notifyService} ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    setupService = TestBed.inject(SetupService);
    localStorage.setItem('TeamDetailsResponse', JSON.stringify(teamDetailsResponse));
    fixture = TestBed.createComponent(AddLinksComponent);
    component = fixture.componentInstance;
    notifyService = TestBed.inject(NotificationService);
    const spyObj = jasmine.createSpyObj('notifyService',['showError','showSuccess']);
    spyObj.showError.and.callThrough();
    spyObj.showSuccess.and.callFake((data)=>{return data});
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get link types', () => {
    component.getLinkTypes().then(() =>{
      expect(component.linkTypes).toBeTruthy();
    })
  
  });

  it('should  get error onsubmit data on adding link', () =>{
 component.onSubmit();
 expect(component.error).toEqual(true);
  })


  it('should submit data on adding link', () =>{
    let response :any ={
      error : {
        message : "error adding link"
      }
    }
    let result : any;
    spy = spyOn(setupService, 'addLink').and.throwError(response);
    component.addLink.controls['linkName'].setValue("TestingLink");
       component.addLink.controls['linkType'].setValue("Meeting_Link");
       component.addLink.controls['links'].setValue("www.TestingLink.com");
       component.addLink.controls['teamId'].setValue("TestingTeamId");
    component.onSubmit().catch((error)=>{
      result = error;
    });
    expect(setupService.addLink).toHaveBeenCalled();
     })

     it('should submit data', () =>{
       let response: any = "newLink"
      spy = spyOn(setupService, 'addLink').and.returnValue(response);
       component.addLink.controls['linkName'].setValue("TestingLink");
       component.addLink.controls['linkType'].setValue("Meeting_Link");
       component.addLink.controls['links'].setValue("www.TestingLink.com");
       component.addLink.controls['teamId'].setValue("TestingTeamId");
       component.onSubmit();
       expect(component.error).toEqual(false);
     })


  
     it('should update link',() =>{
       let link : LinksCategory = {
        linkId: "12233",
        linkTitle: "Meeting_Link"
       }
       component.updateLinkType(link);
       expect(component.addLink.controls['linkType'].value).toEqual(link.linkId);
     })
});