import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import checkData from 'src/app/checkData.json'; 
import { AddTeamComponent } from './add-team.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ConfigService } from 'src/app/config/services/config.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { TeamService } from 'src/app/config/services/team.service';

describe('AddTeamComponent', () => {

 class MockedConfigService{

 }

 class MockedNotificationService{

 }

 class MockedTeamService{
  addTeamWithLogo(formData:FormData){
return true;
  }
 }

  let component: AddTeamComponent;
  let fixture: ComponentFixture<AddTeamComponent>;
  let settingService : ConfigService;
  let httpTestingController : HttpTestingController;
  let notificationService : NotificationService;
  

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports :[RouterTestingModule, FormsModule, ReactiveFormsModule, HttpClientTestingModule],
      declarations: [ AddTeamComponent ],
      providers:[{provide : ConfigService, useClass:MockedConfigService}, 
        {provide : NotificationService, useClass:MockedNotificationService},
        {provide : TeamService, useClass:MockedTeamService}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    localStorage.setItem('PowerboardDashboard', JSON.stringify(checkData));
    fixture = TestBed.createComponent(AddTeamComponent);
    component = fixture.componentInstance;
   // httpTestingController = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
   // settingService = TestBed.inject(ConfigService);
   // notificationService = TestBed.inject(NotificationService);
    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should update center', () =>{
  //   component.updateCenter('99055bf7-ada7-495c-8019-8d7ab62d488e','ADCenter Bangalore');
  //   expect(component.centerId).toEqual('99055bf7-ada7-495c-8019-8d7ab62d488e');
  // })

  // it('should not add team for null data', () =>{
  //   component.form.reset();
  //   component.addTeamWithLogo();
  //   let req = httpTestingController.expectOne("http://localhost:3000/bapi/v1/teams/team/addTeam");
  //   req.flush("Internal Server Error",{
  //     status : 500,
  //     statusText : "Something went wrong, Please try again in some moment"
  //   });
  // })
  it('should update center', () =>{
    const centerId='ABC';
    const centerName='DEF';
    component.updateCenter(centerId,centerName);
    expect(component.updateCenter).toBeTruthy();
  })
it('should uploadFile',()=>{
 // component.spinner=true;
  const file:any=['some_File'];
  const event:any={
  target:{
  files:file
     }
  }
  
spyOn(URL, 'createObjectURL').and.returnValue("something");

component.uploadFile(event);
expect(component.uploadFile).toBeTruthy();
})
it('should addTeamWithLogo',()=>{
  var dummyElement = document.createElement('output');
  document.getElementById = jasmine.createSpy('output').and.returnValue(dummyElement);
component.addTeamWithLogo();
expect(component.addTeamWithLogo).toBeTruthy();
})
  /* it('should get error for upload file', () =>{
    component.uploadFile(null);
    expect(component.form.get('logo')).toBe(null);
  }) */
});
