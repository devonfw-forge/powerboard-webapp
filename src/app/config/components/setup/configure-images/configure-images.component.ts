import { Component, OnInit } from '@angular/core';
import {
  FileSystemDirectoryEntry,
  FileSystemFileEntry,
  NgxFileDropEntry,
} from 'ngx-file-drop';
import { ImageResponse, TeamDetailResponse } from 'src/app/shared/model/general.model';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { TeamMemberDetailsResponse } from '../../../model/config.model';
import { ConfigService } from '../../../services/config.service';
import { SetupService } from '../../../services/setup.service';

@Component({
  selector: 'app-configure-images',
  templateUrl: './configure-images.component.html',
  styleUrls: ['./configure-images.component.css'],
})
export class ConfigureImagesComponent implements OnInit {
  public files: NgxFileDropEntry[] = [];
  galleryImages: ImageResponse[];
  componentReady: boolean;
  galleryPath: ImageResponse[];
  tempPath: string;
  teamId: string;

  constructor(
    private configService: ConfigService,
    private notifyService: NotificationService,
    private setupService: SetupService
  ) {
    this.galleryImages = [];
    this.galleryPath = [];
    this.componentReady = false;
  }

  ngOnInit(): void {
    // this.updateComponent();
  }
  ngAfterViewInit() {}

  //   updateComponent() {
  //     this.componentReady = false;
  //     this.teamId = JSON.parse(localStorage.getItem('TeamDetailsResponse')).powerboardResponse.team_id;
  //     this.galleryImages = [];

  //     console.log('hii');
  //     this.galleryPath = JSON.parse(localStorage.getItem('TeamDetailsResponse')).powerboardResponse.images;
  //     console.log(this.galleryPath);

  //     for (let image of this.galleryPath) {
  //       this.tempPath =  'assets/uploads/multimedia/' + this.teamId + '/images/' + image.ImagePath;

  //       this.galleryImages.push({
  //         ImageId: image.ImageId,
  //         ImagePath: this.tempPath,
  //       });
  //     }

  //     this.componentReady = true;

  //   }

  //   public fileOver(event){
  //     console.log(event);
  //   }

  //   public fileLeave(event){
  //     console.log(event);
  //   }

  //   async dropped(files: NgxFileDropEntry[]) {
  //     /* let teamId = this._loginService.getUserStorage().loginResponse.team_id; */

  //     this.files = files;
  //     for (const droppedFile of files) {

  //       // Is it a file?
  //       if (droppedFile.fileEntry.isFile) {
  //         const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
  //         fileEntry.file(async (file: File) => {
  //           try{
  //             const data = await this.setupService.addImageToTeam(this.teamId, file);
  //             this.notifyService.showSuccess("Images added successfully !!", "");
  //             console.log(data);

  //           }
  //           catch(e){
  //             console.log(e.error.message);
  //             this.notifyService.showError("", e.error.message);

  //           }
  //         });
  //       }
  //       else {
  //         // It was a directory (empty directories are added, otherwise only files)
  //         const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
  //         console.log(droppedFile.relativePath, fileEntry);
  //       }
  //     }
  //   }

  // async deleteImage(imageId : string){
  //   try{
  //     const data = await this.setupService.deleteImage(imageId);
  //     console.log(data);
  //     this.configService.getTeamDetails();
  //         for(let image of this.configService.teamDetails.powerboardResponse.images){
  //           if(image.ImageId == imageId){
  //             this.configService.teamDetails.powerboardResponse.images = this.configService.teamDetails.powerboardResponse.images.filter(item => item !== image);
  //           }
  //         }
  //         this.configService.setTeamDetails();
  //         this.updateComponent();

  //   }
  //   catch(e){
  //     console.log(e);

  //   }

  // }
}
