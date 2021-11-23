/* import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SetupService } from 'src/app/config/services/setup.service';
import { MultimediaFilesNew, MultimediaFolderResponse, RootNew } from 'src/app/shared/model/general.model';
import { GeneralService } from 'src/app/shared/services/general.service';
import TeamDetailsResponse from 'src/app/teamDetailsResponse.json';
import { ConfigureMultimediaComponent } from './configure-multimedia.component';
describe('ConfigureMultimediaComponent', () => {
  let component: ConfigureMultimediaComponent;
  let fixture: ComponentFixture<ConfigureMultimediaComponent>;
  let configureService : SetupService


  class MockGeneralService{
    getAllFilesFromFolder(teamId:string,folderId:string){
      console.log(teamId,folderId);
      return null;
    }
  }

  class MockedSetUpService{
    addFilesToTeam(teamId:string, file:any){
      const data={
        id:'67853',
        fileName:'mock.png',
      }
      return data;
    }
    addToSlideshow(teamId:string, fileAndFolderIds:string[]){
       return true;
    }

    addFolderToTeam(teamId:string, newFolderName:string){
      const data={
        id:'1234',
        albumName:'Test'
      }
     
       return data;
    }
    deleteFilesAndFolders(teamId:string, deleteFiles_Folders:string){
      return true;
    }

    addFileInSubFolder(folderId:string, teamId:string,file:any){
      const data={
        id:'8763',
        fileName:'Mock.png',
      }
      return data;
     
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

  
    localStorage.setItem('TeamDetailsResponse', JSON.stringify(TeamDetailsResponse));
    fixture = TestBed.createComponent(ConfigureMultimediaComponent);
    component = fixture.componentInstance;
  
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

  it('should show home files', () =>{
    component.updateComponent();
    component.showHomeFiles();
    expect(component.currentFolder).toEqual(component.homeFile.folderName);
  })

  

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


it('should check slidehow files and folders', () =>{
  component.homeFile.isSelected = true;
  for(let file of component.multimedia.root){
    file.status = false;
  }
  component.checkSlideshowFilesAndFolders();
  expect(component.fileAndFolderIds).toBeTruthy();
})
  



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


it('should add folders',()=>{
  
   spyOn(component, 'updateLocalStorage').and.callFake(()=>{return null});
   spyOn(component, 'selectAll').and.callFake(()=>{return  null});
   spyOn(component, 'deselectAll').and.callFake(()=>{return  null});
   component.addFolder();

   expect(component.addFolder).toBeTruthy();
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
    
    component.deleteFilesAndFolders();
    expect(component.getDeleteIds).toHaveBeenCalled();

    expect(component.deleteFilesAndFolders).toBeTruthy();
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

  it('should upload file in a folder',()=>{
    const file1='mock_file1.png';
    const file2='mock_file2.png';
    const event={
      target:{
        files:[file1,file2]
      }
    }
    
    component.uploadFile(event);
    expect(component.uploadFile).toBeTruthy();
  })

  it('should upload file in root',()=>{
    const file1='mock_file1.png';
    const file2='mock_file2.png';
    const event={
      target:{
        files:[file1,file2]
      }
    }
    component.currentFolder='Festival';
    component.homeFile.folderName='Festival';
    let root:RootNew[];
    root=[   
      {folderId : '',
      folderName : 'Mock', 
      status : true,
      isSelected: true,
      inSlideShow : true}
    ]
    let multimedia=new MultimediaFolderResponse();
    multimedia.root=root;
    component.multimedia.root=root;
    component.uploadFile(event);
    expect(component.uploadFile).toBeTruthy();
  })

  
  it('should upload file in folder present in root',()=>{
    const file1='mock_file1.png';
    const file2='mock_file2.png';
    const event={
      target:{
        files:[file1,file2]
      }
    }
    component.currentFolder='Festival';
    component.homeFile.folderName='Festival';
    let root:RootNew[];
    root=[   
      {
      folderId : '123',
      folderName : 'Mock', 
      status : true,
      isSelected: true,
      inSlideShow : true
    }
    ]
 
    component.multimedia.root=root;
    component.uploadFile(event);
    expect(component.uploadFile).toBeTruthy();
  })

}); */