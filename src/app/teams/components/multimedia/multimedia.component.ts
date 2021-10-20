import { Component, OnInit } from '@angular/core';
import { VgApiService } from '@videogular/ngx-videogular/core';
import { Multimedia } from 'src/app/shared/model/general.model';

@Component({
  selector: 'app-multimedia',
  templateUrl: './multimedia.component.html',
  styleUrls: ['./multimedia.component.css'],
})
export class MultimediaComponent implements OnInit {
  currentIndex = 0;
  currentItem: string;
  api: VgApiService;
  thumbnailData: string[];
  multimediaData: string[];
  thumbnailIsImage: boolean[] = [];
  teamId: string;
  realItem: string;
  multimedia: Multimedia[] = [];
  componentReady: boolean;
  tempPath: string;
  is_image: boolean = true;
  is_video: boolean = false;

  constructor() {
    this.thumbnailData = [];
    this.multimediaData = [];
  }

  async ngOnInit() {
    await this.updateComponent();
  }

  async updateComponent() {
    console.log('update Component');
    this.componentReady = false;
    this.teamId = JSON.parse(
      localStorage.getItem('TeamDetailsResponse')
    ).powerboardResponse.team_id;
    this.multimedia = JSON.parse(
      localStorage.getItem('TeamDetailsResponse')
    ).powerboardResponse.multimedia;
    this.currentItem = this.multimedia[this.currentIndex].fileName;

    for (let file of this.multimedia) {
      this.tempPath =
        'assets/uploads/multimedia/' + this.teamId + '/' + file.fileName;
      const isImage = this.isImage(file.fileName);

      this.multimediaData.push(this.tempPath);

      if (!isImage) {
        const video_thumbnail = this.tempPath.split('.')[0] + '-thumb.jpg';
        this.thumbnailData.push(video_thumbnail);
      } else {
        this.thumbnailData.push(this.tempPath);
      }

      this.thumbnailIsImage.push(isImage);
    }

    this.onClickPlaylistItem(this.thumbnailData[0], 0);
  }

  onClickPlaylistItem(item: string, index: number) {
    if (this.thumbnailIsImage[index]) {
      this.is_video = false;

      this.is_image = true;
    } else {
      this.is_video = true;
      this.is_image = false;
    }

    this.realItem = this.multimediaData[index];
    this.currentIndex = index;
    this.currentItem = item;
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

  onPlayerReady(api: VgApiService) {
    console.log('api value');
    console.log(api);
    this.api = api;

    if (this.componentReady) {
      this.api.volume = 0;
    }
  }

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

  previousItem() {
    console.log('previos');
    this.onClickPlaylistItem(
      this.multimediaData[this.currentIndex - 1],
      this.currentIndex - 1
    );
  }
  nextItem() {
    console.log('Next');
    this.onClickPlaylistItem(
      this.multimediaData[this.currentIndex + 1],
      this.currentIndex + 1
    );
  }
}
