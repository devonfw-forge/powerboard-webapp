import { Component, OnInit } from '@angular/core';
import { Multimedia, MultimediaFolderResponse, TeamDetailResponse } from 'src/app/model/general.model';
import { SetupService } from '../service/setup.service';
import { environment } from '../../../../environments/environment';
import { NotificationService } from 'src/app/service/notification.service';
import { Router } from '@angular/router';
import { ConfigureMultimediaServiceService } from './configure-multimedia-service.service';

@Component({
  selector: 'app-configure-multimedia',
  templateUrl: './configure-multimedia.component.html',
  styleUrls: ['./configure-multimedia.component.css'],
})
export class ConfigureMultimediaComponent implements OnInit {
  teamId: string;
  multimedia: MultimediaFolderResponse = new MultimediaFolderResponse();
  isMasterSel: boolean = false;
  folderAddedInSlideshow: string[] = [];
  filesAddedInSlideshow: string[] = [];
  newFolderName: string = '';
  componentReady: boolean;
  multimediagallery: any;
  tempPath: string;
  teamDetail: TeamDetailResponse = new TeamDetailResponse();
  multimediaPrefix = environment.multimediaPrefix;
  localPrefix = environment.localPrefix;
  multimedia_mock = {
    commonResponse: [
      {
        fileId: 'aaad19f7-1b66-44aa-a443-4fcdd173f391',
        fileName: 'bannerd8a32383-b767-44e7-b48c-d15fbecc9a49.jpg',
        inSlideshow: false,
      },
      {
        fileId: 'aaad19f7-1b66-44aa-a443-4fcdd173f392',
        fileName: 'cannerd8a32383-b767-44e7-b48c-d15fbecc9a49.jpg',
        inSlideshow: true,
      },
    ],
    albumResponse: [
      {
        albumId: 'aaad19f7-1b66-44aa-a443-4fcdd173f390',
        albumName: 'festival',
        inSlideshow: true,
      },
      {
        albumId: 'aaad19f7-1b66-44aa-a443-4fcdd173f391',
        albumName: 'holidays',
        inSlideshow: false,
      },
    ],
  };

  constructor(
    public configureService: ConfigureMultimediaServiceService,
    private route: Router,
    private setupService: SetupService,
    private notifyService: NotificationService
  ) {}

  ngOnInit(): void {
    this.configureService.viewSubFolder = false;
    this.updateComponent();
  }

  updateComponent() {
    console.log('update Component');
    this.componentReady = false;
    this.teamId = JSON.parse(
      localStorage.getItem('TeamDetailsResponse')
    ).powerboardResponse.team_id;
    this.multimedia = JSON.parse(
      localStorage.getItem('TeamDetailsResponse')
    ).powerboardResponse.multimedia;

    this.multimedia.root.map((obj) => {
      obj.isSelected = false;
    });
    this.multimedia.display.map((obj) => {
      obj.isSelected = false;
    });
    this.multimediagallery = JSON.parse(
      localStorage.getItem('TeamDetailsResponse')
    ).powerboardResponse.multimedia;
    // this.multimediagallery=this.multimedia_mock.commonResponse;
    for (let file of this.multimedia.display) {
      this.tempPath = file.urlName;
      const isImage = this.isImage(file.urlName);

      if (!isImage) {
        const video_thumbnail = this.tempPath + '#t=5';
        file.urlName = video_thumbnail;
      } else {
        file.urlName = this.tempPath;
      }
    }
  }

  isImage(url: string) {
    const images = ['jpg', 'jpeg', 'gif', 'png'];
    const videos = ['mp4', '3gp', 'ogg'];

    const extension = url.split('.')[1];
    console.log(extension);
    if (images.includes(extension)) {
      return true;
    } else if (videos.includes(extension)) {
      return false;
    }
  }

