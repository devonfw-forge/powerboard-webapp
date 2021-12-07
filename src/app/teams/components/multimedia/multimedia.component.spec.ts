import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { GeneralService } from 'src/app/shared/services/general.service';
import { MultimediaComponent } from './multimedia.component';
import TeamDetailsResponse from 'src/app/TeamDetailsResponse.json';

describe('MultimediaComponent', () => {
  let component: MultimediaComponent;
  let fixture: ComponentFixture<MultimediaComponent>;
  let httpTestingController : HttpTestingController;
  let newTeamDetails : any ={
    "powerboardResponse": {
        "team_id": "46455bf7-ada7-495c-8019-8d7ab76d488e",
        "multimedia": {
            "display": [
                {
                    "id": "36078c40-6667-4a15-bd5f-38d0c74fb006",
                    "urlName": "https://powerboard-test.s3.eu-central-1.amazonaws.com/uploads/uploads/multimedia/46455bf7-ada7-495c-8019-8d7ab76d488e/farewell/CapgeminiPurpose3258001d-dc2b-4208-afb4-f5a66f2af697.mp4",
                    "inSlideShow": false
                }
            ],
            "root": [
                {
                    "folderId": "aaad19f7-1b66-44aa-a443-4fcdd173f386",
                    "folderName": "farewell",
                    "inSlideShow": false,
                    "status": false
                },
                {
                    "folderId": "aaad19f7-1b66-44aa-a443-4fcdd173f385",
                    "folderName": "resort",
                    "inSlideShow": true,
                    "status": false
                }
            ]
        }
    }
  }

  class MockGeneralService{
    getAllFilesFromFolder(teamId, folderId){
      console.log(teamId,folderId);
      return null;
    }
    getAllFilesFromTeam(teamId){
      console.log(teamId);
      return null;
    }

  }
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports :[RouterTestingModule, HttpClientTestingModule],
      declarations: [ MultimediaComponent ],
      providers:[{provide : GeneralService, useClass: MockGeneralService}]
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
    localStorage.setItem('TeamDetailsResponse', JSON.stringify(TeamDetailsResponse));
    fixture = TestBed.createComponent(MultimediaComponent);
    component = fixture.componentInstance;
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it('should create', () => {
    spyOn(component,'updateComponent').and.callFake(()=>{return null});
    expect(component).toBeTruthy();
  });

  it('should update component get details from local storage',()=>{
    spyOn(component,'processFiles').and.callFake(()=>{return null});
    component.updateComponent();
    expect(localStorage.getItem).toHaveBeenCalled();
    expect(component.processFiles).toHaveBeenCalled();
  })
  it('should update component get details from local storage and current folder is home',()=>{
    
    localStorage.setItem('TeamDetailsResponse', JSON.stringify(newTeamDetails));
    spyOn(component,'processFiles').and.callFake(()=>{return null});
    component.updateComponent();
    expect(localStorage.getItem).toHaveBeenCalled();
    expect(component.processFiles).toHaveBeenCalled();
    expect(component.currentFolder).toEqual('Home');
    localStorage.setItem('TeamDetailsResponse', JSON.stringify(TeamDetailsResponse));
  })



  it('should show current folder as home if folder status is true', () =>{
    localStorage.setItem('TeamDetailsResponse', JSON.stringify(TeamDetailsResponse));
    spyOn(component,'processFiles').and.callFake(()=>{return null});
    component.updateComponent();
    component.showHomeFiles();
    expect(component.currentFolder).toEqual('Home');
  })

  it('should show current folder as home if folder status is false', () =>{
    localStorage.setItem('TeamDetailsResponse', JSON.stringify(newTeamDetails));
    spyOn(component,'processFiles').and.callFake(()=>{return null});
    component.updateComponent();
    component.showHomeFiles();
    expect(component.currentFolder).toEqual('Home');
    localStorage.setItem('TeamDetailsResponse', JSON.stringify(TeamDetailsResponse));
  })



 /*  it('should throw error for null data while getting files from folder', () =>{
    component.getFilesFromFolder(null, null).catch(e => {
      expect(e.error.message).toEqual('Something went wrong, Please try again in some moment');
    })
  }) */

  /* it('should throw error for empty data while getting files from folder', () =>{
    component.getFilesFromFolder("", "").then(data =>{
      expect(data).toBeTruthy();
    }).catch(e => {
      expect(e).toEqual('Cannot GET /v1/auth/home/');
    })
    let req = httpTestingController.expectOne("http://localhost:3001/v1/multimedia/getAllFilesInFolder/");
    req.flush("404 Not Found",{
      status : 404,
      statusText : "Cannot GET /v1/auth/home/"
    });
  }) */
  it('should get files from folder',()=>{
    let response : any =[{
      id : "",
      isSelected : "",
      urlName : "",
      isImage : false,
      inSlideShow : false
    }]
    spyOn(component.generalService,'getAllFilesFromFolder').and.callFake(()=>{return response});
    spyOn(component,'processFiles').and.callFake(()=>{return null});
    component.getFilesFromFolder("mock folder id","mock folder name");
    expect(component.generalService.getAllFilesFromFolder).toHaveBeenCalled();
  })

  it('should catch error for get files from folder',()=>{
    let response : any = {
      error :{message: "error get files from folder"}
    }
    spyOn(console,'log');
    spyOn(component.generalService,'getAllFilesFromFolder').and.throwError(response);
    component.getFilesFromFolder("mock folder id","mock folder name");
    expect(component.generalService.getAllFilesFromFolder).toHaveBeenCalled();
    expect(console.log).toHaveBeenCalled();
  })

  it('should process files',()=>{
    let newMultimediaFiles : any = [{
      id : "",
      isSelected: false,
      urlName : "mockImage.jpg",
      isImage : true,
      inSlideShow : false
    },
    {
      id : "",
      isSelected: false,
      urlName : "mockVideo.mp4",
      isImage : false,
      inSlideShow : false
    },
    {
      id : "",
      isSelected: false,
      urlName : "mockImage2.jpg",
      isImage : true,
      inSlideShow : false
    }]
    spyOn(component,'onClickPlaylistItem');
    const storeFiles = component.multimediaFiles;
    component.multimediaFiles = newMultimediaFiles;
    component.processFiles();
    expect(component.onClickPlaylistItem).toHaveBeenCalled();
  })
   
  it('should get onclick play list item for video as well',()=>{
    component.thumbnailIsImage = [true,false,true];
    component.thumbnailData = ["mockImgae.jpg","mockVideo.mp4","mockImage2.jpg"];
    for(let i = 0; i< 3 ; i++){
      component.onClickPlaylistItem(component.thumbnailData[i],i);
      expect(component.currentItem).toEqual(component.thumbnailData[i]);
    }
  })

  it('should go to next item',()=>{
    spyOn(component,'onClickPlaylistItem').and.callFake(()=>{return null});
    component.nextItem();
    expect(component.onClickPlaylistItem).toHaveBeenCalled();
  })

  it('should go to previous item',()=>{
    spyOn(component,'onClickPlaylistItem').and.callFake(()=>{return null});
    component.previousItem();
    expect(component.onClickPlaylistItem).toHaveBeenCalled();
  })

  it('should see All files',()=>{
    let response : any =[{
      id : "",
      isSelected : "",
      urlName : "",
      isImage : false,
      inSlideShow : false
    }]
    spyOn(component.generalService,'getAllFilesFromTeam').and.callFake(()=>{return response});
    spyOn(component,'processFiles').and.callFake(()=>{return null});
    component.seeAll();
    expect(component.generalService.getAllFilesFromTeam).toHaveBeenCalled();
  })

  it('should catch error for see All',()=>{
    let response : any = {
      error :{message: "error getting all files"}
    }
    spyOn(console,'log');
    spyOn(component.generalService,'getAllFilesFromTeam').and.throwError(response);
    component.seeAll();
    expect(component.generalService.getAllFilesFromTeam).toHaveBeenCalled();
    expect(console.log).toHaveBeenCalled();
  })

  it('should clear interval Id',()=>{
    component.intervalID = 32224242;
    spyOn(window,'clearInterval');
    component.ngOnDestroy();
    expect(window.clearInterval).toHaveBeenCalled();
  })




});
