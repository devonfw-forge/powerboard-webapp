import { Component, OnInit } from '@angular/core';
import { DeleteResponse } from 'src/app/config/model/config.model';
import { MultimediaFilesNew, MultimediaFolderResponse, RootNew, TeamDetailResponse } from 'src/app/shared/model/general.model';
import { GeneralService } from 'src/app/shared/services/general.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { SetupService } from '../../../services/setup.service';

@Component({
  selector: 'app-configure-multimedia',
  templateUrl: './configure-multimedia.component.html',
  styleUrls: ['./configure-multimedia.component.css'],
})
export class ConfigureMultimediaComponent implements OnInit {
  teamId: string;
  fileAndFolderIds : string[];
  currentFolder: string;
  checkStatus : boolean;
  deleteFiles_Folders : DeleteResponse = new DeleteResponse();
  newSubFolder : RootNew = new RootNew();
  multimedia: MultimediaFolderResponse = new MultimediaFolderResponse();
  multimediaFiles: MultimediaFilesNew[];
  homeFile:RootNew = new RootNew();
  isMasterSel: boolean = false;
  folderAddedInSlideshow: string[] = [];
  filesAddedInSlideshow: string[] = [];
  newFolderName: string = '';
  componentReady: boolean;
  tempPath: string;
  teamDetail: TeamDetailResponse = new TeamDetailResponse();
  
  constructor(
    public configureService: SetupService,
    private notifyService: NotificationService,
    private generalService: GeneralService
  ) {
    this.checkStatus = false;
  }

  ngOnInit(): void {
    this.configureService.viewSubFolder = false;
    this.checkStatus = false;
    this.updateComponent();
  }

  /**
   * get multimedia data of the team using team id from local storage
   * check files at root level if files found display in "home" folder
   * else display next folder containing files
   *
   */
  updateComponent() {
    this.homeFile.folderName = 'Home';
    this.homeFile.folderId ='';
    this.homeFile.inSlideShow = false;
    this.homeFile.isSelected = false;
    this.homeFile.status = false;
    
    console.log('update Component');
    this.componentReady = false;
    this.teamId = JSON.parse(
      localStorage.getItem('TeamDetailsResponse')
    ).powerboardResponse.team_id;
    this.multimedia = JSON.parse(
      localStorage.getItem('TeamDetailsResponse')
    ).powerboardResponse.multimedia;
    this.multimediaFiles  = this.multimedia.display;

    this.currentFolder = '';
    for(let folder of this.multimedia.root){
      if(folder.status){
        this.currentFolder = folder.folderName;
      }
    }
    if(this.currentFolder == ''){
      this.currentFolder = this.homeFile.folderName;
    }
    if(this.multimediaFiles.length>0){
      this.checkImagesAndVideos();
      this.checkHomeInslideShowStatus();
    } 
  }

  /**
   * iterate multimedia files if file is a video modify path 
   */
  checkImagesAndVideos(){
    if(this.multimediaFiles.length>0){
      for(let file of this.multimediaFiles){
        this.tempPath = file.urlName;
        console.log(file.urlName);
        let isImage = this.isImage(file.urlName);
        console.log(isImage);
        console.log(isImage);
        if (!isImage) {
          file.urlName = this.tempPath + '#t=5';
          file.isImage=false;
        } else {
          file.urlName = this.tempPath;
          file.isImage=true;
        }
      }
    }
  }
   
  /**
   * check if current folder is home
   * iterate all files in home folder, if all files are added in slideshow then 
   * make the slideshow status true for home folder
   * else status is false
   * 
   */
  checkHomeInslideShowStatus(){
    if(this.currentFolder == this.homeFile.folderName){
      this.checkStatus = true;
      for(let file of this.multimediaFiles){
        if(!file.inSlideShow){
          this.checkStatus = false;
        }
      }
      if(this.checkStatus){
        this.homeFile.inSlideShow = true;
      }
      else{
        this.homeFile.inSlideShow = false;
      }
      this.checkStatus = false;
    }
  }

  /**
   * Display all root files in home folder
   */
  showHomeFiles(){
    this.deselectAll();
    this.multimediaFiles = [];
    this.checkStatus = false;
    for(let folder of this.multimedia.root){
      if(folder.status){
       this.checkStatus = true;
      }
    }
    if(this.checkStatus){
      this.multimediaFiles  = [];
    }
    else{
      this.multimediaFiles = this.multimedia.display;
    }
    this.currentFolder = 'Home';
    if(this.multimediaFiles.length>0){
      this.checkImagesAndVideos();
      this.checkHomeInslideShowStatus();
    }
    
  }

