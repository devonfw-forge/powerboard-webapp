import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AddAggregatorLinksComponent } from './add-aggregator-links.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SetupService } from 'src/app/config/services/setup.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { AggregationLinksCategory } from 'src/app/shared/model/general.model';

import TeamDetailsResponse from 'src/app/teamDetailsResponse.json';
import { LinkTypeFilterPipe } from 'src/app/config/pipes/link-type-filter.pipe';

describe('AddAggregatorLinksComponent', () => {
  let component: AddAggregatorLinksComponent;
  let fixture: ComponentFixture<AddAggregatorLinksComponent>;

  class MockNotifyService {
    showError(heading: string, message: string) {
      console.log(heading, message);
      return null;
    }
    showSuccess(heading: string, message: string) {
      console.log(heading, message);
      return null;
    }
  }



  class MockSetupService {
    onSubmit() {
      return null;
    }
    getAggregationLinkTypes(){
      let linkTypes : any = [
        {
          linkId: "1122334455",
          linkTitle: "dummy name"
        }
      ]
      return linkTypes;
    }

    addAggregationLink(link:any){
      console.log(link);
      let returnLink:any ={
        url:"dummy",
        name:{
          title:"dummy titile"
        }
      }
      return returnLink;
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule, ReactiveFormsModule],
      declarations: [AddAggregatorLinksComponent, LinkTypeFilterPipe],
      providers: [
        { provide: SetupService, useClass: MockSetupService },
        { provide: NotificationService, useClass: MockNotifyService },
      ],
    }).compileComponents();
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

    localStorage.setItem('TeamDetailsResponse', JSON.stringify(TeamDetailsResponse));
 
    fixture = TestBed.createComponent(AddAggregatorLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update link', () => {
    let link: AggregationLinksCategory = {
      linkId: '12233',
      linkTitle: 'dummylink',
    };
    component.updateLinkType(link);
    expect(component.addAggregationLink.controls['name'].value).toEqual(link.linkId);
  }); 

  it('should run onsubmit',()=>{
    let returnLink:any ={
      url:"dummy",
      name:{
        title:"dummy titile"
      }
    }
    component.addAggregationLink.controls.url.setValue("dummyurl");
    component.addAggregationLink.controls.name.setValue("dummyname");
    spyOn(component.setupService,'addAggregationLink').and.returnValue(returnLink);
    component.onSubmit();
    expect(component.setupService.addAggregationLink).toHaveBeenCalled();
  })
});
