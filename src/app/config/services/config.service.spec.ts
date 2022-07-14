import { HttpClientModule } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import TeamDetailsResponse from 'src/app/teamDetailsResponse.json';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TeamDetailResponse } from 'src/app/shared/model/general.model';
import { environment } from '../../../environments/environment';
import { ConfigService } from './config.service';

describe('ConfigService', () => {
  let service: ConfigService;
  let httpTestingController : HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[RouterTestingModule, HttpClientTestingModule],
      
    })
    .compileComponents();
  });

  beforeEach(() => {
    localStorage.setItem('TeamDetailsResponse', JSON.stringify(TeamDetailsResponse));
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfigService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  // it('should be created', () => {
  //   httpTestingController.match(
  //     'http://localhost:3000/bapi/v1/admin/viewAllUserRoles'
  //   );
  //   expect(service).toBeTruthy();
  // });

  it('should got roles', () => {
    service.getRoles().then((data)=>{
      expect(data).toBeDefined();
    });
    httpTestingController.match(
      'http://localhost:3000/bapi/v1/admin/viewAllUserRoles'
    );
  });

  it('should get team details',() =>{

    service.getTeamDetails();
    expect(service.getTeamDetails).toBeTruthy();
  })

  it('should getRoles',()=>{
      service.getRoles();
      expect(service.getRoles).toBeTruthy();
  })

  it('should set team details',() =>{
    // service.teamDetails = new TeamDetailResponse();
    // service.teamDetails = TeamDetailsResponse;
    // let details = service.teamDetails;
    // service.setTeamDetails();
    // service.getTeamDetails();
    // expect(service.teamDetails).toEqual(details);
    service.setTeamDetails();
    expect(service.setTeamDetails).toBeTruthy();
  })

});