import { Component, OnInit } from '@angular/core';
import {
  FileSystemDirectoryEntry,
  FileSystemFileEntry,
  NgxFileDropEntry,
} from 'ngx-file-drop';
import { VideoResponse } from 'src/app/shared/model/general.model';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { ConfigService } from '../../../services/config.service';
import { SetupService } from '../../../services/setup.service';

@Component({
  selector: 'app-configure-videos',
  templateUrl: './configure-videos.component.html',
  styleUrls: ['./configure-videos.component.css'],
})
export class ConfigureVideosComponent implements OnInit {
  public files: NgxFileDropEntry[] = [];

  componentReady: boolean;
  videoPlaylist: VideoResponse[] = [];
  tempPath: string;
  thumbnailData: string[];
  tempThumbnailPath: string;
  teamId: string;

  constructor(
    private configService: ConfigService,
    private notifyService: NotificationService,
    private setupService: SetupService
  ) {
    this.thumbnailData = [];
  }

  ngOnInit(): void {
    //this.updateComponent();
  }
  ngAfterViewInit() {}
  // public updateComponent(){
  //   this.videoPlaylist = JSON.parse(localStorage.getItem('TeamDetailsResponse')).powerboardResponse.videos;
  //   this.teamId = JSON.parse(localStorage.getItem('TeamDetailsResponse')).powerboardResponse.team_id;
  //     for (let video of this.videoPlaylist) {
  //       this.tempPath =  'assets/uploads/multimedia/' + this.teamId + '/videos/' + video.videoPath;

  //       this.tempThumbnailPath = this.tempPath
  //         .replace('videos', 'thumbnails')
  //         .replace('.mp4', '.png');
  //       this.thumbnailData.push(this.tempThumbnailPath);
  //     }
  // console.log(this.thumbnailData);
  // }

  //   public fileOver(event){
  //     console.log(event);
  //   }

  //   public fileLeave(event){
  //     console.log(event);
  //   }

  //   public dropped(files: NgxFileDropEntry[]) {
  //     /* let teamId = this._loginService.getUserStorage().loginResponse.team_id; */

  //     this.files = files;
  //     for (const droppedFile of files) {

  //       // Is it a file?
  //       if (droppedFile.fileEntry.isFile) {
  //         const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
  //         fileEntry.file(async (file: File) => {

  //           try{
  //             const data = await this.setupService.addVideosToTeam(this.teamId, file);
  //             this.notifyService.showSuccess("Video added successfully !!", "");
  //             console.log(data);

  //           }
  //           catch(e){
  //             console.log(e.error.message);
  //             this.notifyService.showError("", e.error.message);

  //           }
  //         });
  //       } else {
  //         // It was a directory (empty directories are added, otherwise only files)
  //         const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
  //         console.log(droppedFile.relativePath, fileEntry);
  //       }
  //     }
  //   }

  // async deleteVideo(index:number){
  //   try{
  //     const data = await this.setupService.deleteVideos(this.videoPlaylist[index].videoId);
  //     console.log(this.videoPlaylist[index].videoId);
  //     console.log(data);
  //     this.configService.getTeamDetails();
  //         for(let video of this.configService.teamDetails.powerboardResponse.videos){
  //           if(video.videoId == this.videoPlaylist[index].videoId){
  //             this.configService.teamDetails.powerboardResponse.videos = this.configService.teamDetails.powerboardResponse.videos.filter(item => item !== video);
  //           }
  //         }
  //         this.videoPlaylist = [];
  //         this.thumbnailData = [];
  //         this.configService.setTeamDetails();
  //         this.updateComponent();

  //   }
  //   catch(e){
  //     console.log(e);

  //   }

  // }
}
