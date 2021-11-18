import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SetupService } from 'src/app/config/services/setup.service';
import { GeneralService } from 'src/app/shared/services/general.service';
import TeamDetailsResponse from 'src/app/teamDetailsResponse.json';
import { ConfigureMultimediaComponent } from './configure-multimedia.component';
fdescribe('ConfigureMultimediaComponent', () => {
  let component: ConfigureMultimediaComponent;
  let fixture: ComponentFixture<ConfigureMultimediaComponent>;
  let configureService : SetupService
/* let notifyService : NotificationService; */

  class MockGeneralService{
    getAllFilesFromFolder(teamId:string,folderId:string){
      console.log(teamId,folderId);
      return null;
    }
  }

  class MockedSetUpService{
    addFilesToTeam(teamId:string, file:any){
      return true;
    }
    addToSlideshow(teamId:string, fileAndFolderIds:string[]){
       return true;
    }

    addFolderToTeam(teamId:string, newFolderName:string){
      const data={
        id:'1234',
        albumName:'Test'
      }
      // data.id;
      // this.newSubFolder.folderName = data.albumName;
       return true;
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [ ConfigureMultimediaComponent ],
      providers: [{provide:SetupService,useClass:MockedSetUpService},
         {provide:GeneralService , useClass:MockGeneralService}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    var store = {};



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
    fixture = TestBed.createComponent(ConfigureMultimediaComponent);
    component = fixture.componentInstance;
   // configureService = TestBed.inject(SetupService);
/*     notifyService = TestBed.inject(NotificationService); */
   /*  toastrService = TestBed.inject(ToastrService); */
    fixture.detectChanges();
    
  });

  it('should create', () => {

    expect(component).toBeTruthy();
  });

  it('should check home in slideshow',() =>{
    component.currentFolder = component.homeFile.folderName;
    component.checkHomeInslideShowStatus();
    let checkStatus = true;
    for(let file of component.multimediaFiles){
      if(!file.inSlideShow){
       checkStatus = false;
      }
    }
        expect(component.homeFile.inSlideShow).toEqual(checkStatus)
 })
//   it('should check ImagesAndVideos()',() =>{
//     const multimediaFiles=[{
//       id :'9763453',
//       isSelected:true,
//       urlName : 'oyuhoisn',
//       isImage : true,
//       inSlideShow : true
//     }]
// component.multimediaFiles=multimediaFiles;


//   })
  it('should show home files', () =>{
    component.updateComponent();
    component.showHomeFiles();
    expect(component.currentFolder).toEqual(component.homeFile.folderName);
  })

  /* it('should get files from folder', () =>{
    component.getFilesFromFolder(component.multimedia.root[0].folderId, component.multimedia.root[0].folderName);
      expect(component.multimediaFiles).toBeTruthy();
  }) */

  it('should get files from folder',()=>{
    component.teamId = "mockTeamId";
    spyOn(component,'deselectAll').and.callFake(()=>{return null});
    spyOn(component,'checkImagesAndVideos').and.callThrough();
    component.getFilesFromFolder("mockfolderId","mockfolderName").then(()=>{
      expect(component.checkImagesAndVideos).toHaveBeenCalled();
    });
    expect(component.deselectAll).toHaveBeenCalled();
  })

  it('should select and deselect all', () =>{
    component.isMasterSel = false;
    component.SelectAndDeselectAll();
    expect(component.isMasterSel).toEqual(true);
    component.SelectAndDeselectAll();
    expect(component.isMasterSel).toEqual(false);
  })

  it('should select all', () =>{
    component.currentFolder = component.homeFile.folderName;
    component.selectAll();
    expect(component.isMasterSel).toEqual(true);
  })

  it('should check root selection', () =>{
    let len = component.multimedia.root.length;
    for(let i = 0 ; i<len; i++){
     
      if(component.multimedia.root[i].isSelected){
        component.checkRootSelection(i);
        expect(component.multimedia.root[i].isSelected).toEqual(false);
      }
      else{
        component.checkRootSelection(i);
        expect(component.multimedia.root[i].isSelected).toEqual(true);
      }
    }
  })

  it('should check if home file is selected', () =>{
    component.homeFile.isSelected = true;
    component.checkHomeIsSelected();
    expect(component.homeFile.isSelected).toEqual(false);
   component.currentFolder = component.homeFile.folderName;
   component.checkHomeIsSelected();
   if(component.multimediaFiles.length > 0){
     for(let file of component.multimediaFiles){
      expect(file.isSelected).toEqual(true);
     }
   }
   component.homeFile.isSelected = false;
   if(component.multimedia.root.length > 0){
    component.currentFolder = component.multimedia.root[0].folderName;
    component.checkHomeIsSelected();
    if(component.multimediaFiles.length > 0){
      for(let file of component.multimediaFiles){
       expect(file.isSelected).toEqual(false);
      }
    }
   }
  })

//   /* it('should check file selection',() =>{
//     if(component.multimedia.root.length > 0){
//       component.currentFolder = component.multimedia.root[0].folderName;
//       component.checkFilesSelection(1);
//       expect(component.homeFile.isSelected).toEqual(false);
//     }
//   }) */
it('should check slidehow files and folders', () =>{
  component.homeFile.isSelected = true;
  for(let file of component.multimedia.root){
    file.status = false;
  }
  component.checkSlideshowFilesAndFolders();
  expect(component.fileAndFolderIds).toBeTruthy();
})
  

// it('should test check slideshow files and folders',() =>{
//   component.homeFile.isSelected = false;
//   component.currentFolder = component.homeFile.folderName;
//   component.checkSlideshowFilesAndFolders();
//   expect(component.fileAndFolderIds).toBeTruthy();
// })

it('should check add to slideshow',() =>{
  if(component.multimedia.display.length > 0){
    component.multimedia.display[0].isSelected  = true;
  }
  if(component.multimedia.root.length > 0){
    component.multimedia.root[0].isSelected  = true;
  }
 component.addToSlideShow().then(() =>{
  expect(component.isMasterSel).toEqual(false);
 })
  expect(component.isMasterSel).toEqual(false);
})

it('should add items to slideshow',() =>{
  spyOn(component,'checkSlideshowFilesAndFolders').and.callFake(()=>{return null});
 // spyOn(configureService,'addToSlideshow').and.callFake(()=>{return null});
 const multimediaFiles=[{
  id : '7657645',
  isSelected:true,
  urlName :'abc',
  isImage :true,
  inSlideShow :false
 }]
 component.multimedia.display=multimediaFiles
  spyOn(component, 'updateLocalStorage').and.callFake(()=>{return null});
  component.addToSlideShow();
  expect(component.checkSlideshowFilesAndFolders).toHaveBeenCalled();
  expect(component.addToSlideShow).toBeTruthy();
})
// it('should add items to slideshow catch error',() =>{
//   let response :any ={
//       error : {
//         message : "error adding slideshow items"
//       }
//     }
//   spyOn(component,'checkSlideshowFilesAndFolders').and.callFake(()=>{return null});
//   spyOn(configureService,'addToSlideshow').and.throwError(response);
  
//   spyOn(component, 'updateLocalStorage').and.callFake(()=>{return null});
//   component.addToSlideShow();
//   expect(component.checkSlideshowFilesAndFolders).toHaveBeenCalled();
// })

it('should add folders',()=>{
  // let response :any ={
  //     id: "mockId",
  //     albumName : "mock album name "
  //    }
   //spyOn(configureService,'addFolderToTeam').and.callFake(()=>{return response});
   spyOn(component, 'updateLocalStorage').and.callFake(()=>{return null});
   spyOn(component, 'selectAll').and.callFake(()=>{return  null});
   spyOn(component, 'deselectAll').and.callFake(()=>{return  null});
   component.addFolder();
   expect(configureService.addFolderToTeam).toHaveBeenCalled();
   expect(component.addFolder).toBeTruthy();
})

it('should add folders catch error',()=>{
  let response :any ={
      error : {
        message : "error adding slideshow items"
      }
    }
  spyOn(configureService,'addFolderToTeam').and.throwError(response);
  spyOn(component, 'updateLocalStorage').and.callFake(()=>{return null});
  spyOn(component, 'selectAll').and.callFake(()=>{return  null});
  spyOn(component, 'deselectAll').and.callFake(()=>{return  null});
  component.addFolder();
  expect(configureService.addFolderToTeam).toHaveBeenCalled();
})

it('should close and clear folder name',()=>{
  component.close();
  expect(component.newFolderName).toEqual('');
})

  it('should remove folders and files ids',()=>{
    spyOn(component, 'updateLocalStorage').and.callFake(()=>{return null});
    component.deleteFiles_Folders.filesId = ["1","3"];
    component.deleteFiles_Folders.foldersId = ["1","2"];
    component.multimediaFiles = [
      { id : "1", isSelected : true,urlName : "mockurl", isImage : true,inSlideShow : false },
      { id : "2", isSelected : true,urlName : "mockurl", isImage : false,inSlideShow : false },
      { id : "3", isSelected : true,urlName : "mockurl", isImage : true,inSlideShow : false },
      { id : "4", isSelected : true,urlName : "mockurl", isImage : false,inSlideShow : false }
    ]
    component.multimedia = {
      display : [
        { id : "1", isSelected : true,urlName : "mockurl", isImage : true,inSlideShow : false },
        { id : "2", isSelected : true,urlName : "mockurl", isImage : false,inSlideShow : false },
        { id : "3", isSelected : true,urlName : "mockurl", isImage : true,inSlideShow : false },
        { id : "4", isSelected : true,urlName : "mockurl", isImage : false,inSlideShow : false }
      ],
      root : [
        { folderId : "1", folderName : "mock1",status : false, isSelected : false, inSlideShow : false},
        { folderId : "2", folderName : "mock2",status : false, isSelected : false, inSlideShow : false},
        { folderId : "3", folderName : "mock2",status : false, isSelected : false, inSlideShow : false}
      ]
    }
    let result = {
      display : [
        { id : "2", isSelected : true,urlName : "mockurl", isImage : false,inSlideShow : false },
        { id : "4", isSelected : true,urlName : "mockurl", isImage : false,inSlideShow : false }
      ],
      root : [
        { folderId : "3", folderName : "mock2",status : false, isSelected : false, inSlideShow : false}
      ]
    }
    let resultedFiles :any = [
      { id : "2", isSelected : true,urlName : "mockurl", isImage : false,inSlideShow : false },
      { id : "4", isSelected : true,urlName : "mockurl", isImage : false,inSlideShow : false }
    ]
    component.removeIds();

    expect(component.multimedia).toEqual(result);
    expect(component.multimediaFiles).toEqual(resultedFiles);
  })


  it('should delete files and folders',()=>{
    spyOn(component,'getDeleteIds').and.callFake(()=>{return null});
    spyOn(component,'removeIds').and.callFake(()=>{return null});
    spyOn(configureService, 'deleteFilesAndFolders').and.callFake(()=>{return null});
    component.deleteFilesAndFolders();
    expect(component.getDeleteIds).toHaveBeenCalled();
    expect(configureService.deleteFilesAndFolders).toHaveBeenCalled();
  })

  it('should delete files and folders catch error',()=>{
    let response :any ={
      error : {
        message : "error deleting files"
      }
    }
    spyOn(component,'getDeleteIds').and.callFake(()=>{return null});
    spyOn(component,'removeIds').and.callFake(()=>{return null});
    spyOn(configureService, 'deleteFilesAndFolders').and.throwError(response);
    component.deleteFilesAndFolders();
    expect(component.getDeleteIds).toHaveBeenCalled();
    expect(configureService.deleteFilesAndFolders).toHaveBeenCalled();
  })

  it('should getDeleteIds work according to the logic if home is selected and folders are selected',()=>{
    component.multimediaFiles = [
      { id : "1", isSelected : true,urlName : "mockurl", isImage : true,inSlideShow : false },
      { id : "2", isSelected : true,urlName : "mockurl", isImage : false,inSlideShow : false },
      { id : "3", isSelected : false,urlName : "mockurl", isImage : true,inSlideShow : false },
      { id : "4", isSelected : true,urlName : "mockurl", isImage : false,inSlideShow : false }
    ]
    component.multimedia = {
      display : [
        { id : "1", isSelected : true,urlName : "mockurl", isImage : true,inSlideShow : false },
        { id : "2", isSelected : true,urlName : "mockurl", isImage : false,inSlideShow : false },
        { id : "3", isSelected : false,urlName : "mockurl", isImage : true,inSlideShow : false },
        { id : "4", isSelected : true,urlName : "mockurl", isImage : false,inSlideShow : false }
      ],
      root : [
        { folderId : "1", folderName : "mock1",status : false, isSelected : false, inSlideShow : false},
        { folderId : "2", folderName : "mock2",status : false, isSelected : true, inSlideShow : false},
        { folderId : "3", folderName : "mock2",status : false, isSelected : false, inSlideShow : false}
      ]
    }
    component.homeFile.isSelected = true;
    let result : any = ["1","2","3","4"];
    component.getDeleteIds();
    expect(component.deleteFiles_Folders.filesId).toEqual(result);
    expect(component.deleteFiles_Folders.foldersId).toEqual(["2"]);
  })

  it('should getDeleteIds work according to the logic if home is selected and folders are selected and status true',()=>{
    component.multimediaFiles = [
      { id : "1", isSelected : true,urlName : "mockurl", isImage : true,inSlideShow : false },
      { id : "2", isSelected : true,urlName : "mockurl", isImage : false,inSlideShow : false },
      { id : "3", isSelected : false,urlName : "mockurl", isImage : true,inSlideShow : false },
      { id : "4", isSelected : true,urlName : "mockurl", isImage : false,inSlideShow : false }
    ]
    component.multimedia = {
      display : [
        { id : "1", isSelected : true,urlName : "mockurl", isImage : true,inSlideShow : false },
        { id : "2", isSelected : true,urlName : "mockurl", isImage : false,inSlideShow : false },
        { id : "3", isSelected : false,urlName : "mockurl", isImage : true,inSlideShow : false },
        { id : "4", isSelected : true,urlName : "mockurl", isImage : false,inSlideShow : false }
      ],
      root : [
        { folderId : "1", folderName : "mock1",status : false, isSelected : false, inSlideShow : false},
        { folderId : "2", folderName : "mock2",status : true, isSelected : true, inSlideShow : false},
        { folderId : "3", folderName : "mock2",status : false, isSelected : false, inSlideShow : false}
      ]
    }
    component.homeFile.isSelected = true;
    let result : any = ["1","2","3","4"];
    component.getDeleteIds();
    expect(component.deleteFiles_Folders.foldersId).toEqual(["2"]);
  })


  it('should getDeleteIds work according to the logic if home is not selected and current folder is home',()=>{
    component.multimediaFiles = [
      { id : "1", isSelected : true,urlName : "mockurl", isImage : true,inSlideShow : false },
      { id : "2", isSelected : true,urlName : "mockurl", isImage : false,inSlideShow : false },
      { id : "3", isSelected : false,urlName : "mockurl", isImage : true,inSlideShow : false },
      { id : "4", isSelected : true,urlName : "mockurl", isImage : false,inSlideShow : false }
    ]
    component.multimedia = {
      display : [
        { id : "1", isSelected : true,urlName : "mockurl", isImage : true,inSlideShow : false },
        { id : "2", isSelected : true,urlName : "mockurl", isImage : false,inSlideShow : false },
        { id : "3", isSelected : false,urlName : "mockurl", isImage : true,inSlideShow : false },
        { id : "4", isSelected : true,urlName : "mockurl", isImage : false,inSlideShow : false }
      ],
      root : [
        { folderId : "1", folderName : "mock1",status : false, isSelected : false, inSlideShow : false},
        { folderId : "2", folderName : "mock2",status : true, isSelected : true, inSlideShow : false},
        { folderId : "3", folderName : "mock2",status : false, isSelected : false, inSlideShow : false}
      ]
    }
    component.homeFile.isSelected = false;
    component.currentFolder = component.homeFile.folderName;
    let result : any = ["1","2","4"];
    component.getDeleteIds();
    expect(component.deleteFiles_Folders.filesId).toEqual(result);
    expect(component.deleteFiles_Folders.foldersId).toEqual(["2"]);
  })

  it('should getDeleteIds work according to the logic if home is not selected and current folder is not home in if',()=>{
    component.multimediaFiles = [
      { id : "1", isSelected : true,urlName : "mockurl", isImage : true,inSlideShow : false },
      { id : "2", isSelected : true,urlName : "mockurl", isImage : false,inSlideShow : false },
      { id : "3", isSelected : false,urlName : "mockurl", isImage : true,inSlideShow : false },
      { id : "4", isSelected : true,urlName : "mockurl", isImage : false,inSlideShow : false }
    ]
    component.multimedia = {
      display : [
        { id : "1", isSelected : true,urlName : "mockurl", isImage : true,inSlideShow : false },
        { id : "2", isSelected : true,urlName : "mockurl", isImage : false,inSlideShow : false },
        { id : "3", isSelected : false,urlName : "mockurl", isImage : true,inSlideShow : false },
        { id : "4", isSelected : true,urlName : "mockurl", isImage : false,inSlideShow : false }
      ],
      root : [
        { folderId : "1", folderName : "mock1",status : false, isSelected : false, inSlideShow : false},
        { folderId : "2", folderName : "mock2",status : true, isSelected : true, inSlideShow : false},
        { folderId : "3", folderName : "mock2",status : false, isSelected : false, inSlideShow : false}
      ]
    }
    component.homeFile.isSelected = false;
    component.currentFolder = "";
    let result : any = ["1","2","4"];
    component.getDeleteIds();
    expect(component.deleteFiles_Folders.foldersId).toEqual(["2"]);
  })

  it('should getDeleteIds work according to the logic if home is not selected and current folder is not home in new folder',()=>{
    component.multimediaFiles = [
      { id : "1", isSelected : true,urlName : "mockurl", isImage : true,inSlideShow : false },
      { id : "2", isSelected : true,urlName : "mockurl", isImage : false,inSlideShow : false },
      { id : "3", isSelected : false,urlName : "mockurl", isImage : true,inSlideShow : false },
      { id : "4", isSelected : true,urlName : "mockurl", isImage : false,inSlideShow : false }
    ]
    component.multimedia = {
      display : [
        { id : "1", isSelected : true,urlName : "mockurl", isImage : true,inSlideShow : false },
        { id : "2", isSelected : true,urlName : "mockurl", isImage : false,inSlideShow : false },
        { id : "3", isSelected : false,urlName : "mockurl", isImage : true,inSlideShow : false },
        { id : "4", isSelected : true,urlName : "mockurl", isImage : false,inSlideShow : false }
      ],
      root : [
        { folderId : "1", folderName : "mock1",status : false, isSelected : false, inSlideShow : false},
        { folderId : "2", folderName : "mock2",status : true, isSelected : false, inSlideShow : false},
        { folderId : "3", folderName : "mock2",status : false, isSelected : false, inSlideShow : false}
      ]
    }
    component.homeFile.isSelected = false;
    component.currentFolder = "mock2";
    let result : any = ["1","2","4"];
    component.getDeleteIds();
    expect(component.deleteFiles_Folders.filesId).toEqual(result);
  })

  it('should getDeleteIds work according to the logic if home is not selected and current folder is not home in new folder and no files selected',()=>{
    component.multimediaFiles = [
      { id : "1", isSelected : false,urlName : "mockurl", isImage : true,inSlideShow : false },
      { id : "2", isSelected : false,urlName : "mockurl", isImage : false,inSlideShow : false },
      { id : "3", isSelected : false,urlName : "mockurl", isImage : true,inSlideShow : false },
      { id : "4", isSelected : false,urlName : "mockurl", isImage : false,inSlideShow : false }
    ]
    component.multimedia = {
      display : [
        { id : "1", isSelected : true,urlName : "mockurl", isImage : true,inSlideShow : false },
        { id : "2", isSelected : true,urlName : "mockurl", isImage : false,inSlideShow : false },
        { id : "3", isSelected : false,urlName : "mockurl", isImage : true,inSlideShow : false },
        { id : "4", isSelected : true,urlName : "mockurl", isImage : false,inSlideShow : false }
      ],
      root : [
        { folderId : "1", folderName : "mock1",status : false, isSelected : false, inSlideShow : false},
        { folderId : "2", folderName : "mock2",status : true, isSelected : false, inSlideShow : false},
        { folderId : "3", folderName : "mock2",status : false, isSelected : false, inSlideShow : false}
      ]
    }
    component.homeFile.isSelected = false;
    component.currentFolder = "mock2";
    let result : any = [];
    component.getDeleteIds();
    expect(component.deleteFiles_Folders.filesId).toEqual(result);
  })

  it('should check files selection if current folder is not home and not all files selected',()=>{
    component.multimediaFiles = [
      { id : "1", isSelected : false,urlName : "mockurl", isImage : true,inSlideShow : false },
      { id : "2", isSelected : false,urlName : "mockurl", isImage : false,inSlideShow : false },
      { id : "3", isSelected : true,urlName : "mockurl", isImage : true,inSlideShow : false },
      { id : "4", isSelected : false,urlName : "mockurl", isImage : false,inSlideShow : false }
    ]
    component.multimedia = {
      display : [
        { id : "1", isSelected : true,urlName : "mockurl", isImage : true,inSlideShow : false },
        { id : "2", isSelected : true,urlName : "mockurl", isImage : false,inSlideShow : false },
        { id : "3", isSelected : false,urlName : "mockurl", isImage : true,inSlideShow : false },
        { id : "4", isSelected : true,urlName : "mockurl", isImage : false,inSlideShow : false }
      ],
      root : [
        { folderId : "1", folderName : "mock1",status : false, isSelected : false, inSlideShow : false},
        { folderId : "2", folderName : "mock2",status : true, isSelected : false, inSlideShow : false},
        { folderId : "3", folderName : "mock2",status : false, isSelected : false, inSlideShow : false}
      ]
    }
    component.homeFile.isSelected = false;
    component.currentFolder = "mock2";
    let result : any = [];
    for(let i=0;i<component.multimediaFiles.length;i++){
      component.checkFilesSelection(i);
      expect(component.isMasterSel).toEqual(false);
    }
  })

  it('should check files selection if current folder is home and not all files selected',()=>{
    component.multimediaFiles = [
      { id : "1", isSelected : false,urlName : "mockurl", isImage : true,inSlideShow : false },
      { id : "2", isSelected : false,urlName : "mockurl", isImage : false,inSlideShow : false },
      { id : "3", isSelected : true,urlName : "mockurl", isImage : true,inSlideShow : false },
      { id : "4", isSelected : false,urlName : "mockurl", isImage : false,inSlideShow : false }
    ]
    component.multimedia = {
      display : [
        { id : "1", isSelected : true,urlName : "mockurl", isImage : true,inSlideShow : false },
        { id : "2", isSelected : true,urlName : "mockurl", isImage : false,inSlideShow : false },
        { id : "3", isSelected : false,urlName : "mockurl", isImage : true,inSlideShow : false },
        { id : "4", isSelected : true,urlName : "mockurl", isImage : false,inSlideShow : false }
      ],
      root : [
        { folderId : "1", folderName : "mock1",status : false, isSelected : false, inSlideShow : false},
        { folderId : "2", folderName : "mock2",status : true, isSelected : false, inSlideShow : false},
        { folderId : "3", folderName : "mock2",status : false, isSelected : false, inSlideShow : false}
      ]
    }
    component.homeFile.isSelected = false;
    component.currentFolder = component.homeFile.folderName;
    let result : any = [];
    for(let i=0;i<component.multimediaFiles.length;i++){
      component.checkFilesSelection(i);
      expect(component.isMasterSel).toEqual(false);
    }
  })

  it('should check files selection if current folder is home and all files selected',()=>{
    component.multimediaFiles = [
      { id : "1", isSelected : true,urlName : "mockurl", isImage : true,inSlideShow : false },
      { id : "2", isSelected : true,urlName : "mockurl", isImage : false,inSlideShow : false },
      { id : "3", isSelected : true,urlName : "mockurl", isImage : true,inSlideShow : false },
      { id : "4", isSelected : true,urlName : "mockurl", isImage : false,inSlideShow : false }
    ]
    component.multimedia = {
      display : [
        { id : "1", isSelected : true,urlName : "mockurl", isImage : true,inSlideShow : false },
        { id : "2", isSelected : true,urlName : "mockurl", isImage : false,inSlideShow : false },
        { id : "3", isSelected : true,urlName : "mockurl", isImage : true,inSlideShow : false },
        { id : "4", isSelected : true,urlName : "mockurl", isImage : false,inSlideShow : false }
      ],
      root : [
        { folderId : "1", folderName : "mock1",status : false, isSelected : false, inSlideShow : false},
        { folderId : "2", folderName : "mock2",status : true, isSelected : false, inSlideShow : false},
        { folderId : "3", folderName : "mock2",status : false, isSelected : false, inSlideShow : false}
      ]
    }
    component.homeFile.isSelected = false;
    component.currentFolder = component.homeFile.folderName;
    let result : any = [];
    for(let i=0;i<component.multimediaFiles.length;i++){
      component.checkFilesSelection(i);
      expect(component.isMasterSel).toEqual(false);
    }
  })

  it('should upload file',()=>{

    const event={
      target:{
        files:['mock_file1.png','mock_file2.png']
      }
    }
    component.currentFolder == component.homeFile.folderName
    component.uploadFile(event);
    expect(component.uploadFile).toBeTruthy();
  })

});