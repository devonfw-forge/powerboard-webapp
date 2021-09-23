import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MultimediaFilesNew } from 'src/app/model/general.model';
import { GeneralService } from 'src/app/service/general.service';
import { NotificationService } from 'src/app/service/notification.service';
import { MultimediaFilesChecked } from 'src/app/setting/model/setting.model';
import { ConfigureMultimediaServiceService } from '../configure-multimedia-service.service';

@Component({
  selector: 'app-configure-multimedia-subfolder',
  templateUrl: './configure-multimedia-subfolder.component.html',
  styleUrls: ['./configure-multimedia-subfolder.component.css']
})
export class ConfigureMultimediaSubfolderComponent implements OnInit {
  teamId: string;
  folderId : string;
  selectAll : boolean;
  thumbnailData: string[];
  tempPath: string;
  multimediaFiles: MultimediaFilesNew[];
  thumbnailIsImage: boolean[] = [];
  checkedFileIds : string[];
  allFiles : MultimediaFilesChecked[] = [];
  constructor(public configureService: ConfigureMultimediaServiceService, private notifyService : NotificationService, private generalService: GeneralService) { 
    this.checkedFileIds = [];
    this.selectAll = false;
  }

  ngOnInit(): void {
    this.getDetails();
    this.teamId = JSON.parse(localStorage.getItem('TeamDetailsResponse')).powerboardResponse.team_id;
    this.getFilesFromFolder();
  }

  getDetails(){
    console.log("I am here");
    this.allFiles.push({
      fileId : 'id1',
      fileName : 'File 1',
      isChecked : false
    });
    this.allFiles.push({
      fileId : 'id2',
      fileName : 'File 2',
      isChecked : false
    });
    this.allFiles.push({
      fileId : 'id3',
      fileName : 'File 3',
      isChecked : false
    });
    this.allFiles.push({
      fileId : 'id4',
      fileName : 'File 4',
      isChecked : false
    });
    console.log(this.configureService.selectedSubFolderId);
  }

  back(){
    this.configureService.viewSubFolder=false;
  }

  async uploadFile(event) {
    this.folderId = this.configureService.selectedSubFolderId;
    const file = (event.target as HTMLInputElement).files[0];
    try{
     const data = await this.configureService.addFileInSubFolder(this.folderId, this.teamId,file);
     console.log(data);
     let newFile = {
       fileId : data.id,
       fileName : data.fileName
     }
     /* this.multimediagallery.push(newFile);
     this.teamDetail = JSON.parse(localStorage.getItem('TeamDetailsResponse'));
     this.teamDetail.powerboardResponse.multimedia = this.multimediagallery;
     localStorage.setItem('TeamDetailsResponse', JSON.stringify(this.teamDetail));
     this.updateComponent(); */
     this.notifyService.showSuccess("","File Added Successfully");
    }
    catch(e){
      console.log(e.error.message);
      this.notifyService.showError("", e.error.message);
    }
  }
    public itemsChecked(e,id){
      if(e.target.checked){
        this.addTOCheckedArray(id);
      }
      else{
        document.getElementsByName('checkAll')[0].removeAttribute('checked');
        this.removeFromCheckedArray(id);
      }
      console.log(this.checkedFileIds);
    }
 public addTOCheckedArray(id){
  this.checkedFileIds.push(id);
 }
 public removeFromCheckedArray(id){
  this.checkedFileIds = this.checkedFileIds.filter(Fileid => Fileid !== id );
 }

 public deleteCheckedFiles(){
   this.checkArray();
  /* try{
    this.configureService.deleteFilesInSubFolder(this.checkedFileIds);
    this.notifyService.showSuccess("", "File deleted Successfully");
  }
  catch(e){
    console.log(e.error.message);
    this.notifyService.showError("", e.error.message);
  } */
 
 }
public  selectAllItems(){
  if(!this.selectAll){
    
    for(let file of this.allFiles){
      file.isChecked = true;
    }

  }
  else{
    for(let file of this.allFiles){
      file.isChecked = false;
    }
  }
  
}

public checkArray(){
  
  this.checkedFileIds = [];
  for(let file of this.allFiles){
    if(file.isChecked == true){
      this.checkedFileIds.push(file.fileId);
    }
  }
  console.log(this.checkedFileIds);
}
public checkSelectAllCheckbox(){

}

async getFilesFromFolder(){
    
  try{
    const data = await this.generalService.getAllFilesFromFolder(this.teamId, this.configureService.selectedSubFolderId);
    this.multimediaFiles = data;
    this.thumbnailData = [];
    this.thumbnailIsImage = [];
    this.processFiles();

  }
  catch(e){
    console.log(e.error.message);
  }
}

processFiles(){
  
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
}

isImage(url: string) {
  const images = ["jpg", "jpeg", "gif", "png"];
  const videos = ["mp4", "3gp", "ogg"];


  const extension = url.split(".")[1]
  console.log(extension);
  if (images.includes(extension)) {
    return true;
  } else if (videos.includes(extension)) {
    return false;
  }
}
}