  /**
   * Get all files of a folder by calling general service using teamId and folderId
   *
   */
  async getFilesFromFolder(folderId:string,folderName:string){
    this.deselectAll();
    console.log(folderName);
    try{
      const data = await this.generalService.getAllFilesFromFolder(this.teamId, folderId);
      this.multimediaFiles = data;
      this.currentFolder = folderName;
      this.checkImagesAndVideos();
    }
    catch(e){
      console.log(e.error.message);
    }
  }

/**
 * If url is of an image it returns true
 * else if url is of a video then return false
 *  
 */
  isImage(url: string) {
    const images = ['jpg', 'jpeg', 'gif', 'png'];
    const videos = ['mp4', '3gp', 'ogg'];

    const tempextension = url.split(".");
    const  extension = tempextension[tempextension.length-1];
    if (images.includes(extension)) {
      return true;
    } else if (videos.includes(extension)) {
      return false;
    }
  }


/**
 * If current folder is home folder add file in root level
 * if current folder is sub folder, add file in respective current folder
 * if file added successfully, update files and display success message
 * else if error while adding files display error message
 *  
 */
  async uploadFile(event) { 
     try {
      const file = (event.target as HTMLInputElement).files[0];
      if(this.currentFolder == this.homeFile.folderName){
        const data = await this.configureService.addFilesToTeam(this.teamId, file);
        this.updateUploadInHome(data);
      }
      else{
        let folderId = '';
        for(let folder of this.multimedia.root){
          if(folder.folderName == this.currentFolder){
            folderId = folder.folderId;
            break;
          }
        }
        const data = await this.configureService.addFileInSubFolder(folderId, this.teamId,file);
        this.updateUploadInSubFolder(data,folderId);
      }   
      this.updateComponent();
      this.notifyService.showSuccess('', 'File added successfully');
    } catch (e) {
      console.log(e.error.message);
      this.notifyService.showError('', e.error.message);
    }
  }

  /**
   * If file added in home folder then update multimedia files and local storage
   * 
   */
  updateUploadInHome(data){
    let newFile = {
      id: data.id,
      urlName: data.fileName,
      isSelected : false,
      inSlideShow : false,
      isImage : this.isImage(data.fileName)
    };
    this.checkStatus = false;
    for(let folder of this.multimedia.root){
      if(folder.status){
        this.checkStatus = true;
      }
    }
    if(this.checkStatus){
      this.multimedia.display = [];
      for(let folder of this.multimedia.root){
        folder.status = false;
      }
    }
    this.multimedia.display.push(newFile);
    this.multimediaFiles = this.multimedia.display;
    this.checkImagesAndVideos();
    this.checkHomeInslideShowStatus();
    
    this.updateLocalStorage();
  }

  /**
   * If file added in sub folder then update multimedia files and local storage
   */
  updateUploadInSubFolder(data,folderId){
    let newFile = {
      id : data.id,
      urlName : data.fileName,
      isSelected : false,
      inSlideShow : false,
      isImage : this.isImage(data.fileName)
    }
    for(let folder of this.multimedia.root){
      if(folder.folderId == folderId){
        if(folder.status){
          this.multimedia.display.push(newFile);
          this.updateLocalStorage();
          this.updateComponent();
        }
        else{
          this.tempPath = newFile.urlName;
          if(newFile.isImage){
            newFile.urlName = this.tempPath;
          } else {
            const video_thumbnail = this.tempPath + '#t=5';
            newFile.urlName = video_thumbnail;
          }
          this.multimediaFiles.push(newFile);
        }
        break;
      }
    }
  }

  /**
   * Toggle between select and deselect check box
   */
  SelectAndDeselectAll(){
    if(this.isMasterSel){
      this.deselectAll()
    }
    else {
      this.selectAll();
    }  
  }
  /**
   * If current folder is home folder then it selects all the files and folders including home folder
   * If current folder is sub folder, it selects all the files in that folder 
   */
  selectAll(){
    this.isMasterSel = true;
      if(this.currentFolder == this.homeFile.folderName){
        this.homeFile.isSelected = true;
        for(let folder of this.multimedia.root){
          folder.isSelected= true;
        }
        for(let file of this.multimedia.display){
          file.isSelected = true;
        }
      }
      for(let file of this.multimediaFiles){
        file.isSelected = true;
      }
  }
  /**
   * All checked boxed are unchecked
   */
  deselectAll(){
    this.isMasterSel = false;
      this.homeFile.isSelected = false;
      for(let folder of this.multimedia.root){
        folder.isSelected= false;
      }
      for(let file of this.multimedia.display){
        file.isSelected = false;
      }
      for(let file of this.multimediaFiles){
        file.isSelected = false;
      }
  }

