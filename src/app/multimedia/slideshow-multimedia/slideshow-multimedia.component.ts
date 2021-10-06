import { Component, OnInit } from '@angular/core';
import { VgApiService } from '@videogular/ngx-videogular/core';
import { MultimediaFolderResponse, MultimediaFilesNew, SlideshowFiles } from 'src/app/model/general.model';
import { GeneralService } from 'src/app/service/general.service';
import { SlideshowService } from 'src/app/slideshow/slideshow.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-slideshow-multimedia',
  templateUrl: './slideshow-multimedia.component.html',
  styleUrls: ['./slideshow-multimedia.component.css']
})
export class SlideshowMultimediaComponent implements OnInit {
  
  currentItem: string;
  teamId : string;
  intervalID: any;  
  componentReady: boolean;
  counter: number = 0;
  interval: number = environment.slideshowInterval;
  slideshowFiles : SlideshowFiles[]=[];
  slideshowTempFiles : SlideshowFiles[]=[];

  constructor(public slideshowService: SlideshowService, private generalService : GeneralService) { 
    this.slideshowFiles = [];
    this.slideshowTempFiles = [];
    this.counter = 0;
  }
  async ngOnInit() {
    await this.updateComponent(); 
  }

   async updateComponent() {
     try{
    this.componentReady = false;
    this.slideshowTempFiles = [];
    this.slideshowFiles = [];
    this.counter = 0;
    this.teamId = JSON.parse(localStorage.getItem('TeamDetailsResponse')).powerboardResponse.team_id;
    const data = await this.generalService.getSlideshowFiles(this.teamId);
    this.slideshowTempFiles = data;
    if(this.slideshowTempFiles.length > 0){
     /*  this.slideshowFiles = this.slideshowFiles.filter(file =>this.isImage(file.fileURL) == true); */
    for(let file of this.slideshowTempFiles){
      if(this.isImage(file.fileURL)){
        this.slideshowFiles.push(file);
      }
    }
    for(let file of this.slideshowTempFiles){
      if(!this.isImage(file.fileURL)){
        this.slideshowFiles.push(file);
      }
    }
     console.log(this.slideshowFiles);
     this.slideshowControl();
    /* this.currentItem = this.slideshowFiles[this.counter].fileURL;
    this.counter++;
    this.automateSlideshow(); */
    }
    else{
      this.slideshowService.moveSlideshowNextComponent();
    }
    /* this.currentItem = this.slideshowFiles[this.currentIndex].fileURL; */
    /* this.processFiles(); */
    /* for(let folder of this.multimedia.root){
      if(folder.status == true){
        this.currentFolder = folder.folderName;
      }
    } */
    }
    catch(e){
      console.log(e.error.message);
    }
  } 
  
  isImage(url: string) {
    const images = ["jpg", "jpeg", "gif", "png"];
    const videos = ["mp4", "3gp", "ogg"];


    const tempextension = url.split(".");
    const  extension = tempextension[tempextension.length-1];
    console.log(extension);
    if (images.includes(extension)) {
      return true;
    } else if (videos.includes(extension)) {
      return false;
    }
  }

  ngOnDestroy() {
    if (this.intervalID) {
      clearInterval(this.intervalID);
    }
  }

  automateSlideshow(){
    this.intervalID = setInterval(()=> {
      console.log(this.counter);
      if(this.counter == 1 && this.slideshowFiles.length == 1){
        if (this.slideshowService.isSlideshowRunning) {
          this.slideshowService.moveSlideshowNextComponent();
        }
      }
      
      
      
      if(this.counter >= this.slideshowFiles.length && this.counter!= 1){
        /* setTimeout(() => { */
          if (this.slideshowService.isSlideshowRunning) {
            this.slideshowService.moveSlideshowNextComponent();
          }
      /*   }, this.interval); */
      }
      this.currentItem = this.slideshowFiles[this.counter].fileURL;
      this.counter++;
      console.log(this.counter);

       
          
    },this.interval);
    
  }

  public slideshowControl(){
    if(this.counter >= this.slideshowFiles.length){
      
        if (this.slideshowService.isSlideshowRunning) {
          this.slideshowService.moveSlideshowNextComponent();
        }
    }
    if(this.isImage(this.slideshowFiles[this.counter].fileURL)){
      this.currentItem = this.slideshowFiles[this.counter].fileURL;
      this.counter++;
      setTimeout(this.slideshowControl.bind(this), this.interval);
    }
    else{
      this.currentItem = this.slideshowFiles[this.counter].fileURL;
      this.counter++;
    }
  }
}
