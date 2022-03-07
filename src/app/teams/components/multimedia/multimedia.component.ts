import { ElementRef, ViewChild, Component, OnInit  } from '@angular/core';
import { VgApiService } from '@videogular/ngx-videogular/core';
import { MultimediaFilesNew, MultimediaFolderResponse } from 'src/app/shared/model/general.model';
import { GeneralService } from 'src/app/shared/services/general.service';
import { UrlPathConstants } from 'src/app/UrlPaths';

@Component({
  selector: 'app-multimedia',
  templateUrl: './multimedia.component.html',
  styleUrls: ['./multimedia.component.css'],
})
export class MultimediaComponent implements OnInit {
  @ViewChild('widgetsContent') widgetsContent: ElementRef;
    currentIndex = 0;
    currentItem: string;
    api: VgApiService;
    thumbnailData: string[];
    checkStatus :  boolean;
    thumbnailIsImage: boolean[] = [];
    intervalID: any;
    teamId: string;
    realItem: string;
    currentFolder : string;
    multimedia: MultimediaFolderResponse = new MultimediaFolderResponse();
    multimediaFiles: MultimediaFilesNew[];
    componentReady: boolean;
    tempPath: string;
    is_image: boolean = true;
    is_video: boolean = false;
    counter: number = 0;
    interval: number = UrlPathConstants.slideshowInterval;
  
    constructor(public generalService : GeneralService) { 
      this.thumbnailData = [];
      this.multimediaFiles = [];
      this.currentFolder = '';
      this.currentIndex = 0;
      this.multimedia = new MultimediaFolderResponse();
    
    }
    ngOnInit() {
      this.updateComponent(); 
    }
  /**
   * Get all Multimedia files using teamId from local storage
   * Segregate files and folders
   */
     updateComponent() {
      this.componentReady = false;
      this.currentFolder = '';
      this.teamId = JSON.parse(localStorage.getItem('TeamDetailsResponse')).powerboardResponse.team_id;
      this.multimedia = JSON.parse(localStorage.getItem('TeamDetailsResponse')).powerboardResponse.multimedia;
      this.multimediaFiles  = this.multimedia.display;
      this.currentItem = this.multimediaFiles[this.currentIndex].urlName;
     
      for(let folder of this.multimedia.root){
        if(folder.status){
          this.currentFolder = folder.folderName;
        }
      }
      if(this.currentFolder == ''){
        this.currentFolder = 'Home';
      }
      this.processFiles();
    } 

    /**
     * Check multimedia folders status
     * If atleast one folder status is true, set home files is empty
     * else all multimedia files are home files
     */
    showHomeFiles(){
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
        this.multimediaFiles  = [];
        this.multimediaFiles = this.multimedia.display;
      }
      this.currentFolder = 'Home';
      if(this.multimediaFiles.length > 0){
        this.processFiles();
      }
      
    }

    /**
     * Get files of a particular folder using folder Id and folder name 
     */
    async getFilesFromFolder(folderId:string,folderName:string){
      
      console.log(folderName);
      try{
        const data = await this.generalService.getAllFilesFromFolder(this.teamId, folderId);
        this.multimediaFiles = data;
        this.currentFolder = folderName;
        this.thumbnailData = [];
        this.thumbnailIsImage = [];
        this.currentIndex = 0;
        this.currentItem = this.multimediaFiles[this.currentIndex].urlName;
        this.processFiles();
    
      }
      catch(e){
        console.log(e.error.message);
      }
    }
  
    

    processFiles(){
    this.thumbnailData = [];
    this.thumbnailIsImage = [];
        for (let file of this.multimediaFiles) {
           this.tempPath = file.urlName; 
          const isImage = this.isImage(file.urlName);
          if (!isImage) {
            const video_thumbnail = this.tempPath + '#t=5';
            this.thumbnailData.push(video_thumbnail);
            this.thumbnailIsImage.push(isImage);
          }
          else {
            this.thumbnailData.push(this.tempPath);
            this.thumbnailIsImage.push(isImage);
          }
        }
      this.onClickPlaylistItem(this.thumbnailData[0], 0);
    }
  
  
    /**
     * If item is image, display image
     * else display actual video url
     *  
     */
    onClickPlaylistItem(item: string, index: number) {
  
      if (this.thumbnailIsImage[index]) {
        this.is_video = false;
  
        this.is_image = true;
        this.realItem = this.thumbnailData[index];
  
      }
      else {
        this.is_video = true;
        this.is_image = false;
        this.realItem = this.thumbnailData[index].split('#')[0];
      }
  
      this.currentIndex = index;
      this.currentItem = item;
  
  
    }
  
    /**
     * If url is of image, return true
     * if url is of video, return false
     * 
     */
    isImage(url: string) {
      const images = ["jpg", "jpeg", "gif", "png"];
      const videos = ["mp4", "3gp", "ogg"];
  
  
      const tempextension = url.split(".");
      const  extension = tempextension[tempextension.length-1];
      if (images.includes(extension)) {
        return true;
      } else if (videos.includes(extension)) {
        return false;
      }
    }
  

    
    onPlayerReady(api: VgApiService) {
      console.log("api value");
      console.log(api);
      this.api = api;
  
      if (this.componentReady) {
        this.api.volume = 0;
      }
  
  
    }
  /**
   * toggle between play and pause for a video
   */
    onTap() {
      if (this.api.state === 'playing') {
        this.api.pause();
  
      } else {
        this.api.play();
      }
    }
  
    toggleFullScreen() {
      this.api.fsAPI.toggleFullscreen();
    }
  
    /**
     * Move to the previous multimedia item in the list
     */
    previousItem() {
      console.log("previous");
      this.counter = this.counter - 1;
      console.log(this.counter + "-> previous");
      this.onClickPlaylistItem(this.thumbnailData[this.currentIndex - 1], this.currentIndex - 1);
  
    }
    /**
     * Move to the next multimedia item in the list
     */
    nextItem() {
      console.log("Next");
      this.counter = this.counter + 1;
      console.log(this.counter + "-> next");
      this.onClickPlaylistItem(this.thumbnailData[this.currentIndex + 1], this.currentIndex + 1);
    }
  
    ngOnDestroy() {
      if (this.intervalID) {
        window.clearInterval(this.intervalID);
      }
    }
  
    scrollLeft(){
      this.widgetsContent.nativeElement.scrollLeft -= 150;
    }
  
    scrollRight(){
      this.widgetsContent.nativeElement.scrollLeft += 150;
    }
  
  /**
   * Get all multimedia files froma team using team Id
   */
    async seeAll(){
      try{
        const data = await this.generalService.getAllFilesFromTeam(this.teamId);
        this.multimediaFiles = data;
        this.currentFolder = "seeAll";
        this.thumbnailData = [];
        this.thumbnailIsImage = [];
        this.currentIndex = 0;
        this.currentItem = this.multimediaFiles[this.currentIndex].urlName;
        this.processFiles();
    
      }
      catch(e){
        console.log(e.error.message);
      }
    }
}
