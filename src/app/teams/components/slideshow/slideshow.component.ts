import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ElectronService } from 'ngx-electron';
import { interval } from 'rxjs/internal/observable/interval';
import { Subscription } from 'rxjs/internal/Subscription';
import { GeneralService } from '../../../shared/services/general.service';
import { SlideshowService } from '../../services/slideshow.service';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.css'],
})
export class SlideshowComponent implements OnInit {
  isElectronRunning: boolean;
  public index: number;
  mysub: Subscription;
  interval: number;
  galleryInterval: number;
  videoInterval: number;
  generalInterval: number;
  preview: boolean;
  dashboardInterval: number;
  viewLink: boolean = false;
  meetingLinkView: boolean = false;

  constructor(
    public electronService: ElectronService,
    private changeDetector: ChangeDetectorRef,
    public router: Router,
    public generalService: GeneralService,
    public slideShowService: SlideshowService
  ) {
    if (electronService.isElectronApp) {
      // Do electron stuff
      this.isElectronRunning = true;
    } else {
      // Do other web stuff
      this.isElectronRunning = false;
    }

    this.index = 0;
    this.preview = false;
    this.dashboardInterval = 10000;
    this.galleryInterval =
      JSON.parse(localStorage.getItem('TeamDetailsResponse')).powerboardResponse
        .images.length * 2000;
    this.videoInterval =
      JSON.parse(localStorage.getItem('TeamDetailsResponse')).powerboardResponse
        .videos.length * 5000;
    this.generalInterval = 5000;

    this.interval = this.galleryInterval;
  }

  ngOnInit(): void {
    this.preview = false;
    this.checkVisibility();

    this.mysub = interval(this.interval).subscribe(() => {
      /* if (this.slideShowService.getSlideShow()) {  */
      this.preview = true;
      this.cycle();
      /*   }  */
    });
  }

  private cycle() {
    this.index++;
    if (this.index == 3 && !this.meetingLinkView) {
      this.index = 4;
      this.interval = this.generalInterval;
    }

    if (this.index == 4 && !this.isElectronRunning) {
      this.index = 5;
      this.interval = this.generalInterval;
    }

    if (this.index == 4 && !this.viewLink) {
      this.index = 5;
      this.interval = this.generalInterval;
    }

    if (this.index == 1) {
      console.log('gallery');

      this.interval = this.galleryInterval;
    }

    if (this.index == 2) {
      console.log('videos');

      this.interval = this.videoInterval;
    }

    if (this.index == 3) {
      console.log('gauge');

      this.interval = this.generalInterval;
    }
    if (this.index == 4) {
      console.log('iframe');

      this.interval = this.generalInterval;
    }

    if (this.index == 5) {
      console.log('dashboard');

      this.index = 0;
      this.interval = this.dashboardInterval;
    }
    this.changeDetector.detectChanges();
  }

  public checkVisibility() {
    for (let permission of this.generalService.getPermissions()) {
      if (this.generalService.viewLinks == permission) {
        this.viewLink = true;
      }
    }
  }
}
