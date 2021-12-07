import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import checkData from 'src/app/checkData.json'; 
import TeamDetailsResponse from 'src/app/teamDetailsResponse.json';
import { SetupService } from 'src/app/config/services/setup.service';
import { GeneralService } from 'src/app/shared/services/general.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { EditTeamComponent } from './edit-team.component';
import { TeamsResponse, UpdateTeam } from 'src/app/config/model/config.model';

describe('EditTeamComponent', () => {

 class MockedGeneralService{

 }
 class MockedNotifyService{
  showSuccess(s:string,message:string){
 return true;
  }
  showError(){
return true;
  }
}


 class MockedSetUpService{
  deleteLogo(teamId:string){
return true
  }
  addLogoToTeam(teamId:string, file:any){
    const data={
      logo:{}
    }
    if(teamId){

      return data.logo;
    }
  }
  updateTeam(updateTeam:UpdateTeam, teamId:string){
return true;
  }
 }

  let component: EditTeamComponent;
  let fixture: ComponentFixture<EditTeamComponent>;
  let generalService : GeneralService;
  let setupService : SetupService;
  let spy :any;
  let spy2 :any;
  let notificationService : NotificationService;
  

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[RouterTestingModule, HttpClientTestingModule, ReactiveFormsModule],
      declarations: [ EditTeamComponent ],
      providers: [{provide  : GeneralService, useClass:MockedGeneralService}, {provide  : SetupService, useClass:MockedSetUpService}, {provide  : NotificationService, useClass:MockedNotifyService}]
    })
    .compileComponents()
    .then(() => {
      setupService = TestBed.inject(SetupService);
    generalService = TestBed.inject(GeneralService);
    notificationService = TestBed.inject(NotificationService);
    });
  });

  beforeEach(() => {
    
    localStorage.setItem('PowerboardDashboard', JSON.stringify(checkData));
    localStorage.setItem('TeamDetailsResponse', JSON.stringify(TeamDetailsResponse));
    fixture = TestBed.createComponent(EditTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should change ad center', () =>{
  //   component.changeADCenter("SampleCenter");
  //   expect(component.team.adCenter).toEqual("SampleCenter");
  // })

  /* it('should delete logo', () =>{
    let teamDetails : TeamsResponse = {
      teamId: null,
      teamName: null,
      teamCode: null,
      projectKey : null,
      adCenter: null
    }
    component.team = teamDetails;
    component.setDeleteLogo().catch(e =>{
      expect(e).toBeTruthy();
    })
  }) */


  /* it('should call set delete Logo', () =>{
   
    let teamDetails : TeamsResponse = {
      teamId: "testDetelelogo",
      teamName: "testteamNsme",
      teamCode: "testteamcode",
      projectKey : "testprojectkey",
      adCenter: "testadCenter"
    }
    component.team = teamDetails;
    spy = spyOn(setupService, 'deleteLogo');
    spy2 = spyOn(notificationService, 'showSuccess');
    component.setDeleteLogo();
    expect(setupService.deleteLogo).toHaveBeenCalled();
    expect(component.isLogo).toEqual(false);
  })

  it('should throw error for set delete logo', () =>{
    let response :any ={
      error : {
        message : "error deleting logo"
      }
    }
    spy = spyOn(setupService, 'deleteLogo').and.throwError(response);
    spy2 = spyOn(notificationService, 'showError');
    component.setDeleteLogo();
    expect(setupService.deleteLogo).toHaveBeenCalled();
  }) */

//   fit('should update team details', () =>{
//     component.form.controls['teamName'].setValue(null);
//     component.form.controls['teamCode'].setValue(null);
//     component.form.controls['projectKey'].setValue(null);

//   let teamDetails : TeamsResponse = {
//     teamId: null,
//     teamName: null,
//     teamCode: null,
//     projectKey : null,
//     adCenter: null
//   }

//   component.team = teamDetails;
//   component.submitForm().catch(e =>{
//     expect(e).toBeTruthy();
//   })
// })

it('should upload file ', () =>{
  component.spinner=true;
  const event:any={
target:{
  files:['some_File']
}
  }

component.uploadFile(event);
expect(component.uploadFile).toBeTruthy();
})

it('should submitForm ', () =>{
  component.submitForm();
  expect(component.submitForm).toBeTruthy();

})

it('should change AD center ', () =>{
  const centerName="A"
  component.team.adCenter="B"
  component.changeADCenter(centerName);
  expect(component.submitForm).toBeTruthy();

})

it('should setDeleteLogo ', () =>{
component.isLogo=false;
component.setDeleteLogo();
expect(component.setDeleteLogo).toBeTruthy();
component.isLogo=true;
})

});
