import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ElectronService } from 'ngx-electron';
import { GeneralService } from 'src/app/shared/services/general.service';

@Injectable({
  providedIn: 'root',
})
export class SlideshowService {
  isSlideshowRunning: boolean;
  isElectronRunning: boolean;
  slideshowIndex: number;
  lastCheckPoint: string;
  slideshowArray: string[] = [];
  constructor(
    private generalService: GeneralService,
    private router: Router,
    private electronService: ElectronService
  ) {
    this.isSlideshowRunning = false;
    this.slideshowIndex = 0;
    this.lastCheckPoint = 'teams/dashboard';

    if (electronService.isElectronApp) {
      this.isElectronRunning = true;
    } else {
      this.isElectronRunning = false;
    }
  }

  public getSlideShow(): boolean {
    return this.isSlideshowRunning;
  }
  public startSlideShow() {
    this.isSlideshowRunning = true;
  }
  public stopSlideShow() {
    this.isSlideshowRunning = false;
    this.router.navigateByUrl(this.lastCheckPoint);
  }

  /**
   * Push dashboard and slideshow multimedia into sildeshow array
   * If permission to view links is available and electron is running, push links to slideshow array
   * Vavigate to slideshow component
   */
  public checkSlideshowArray() {
    this.slideshowIndex = 0;
    this.slideshowArray = [];
    this.slideshowArray.push('teams/dashboard');
    if (this.generalService.isLinksVisible && this.isElectronRunning) {
      this.slideshowArray.push('teams/links');
    }
    this.slideshowArray.push('teams/slideshow-multimedia');
    if (this.isSlideshowRunning) {
      this.router.navigateByUrl('teams/slideshow');
    }
  }
  /**
   * If slideshow is running
   * slide show index reaches to 0, move index to start of array
   * else move to next index
   */
  public moveSlideshowNextComponent() {
    if (this.isSlideshowRunning) {
      if (this.slideshowIndex == this.slideshowArray.length - 1) {
        this.slideshowIndex = 0;
      } else {
        this.slideshowIndex = this.slideshowIndex + 1;
      }
      this.router.navigateByUrl(this.slideshowArray[this.slideshowIndex]);
    }
  }
  /**
   * If slideshow is running
   * slide show index reaches to 0, move index to end of array
   * else move to previous index
   *
   */
  public moveSlideshowPreviousComponent() {
    if (this.isSlideshowRunning) {
      if (this.slideshowIndex == 0) {
        this.slideshowIndex = this.slideshowArray.length - 1;
      } else {
        this.slideshowIndex = this.slideshowIndex - 1;
      }
      this.router.navigateByUrl(this.slideshowArray[this.slideshowIndex]);
    }
  }
}
