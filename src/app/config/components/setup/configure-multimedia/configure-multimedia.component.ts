import { Component, OnInit } from '@angular/core';
import { Multimedia } from 'src/app/shared/model/general.model';
import { SetupService } from '../../../services/setup.service';

@Component({
  selector: 'app-configure-multimedia',
  templateUrl: './configure-multimedia.component.html',
  styleUrls: ['./configure-multimedia.component.css'],
})
export class ConfigureMultimediaComponent implements OnInit {
  teamId: string;
  multimedia: Multimedia[] = [];
  componentReady: boolean;
  tempPath: string;

  constructor(private setupService: SetupService) {}

  ngOnInit(): void {
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

    for (let file of this.multimedia) {
      this.tempPath =
        'assets/uploads/multimedia/' + this.teamId + '/' + file.fileName;
      const isImage = this.isImage(file.fileName);

      if (!isImage) {
        const video_thumbnail = this.tempPath.split('.')[0] + '-thumb.jpg';
        file.fileName = video_thumbnail;
      } else {
        file.fileName = this.tempPath;
      }
    }
  }

  isImage(url: string) {
    const images = ['jpg', 'gif', 'png'];
    const videos = ['mp4', '3gp', 'ogg'];

    const extension = url.split('.')[1];
    console.log(extension);
    if (images.includes(extension)) {
      return true;
    } else if (videos.includes(extension)) {
      return false;
    }
  }

  uploadFile(event) {
    const file = (event.target as HTMLInputElement).files[0];
    try {
      this.setupService.addFilesToTeam(this.teamId, file);
    } catch (e) {
      console.log(e.error.message);
    }
  }

  deleteFile(fileId: string) {
    try {
      this.setupService.deleteFile(this.teamId, fileId);
      this.multimedia = this.multimedia.filter((obj) => obj.fileId !== fileId);
    } catch (e) {
      console.log(e.error.message);
    }
  }
}
