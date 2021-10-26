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
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports :[HttpClientTestingModule],
      declarations: [ AddLinksComponent ],
      providers : [FormBuilder,SetupService, {provide: NotificationService, useValue: notifyService} ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    localStorage.setItem('TeamDetailsResponse', JSON.stringify(teamDetailsResponse));
    fixture = TestBed.createComponent(AddLinksComponent);
    component = fixture.componentInstance;
    notifyService = TestBed.inject(NotificationService);
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
    component.addLink = null;
    component.onSubmit().catch(e =>{
      expect(e).toBeTruthy();
    })
    expect(component.error).toEqual(false);
     })

     it('should submit data', () =>{
       component.addLink.controls.linkName.setValue("");
       component.addLink.controls.linkType.setValue("");
       component.addLink.controls.links.setValue("");
       component.addLink.controls.teamId.setValue("");
       component.onSubmit();
       expect(component.error).toEqual(true);
     })


     it('should update link',() =>{
       let link : LinksCategory = {
        linkId: "12233",
        linkTitle: "Meeting_Link"
       }
       component.updateLinkType(link);
       expect(component.addLink.controls.linkType.value).toEqual(link.linkId);
     })
});