import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TeamMemberDetails } from '../model/config.model';

import { TeamService } from './team.service';

describe('TeamService', () => {
  let service: TeamService;
  let httpTestingController : HttpTestingController;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[RouterTestingModule, HttpClientTestingModule],
      
    })
    .compileComponents();
  });


  beforeEach(() => {
    
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeamService);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(TeamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('add team member should throw internal server error', async () => {
    let result;
    let teamMember : TeamMemberDetails = {
      "email": null,
      "username": null,
      "role":"558f1dfd-43e9-4cc4-8257-a6ba5c70e34d",
      "team": {
        "id": "46455bf7-ada7-495c-8019-8d7ab76d488e"
        }

    }
  service.addTeamMember(teamMember).then((data) => {
  result = data;
  }).catch(error => {
    result = error;
  });
  let req = httpTestingController.expectOne("http://localhost:3001/v1/auth/register");
      req.flush("Internal Server Error",{
        status : 500,
        statusText : "Something went wrong, Please try again in some moment"
      });
  }) 




/* 
   it('should view all team members', () =>{
    let viewData;
  service.viewTeamMembersOfTeam().then((data) => {
  viewData = data;
  expect(data).toEqual(viewData);
  })
  })  */


   it('view all team members should throw error for null ', async () => {
    let result;
  service.viewTeamMembersOfTeam(null).then((data) => {
  result = data;
  }).catch(error => {
    result = error;
  });
  let req = httpTestingController.expectOne("http://localhost:3001/v1/user/viewAllMemberOfTeam/null" );
      req.flush("Internal Server Error",{
        status : 500,
        statusText : "Something went wrong, Please try again in some moment"
      });
  })  



   it('change team member role should get error for null', ()=>{
    let result;
    service.updateAccessRole(null).then((data) =>{
      result = data;
    }).catch((error)=>{
      result = error;
    });
    let req = httpTestingController.expectOne("http://localhost:3001/v1/user/update/userRole");
    req.flush("Internal Server Error",{
      status : 500,
      statusText : "Something went wrong, Please try again in some moment"
    });
  }); 

  it('should add and delete team member', async () =>{
    let result;
    let teamMember : TeamMemberDetails = {
      "email": "test@gmail.com",
      "username": "test",
      "role":"558f1dfd-43e9-4cc4-8257-a6ba5c70e34d",
      "team": {
        "id": "46455bf7-ada7-495c-8019-8d7ab76d488e"
        }
      
    }
  service.addTeamMember(teamMember).then((data) => {
  result = data;
  let req = httpTestingController.expectOne("http://localhost:3001/v1/auth/register");
  service.deleteTeamMember(result.id).then((deleteData) => {
  
  httpTestingController.expectOne("http://localhost:3001/v1/admin/delete/userTeam/" + result.id);
  }
  ).catch(error => {
    result = error;
  })
  }).catch(error => {
    result = error;
  })
  })


  it('add team should throw internal server error', async () => {
    let result;
    var formData: any = new FormData();
    formData.append('teamName', null);
    formData.append('projectKey', null);
    formData.append('ad_center', null);
    formData.append('teamCode', null);
    formData.append('logo', null);
  service.addTeamWithLogo(formData).then((data) => {
  result = data;
  }).catch(error => {
    result = error;
  });
  let req = httpTestingController.expectOne("http://localhost:3001/v1/teams/team/addTeam");
      req.flush("Internal Server Error",{
        status : 500,
        statusText : "Something went wrong, Please try again in some moment"
      });
  })  


it('should view all the teams', () => {
  let viewTeam;
  service.viewAllTeams().then((data) => {
    viewTeam = data;
    expect(data).toEqual(viewTeam);
  })
})



it('should add and delete team', async () =>{
  let result;
  var formData: any = new FormData();
    formData.append('teamName', 'demo');
    formData.append('projectKey', '23455');
    formData.append('ad_center', '98755bf7-ada7-495c-8019-8d7ab62d488e');
    formData.append('teamCode', 'P000');
    formData.append('logo', null);
service.addTeamWithLogo(formData).then((data) => {
result = data;
let req = httpTestingController.expectOne("http://localhost:3001/v1/teams/team/addTeam");
service.deleteTeam(result.id).then((deleteData) => {

httpTestingController.expectOne("http://localhost:3001/v1/teams/team/delete/" + result.id);
}
).catch(error => {
  result = error;
})
}).catch(error => {
  result = error;
})
})

//delete team member

it('delete team member should get error for null value', () =>{
  let result;
  service.deleteTeamMember(null).then((data) =>{
    result = data;
  }).catch(error => {
    result = error;
  })
  let req = httpTestingController.expectOne("http://localhost:3001/v1/user/delete/userTeam/null");
  req.flush("500 Internal Server Error",{
    status : 500,
    statusText : "Something went wrong, Please try again in some moment"
  });
  expect(req.request.method).toEqual('DELETE'); 
});


//update access role
it('update  access role should get error for empty team id', () =>{
  let result;
  service.updateAccessRole(null).then((data) =>{
    result = data;
  }).catch(error => {
    result = error;
  })
  let req = httpTestingController.expectOne("http://localhost:3001/v1/user/update/userRole");
  req.flush("404 Not Found",{
    status : 404,
    statusText : "Cannot PUT /v1/teams/team/update/"
  });
  expect(req.request.method).toEqual('PUT'); 
});

//view team members
it('view team members of team types should return data', () =>{
  let result;
  service.viewTeamMembersOfTeam(null).then((data) =>{
    result = data;
  }).catch(error => {
    result = error;
  })
  let req = httpTestingController.expectOne("http://localhost:3001/v1/user/viewAllMemberOfTeam/null");
  expect(req.request.method).toEqual('GET'); 
});

//detele team 
it('delete team should get error for null value', () =>{
  let result;
  service.deleteTeam(null).then((data) =>{
    result = data;
  }).catch(error => {
    result = error;
  })
  let req = httpTestingController.expectOne("http://localhost:3001/v1/teams/team/delete/null");
  req.flush("500 Internal Server Error",{
    status : 500,
    statusText : "Something went wrong, Please try again in some moment"
  });
  expect(req.request.method).toEqual('DELETE'); 
});

//add  team members
it('add team member should get error for null value', () =>{
  let result;
  service.addTeamMember(null).then((data) =>{
    result = data;
  }).catch(error => {
    result = error;
  })
  let req = httpTestingController.expectOne("http://localhost:3001/v1/auth/register");
  req.flush("500 Internal Server Error",{
    status : 500,
    statusText : "Something went wrong, Please try again in some moment"
  });
  expect(req.request.method).toEqual('POST'); 
});

//view all teams
it('view all teams should get error for null data', () =>{
  let result;
  service.viewAllTeams().then((data) =>{
    result = data;
  }).catch(error => {
    result = error;
  })
  let req = httpTestingController.expectOne("http://localhost:3001/v1/teams/team/viewAllTeams");
  expect(req.request.method).toEqual('GET'); 
});
});