  async uploadFile(event) {
     console.log(this.multimediagallery);
    const file = (event.target as HTMLInputElement).files[0];
    try {
      const data = await this.setupService.addFilesToTeam(this.teamId, file);
      console.log(data);
      let newFile = {
        fileId: data.id,
        fileName: data.fileName,
      };
      this.multimediagallery.rootResponse.push(newFile);
      this.teamDetail = JSON.parse(localStorage.getItem('TeamDetailsResponse'));
      this.teamDetail.powerboardResponse.multimedia = this.multimediagallery;
      localStorage.setItem(
        'TeamDetailsResponse',
        JSON.stringify(this.teamDetail)
      );
      this.updateComponent();
      this.notifyService.showSuccess('', 'File Added Successfully');
    } catch (e) {
      console.log(e.error.message);
      this.notifyService.showError('', e.error.message);
    }
  }

  // deleteFile(fileId:string){
  //   try{
  //     this.setupService.deleteFile(this.teamId,fileId);
  //     this.multimedia.rootResponse = this.multimedia.rootResponse.filter(obj => obj.fileId !== fileId);
  //     this.notifyService.showSuccess("", "File deleted Successfully");
  //   }
  //   catch(e){
  //     console.log(e.error.message);
  //     this.notifyService.showError("", e.error.message);
  //   }
  // }

  deleteFile() {
    console.log('delete');
  }

  viewSubFolder(id: string, name:string){
    this.configureService.selectedSubFolderName = name;
   this.configureService.selectedSubFolderId=id;
   this.configureService.viewSubFolder=true;
  }

  addOrRemoveFromFolderList(i: number) {
    this.multimedia.root[i].isSelected = !this.multimedia
      .root[i].isSelected;
    if (this.multimedia.root[i].isSelected) {
      this.folderAddedInSlideshow.push(
        this.multimedia.root[i].folderId
      );
    } else {
      const index = this.folderAddedInSlideshow.indexOf(
        this.multimedia.root[i].folderId
      );
      if (index > -1) {
        this.folderAddedInSlideshow.splice(index, 1);
      }
    }
    this.checkMasterSel();
  }
  addOrRemoveFromFileList(i: number) {
    this.multimedia.display[i].isSelected = !this.multimedia.display[
      i
    ].isSelected;
    if (this.multimedia.display[i].isSelected) {
      this.filesAddedInSlideshow.push(this.multimedia.display[i].id);
    } else {
      const index = this.filesAddedInSlideshow.indexOf(
        this.multimedia.display[i].id
      );
      if (index > -1) {
        this.filesAddedInSlideshow.splice(index, 1);
      }
    }
    this.checkMasterSel();
  }
  checkMasterSel() {
    let l1 =
      this.folderAddedInSlideshow.length + this.filesAddedInSlideshow.length;
    let l2 =
      this.multimedia.display.length +
      this.multimedia.root.length;
    if (l1 === l2) {
      this.isMasterSel = true;
    } else {
      this.isMasterSel = false;
    }
  }

  close() {
    this.newFolderName = '';
  }

  addFolder() {
    console.log(this.newFolderName);
  }

  checkUncheckAll() {
    this.isMasterSel = !this.isMasterSel;
    this.multimedia.root.map((obj) => {
      obj.isSelected = this.isMasterSel;
      if (this.isMasterSel) {
        this.folderAddedInSlideshow.indexOf(obj.folderId) === -1
          ? this.folderAddedInSlideshow.push(obj.folderId)
          : console.log('This item already exists');
      }
    });

    this.multimedia.display.map((obj) => {
      obj.isSelected = this.isMasterSel;
      if (this.isMasterSel) {
        this.filesAddedInSlideshow.indexOf(obj.id) === -1
          ? this.filesAddedInSlideshow.push(obj.id)
          : console.log('This item already exists');
      }
    });

    if (!this.isMasterSel) {
      this.folderAddedInSlideshow = [];
      this.filesAddedInSlideshow = [];
    }
  }
}
