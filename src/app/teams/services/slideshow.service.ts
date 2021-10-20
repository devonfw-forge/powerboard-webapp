import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SlideshowService {
  isSlideshowRunning: boolean;
  constructor() {
    this.isSlideshowRunning = false;
  }

  public getSlideShow(): boolean {
    return this.isSlideshowRunning;
  }
  public startSlideShow() {
    this.isSlideshowRunning = true;
  }
  public stopSlideShow() {
    this.isSlideshowRunning = false;
  }
}