  /**
   * Toggle between select and deselect for a folder of a given index 
   * If current folder is not home folder, then deselect all files and folders
   */
  checkRootSelection(i:number){
    if(this.multimedia.root[i].isSelected){
      this.isMasterSel = false;
      this.multimedia.root[i].isSelected = false;
      
    }
    else{
      this.multimedia.root[i].isSelected = true;
      this.checkMasterForRootSelection();
    }
    if(this.currentFolder != this.homeFile.folderName){
      for(let file of this.multimediaFiles){
        file.isSelected = false;
      }
      for(let file of this.multimedia.display){
        file.isSelected = false;
      }
    }
    
  }

  /**
   * Select all checkbox is checked, if all the folders are selected
   * else uncheck, if any folder is not selected 
   */
  checkMasterForRootSelection(){
    this.checkStatus = true;
      for(let folder of this.multimedia.root){
        if(!folder.isSelected){
          this.checkStatus = false;
        }
      }
      if(!this.homeFile.isSelected){
        this.checkStatus = false;
      }
      if(this.checkStatus){
        this.isMasterSel = true;
      }
      else{
        this.isMasterSel = false;
      }
  }

  /**
   * Uncheck home folder, select all chckbox, all files
   */
  deSelectFilesIfHomeSelected(){
    this.isMasterSel = false;
    this.homeFile.isSelected = false;
    for(let file of this.multimediaFiles){
      file.isSelected = false;
    }
    for(let file of this.multimedia.display){
      file.isSelected = false;
    }
  }
  /**
   * Check home folder checkbox
   * If current folder is home folder, select all multimedia files
   * else deselect all multimedia files
   */
  selectFilesHomeSelectionTurnTrue(){
    this.homeFile.isSelected = true;
    if(this.currentFolder == this.homeFile.folderName){
      if(this.multimediaFiles.length>0){
        for(let file of this.multimediaFiles){
          file.isSelected = true;
        }
        for(let file of this.multimedia.display){
          file.isSelected = true;
        }
      }
    }
    else{
      for(let file of this.multimediaFiles){
        file.isSelected = false;
      }
    }
  }

  /**
   * If home folder is selcted, deselect all files and home folder
   * else select all home files and folder
   */
  checkHomeIsSelected(){
    if(this.homeFile.isSelected){
     this.deSelectFilesIfHomeSelected();
    }
    else{
      this.selectFilesHomeSelectionTurnTrue();
      this.checkMasterForRootSelection();
    }
  }

  /**
   * Check multimedia files, if all files are selected, then check status is true
   * If check status is true, select home folder and check all folders
   *    If all folders are selected then select all checkbox is true
   *      else, select all checkbox is false
   * else,home folder checkbox, select all checkbox is false
   */
  checkFilesSelectionIfCurrentFolderIsHome(){
    this.checkStatus = true;
    for(let file of this.multimediaFiles){
      if(!file.isSelected){
        this.checkStatus = false;
      }
    }
    if(this.checkStatus){
      this.homeFile.isSelected = true;
      for(let folder of this.multimedia.root){
        if(!folder.isSelected){
          this.checkStatus = false;
        }
      }
      if(this.checkStatus){
        this.isMasterSel = true;
      }
      else{
        this.isMasterSel = false;
      }
    }
    else{
      this.homeFile.isSelected = false;
      this.isMasterSel = false;
    }
  }
  /**
   * Select multimedia file checkbox of a given index, set home folder to false
   * If current folder is home folder, check all files
   * else if all fles are selected , check select all checkbox
   *    else uncheck select all checkbox
   */
  checkFilesSelectionIfHomeIsNotCurrentFolder(i:number){
    this.multimediaFiles[i].isSelected = true;
      this.homeFile.isSelected = false;
      
      if(this.currentFolder == this.homeFile.folderName){
       this.checkFilesSelectionIfCurrentFolderIsHome();
      }
      else {
        this.checkStatus = true;
        for(let file of this.multimediaFiles){
          if(!file.isSelected){
            this.checkStatus = false;
          }
        }
        if(this.checkStatus){
          this.isMasterSel = true;
        }
        else{
          this.isMasterSel = false;
        }
      }
  }
  /**
   * If current folder is not home folder, deselct all folders 
   * If multimedia file of given index is selected, 
   * deslect given multimedia file index checkbox, selct all checkbox and home folder
   */
  checkFilesSelection(i:number){
    if(this.currentFolder!== this.homeFile.folderName){
      for(let folder of this.multimedia.root){
        folder.isSelected = false;
      }
      this.homeFile.isSelected = false;
    }
    if(this.multimediaFiles[i].isSelected){
      this.multimediaFiles[i].isSelected = false;
      this.isMasterSel = false;
      if(this.currentFolder == this.homeFile.folderName){
        this.homeFile.isSelected = false;
      }
    }
    else {
      this.checkFilesSelectionIfHomeIsNotCurrentFolder(i);
    }
  }

/**
 * Push selected file ids and folder ids into delete files object
 */
  getDeleteIdsIfHomeIsSelected(){
    console.log("if home is selected");
      this.deleteFiles_Folders.filesId = [];
      this.deleteFiles_Folders.foldersId = [];
      this.deleteFiles_Folders.subFolderId = null;

      this.checkStatus = true;
      for(let folder of this.multimedia.root){
        if(folder.isSelected){
          this.deleteFiles_Folders.foldersId.push(folder.folderId);
        }
        if(folder.status){
          this.checkStatus = false;
        }
      }
      if(this.checkStatus){
        if(this.multimedia.display.length>0){
          for(let file of this.multimedia.display){
            this.deleteFiles_Folders.filesId.push(file.id);
            file.isSelected = true;
          }
        }
      }
  }

