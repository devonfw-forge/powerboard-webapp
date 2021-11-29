import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SetupService } from 'src/app/config/services/setup.service';
import { LinksCategory } from 'src/app/shared/model/general.model';
import { NotificationService } from 'src/app/shared/services/notification.service';
import teamDetailsResponse from 'src/app/teamDetailsResponse.json'
import { AddLinksComponent } from './add-links.component';


describe('AddLinksComponent', () => {
  let component: AddLinksComponent;
  let fixture: ComponentFixture<AddLinksComponent>;

  class MockNotifyService{
    showError(heading:string,message:string){
      console.log(heading,message);
      return null;
    }
    showSuccess(heading:string,message:string){
      console.log(heading,message);
      return null;
    }
  }
  class MockSetupService{
    getLinkTypes(){
      return null;
    }
    addLink(linkValue: any){
      return null;
    }
  }
 
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports :[HttpClientTestingModule, FormsModule, ReactiveFormsModule],
      declarations: [ AddLinksComponent ],
      providers : [{provide:SetupService, useClass: MockSetupService},
         {provide: NotificationService, useClass: MockNotifyService} ]
    })
    .compileComponents();
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
  
    localStorage.setItem('TeamDetailsResponse', JSON.stringify(teamDetailsResponse));
    fixture = TestBed.createComponent(AddLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get link types', () => {
    spyOn(component.setupService, 'getLinkTypes');
    component.getLinkTypes();
    expect(component.setupService.getLinkTypes).toHaveBeenCalled();
  });

  it('should  get error onsubmit data on adding link', () =>{
    spyOn(component.setupService, 'addLink');
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
    spyOn(component.setupService, 'addLink').and.throwError(response);
    component.addLink.controls['linkName'].setValue("TestingLink");
       component.addLink.controls['linkType'].setValue("Meeting_Link");
       component.addLink.controls['links'].setValue("www.TestingLink.com");
       component.addLink.controls['teamId'].setValue("TestingTeamId");
    component.onSubmit().catch((error)=>{
      result = error;
    });
    expect(component.setupService.addLink).toHaveBeenCalled();
     })

     it('should submit data', () =>{
       let response: any = "newLink"
      spyOn(component.setupService, 'addLink').and.returnValue(response);
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