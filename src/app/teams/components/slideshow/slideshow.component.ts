import {  Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ElectronService } from 'ngx-electron';
import { SlideshowService } from '../../services/slideshow.service';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.css'],
})
export class SlideshowComponent implements OnInit {
    constructor(public router: Router, public slideShowService : SlideshowService) 
      {
  
    
       }
  
    ngOnInit(): void {
      this.router.navigateByUrl(this.slideShowService.slideshowArray[this.slideShowService.slideshowIndex]);
    }
}