  /**
   * Push selected file ids and folder ids into delete files object
   */
  getDeleteIdsIfHomeIsCurrentFolder(){
    console.log("if current folder is home");
        this.deleteFiles_Folders.filesId = [];
        this.deleteFiles_Folders.foldersId = [];
        this.deleteFiles_Folders.subFolderId = null;

        for(let folder of this.multimedia.root){
          if(folder.isSelected){
            this.deleteFiles_Folders.foldersId.push(folder.folderId);
          }
        }
        for(let file of this.multimediaFiles){
          if(file.isSelected){
            this.deleteFiles_Folders.filesId.push(file.id);
          }
        }
  }
/**
 * 
 */
  getDeleteIdsIfHomeIsNotCurrentFolder(){
    this.deleteFiles_Folders.filesId = [];
        this.deleteFiles_Folders.foldersId = [];
        this.deleteFiles_Folders.subFolderId = null;

        this.checkStatus = false;
        for(let folder of this.multimedia.root){
          if(folder.isSelected){
            this.checkStatus = true;
          }
        }
        if(this.checkStatus){
          console.log("if only folders")
          for(let folder of this.multimedia.root){
            if(folder.isSelected){
              this.deleteFiles_Folders.foldersId.push(folder.folderId);
            }
          }
        }
        else{
          console.log("if only files with subfolder Id");
          this.getDeleteIdsFilesFromSubFolder();
        }
  }
  getDeleteIdsFilesFromSubFolder(){
    for(let file of this.multimediaFiles){
      if(file.isSelected){
        this.deleteFiles_Folders.filesId.push(file.id);
      }
      for(let folder of this.multimedia.root){
        if(this.currentFolder == folder.folderName){
          this.deleteFiles_Folders.subFolderId = folder.folderId;
        }
      }
    }
  }
  getDeleteIds(){
    this.deleteFiles_Folders.filesId = [];
    this.deleteFiles_Folders.foldersId = [];
    this.deleteFiles_Folders.subFolderId = null;
    if(this.homeFile.isSelected){ //if home is selected
      this.getDeleteIdsIfHomeIsSelected();
      
    }else{ //if home is not selected
      console.log("if home is not selected");
      this.deleteFiles_Folders.filesId = [];
      this.deleteFiles_Folders.foldersId = [];
      this.deleteFiles_Folders.subFolderId = null;

      if(this.currentFolder == this.homeFile.folderName){ // if home is current folder
        this.getDeleteIdsIfHomeIsCurrentFolder();
      }
      else{ // if home is not selected
        console.log("if home is not current folder");
        this.getDeleteIdsIfHomeIsNotCurrentFolder();
      }
    }

    if(this.deleteFiles_Folders.subFolderId !=null){
      if(this.deleteFiles_Folders.filesId.length<1){
        this.deleteFiles_Folders.subFolderId = null;
      }
    }
    console.log(this.deleteFiles_Folders);
  }

  async deleteFilesAndFolders() {
    this.getDeleteIds();
    try{
      await this.configureService.deleteFilesAndFolders(this.teamId, this.deleteFiles_Folders);
      this.notifyService.showSuccess("", "File deleted successfully"); 
      this.removeIds();
      this.deselectAll();
      if(this.deleteFiles_Folders.foldersId.length > 0){
        this.updateComponent();
      }
    }
    catch(e){
      console.log(e.error.message);
     this.notifyService.showError("", e.error.message); 
    } 
   
    console.log('delete');
  }
 removeIds(){
  for(let file of this.deleteFiles_Folders.filesId){
    this.multimedia.display = this. multimedia.display.filter(displayFile => displayFile.id!= file);
  }
  for(let file of this.deleteFiles_Folders.filesId){
    this.multimediaFiles = this. multimediaFiles.filter(multifile => multifile.id!= file);
  }
  for(let folder of this.deleteFiles_Folders.foldersId){
    this.multimedia.root = this. multimedia.root.filter(rootFolder => rootFolder.folderId!= folder);
  }
  this.updateLocalStorage();
 }
 updateLocalStorage(){
  this.teamDetail = JSON.parse(localStorage.getItem('TeamDetailsResponse'));
  this.teamDetail.powerboardResponse.multimedia = this.multimedia;
  localStorage.setItem('TeamDetailsResponse', JSON.stringify(this.teamDetail));
 }
  
  close() {
    this.newFolderName = '';
  }

  async addFolder() {
    try{
      this.newSubFolder = new RootNew();
      const data = await this.configureService.addFolderToTeam(this.teamId, this.newFolderName);
      console.log(data);
      this.newSubFolder.folderId = data.id;
      this.newSubFolder.folderName = data.albumName;
      this.newSubFolder.status = false;
      this.newSubFolder.isSelected = false;
      this.multimedia.root.push(this.newSubFolder);
      this.multimedia.root.sort(function(a, b) {
        return a.folderName.localeCompare(b.folderName);
     });
     this.updateLocalStorage();
     this.newFolderName = '';
     if(this.isMasterSel){
       this.selectAll();
     }
     else{
       this.deselectAll();
     }
    }
    catch(e){
      console.log(e.error.message);
    }
    console.log(this.newFolderName);
  }

  
 async addToSlideShow(){
  this.checkSlideshowFilesAndFolders();
  try{
  await this.configureService.addToSlideshow(this.teamId, this.fileAndFolderIds);
   this.notifyService.showSuccess("", "Files & folders added to slide show successfully"); 
    for(let file of this.multimedia.display){
      if(file.isSelected){
       file.inSlideShow = true;
       file.isSelected = false;
      }
      else{
        file.inSlideShow = false;
      }
    }
    for(let folder of this.multimedia.root){
      if(folder.isSelected){
        folder.inSlideShow = true;
        folder.isSelected = false;
      }
      else{
        folder.inSlideShow = false;
      }
    }
    if(this.homeFile.isSelected){
      this.homeFile.inSlideShow = true;
      this.homeFile.isSelected = false;
    }
    else{
      this.homeFile.inSlideShow = false;
    }
    this.isMasterSel = false;
    this.updateLocalStorage();
  }
  catch(e){
    console.log(e.error.message);
    this.notifyService.showError("", e.error.message); 
  } 
 
}


public checkSlideshowFilesAndFolders(){
  this.fileAndFolderIds = [];
  
  if(this.homeFile.isSelected){
   this.checkSlideshowFilesIfHomeSelected()
  }
  else{
    this.checkSlideshowFilesIfHomeIsCurrentAndNotSelected()
  }
  for(let folder of this.multimedia.root){
    if(folder.isSelected){
      this.fileAndFolderIds.push(folder.folderId);
    }
  }
}
  checkSlideshowFilesIfHomeSelected(){
    this.checkStatus = true;
    for(let file of this.multimedia.root){
      if(file.status){
        this.checkStatus = false;
      }
    }
    if(this.checkStatus){
      for(let file of this.multimedia.display){
          this.fileAndFolderIds.push(file.id);
      }
    }
  }
  checkSlideshowFilesIfHomeIsCurrentAndNotSelected(){
    if(this.currentFolder === this.homeFile.folderName){
      for(let file of this.multimediaFiles){
        if(file.isSelected){
          this.fileAndFolderIds.push(file.id);
        }
      }
    }
  }
}
