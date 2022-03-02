import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { WebviewTag } from 'electron';
import { ElectronService } from 'ngx-electron';
import { LinkResponse } from 'src/app/shared/model/general.model';
import { UrlPathConstants } from 'src/app/UrlPaths';
import { SlideshowService } from '../../services/slideshow.service';

@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.css'],
})
export class LinksComponent implements OnInit {
  public src: string;
  teamLinks: LinkResponse[] = [];
  isElectronRunning: boolean;
  webview: WebviewTag;
  skypeUrl: string;
  public loading = false;
  counter: number = 1;
  webLinksIndex: number[];
  intervalID: any;
  interval= UrlPathConstants.slideshowInterval;
  webLinkCount = 0;
  meetingLinkCount = 0;

  constructor(private electronService: ElectronService, private ref: ChangeDetectorRef, public slideshowService: SlideshowService) {
    this.src = '';
    this.teamLinks = [];
    this.webLinksIndex = [];
    if (electronService.isElectronApp) {
      this.isElectronRunning = true;
    } else {
      this.isElectronRunning = false;
    }
  }


  ngOnInit(): void {
    this.getLinks();
    this.webLinkCount = 0;
    this.meetingLinkCount = 0;
    for(let link of this.teamLinks){
      if (link.linkType === 'web_link'){
        this.webLinkCount = this.webLinkCount + 1;
      }
      else{
        this.meetingLinkCount = this.meetingLinkCount + 1;
      }
    }

  }

  ngAfterViewInit() {
    if (this.isElectronRunning) {
      console.log("I am not suppose to be present here");
      this.webview = document.querySelector('webview');

      this.webview.setAttribute('src', this.src);
      this.webview.addEventListener('did-start-loading', (e) => {
        this.loading = true;
        this.ref.detectChanges();

        this.webview.addEventListener('did-stop-loading', (el) => {
          this.loading = false;
          console.log(el);
          this.ref.detectChanges();
        });
      });

      if (this.webLinksIndex.length === 1 && this.slideshowService.isSlideshowRunning) {
        setTimeout(() => {

          this.slideshowService.moveSlideshowNextComponent();

        }, this.interval);
      }
      else if (this.webLinksIndex.length != 1 && this.slideshowService.isSlideshowRunning) {
        this.automateWebLinks(this.interval);
      }
    }
  }


  public getLinks() {
    this.webLinksIndex = [];
    this.teamLinks = JSON.parse(localStorage.getItem('TeamDetailsResponse')).powerboardResponse.teamLinks;
    for (let i = 0; i < this.teamLinks.length; i++) {
      if (this.teamLinks[i].linkType === 'web_link') {
        this.webLinksIndex.push(i);
        if (this.src === '') {
          this.src = this.teamLinks[i].links;

        }

      }
    }
    console.log(this.webLinksIndex.length);
  }

  automateWebLinks(interval: number) {

    this.intervalID = setInterval(() => this.openLink(this.teamLinks[this.webLinksIndex[this.counter]].links), interval);
  }

  openMeetingLink(meetingLink: string) {
    if (!this.isElectronRunning) {
      window.open(meetingLink, '_blank');
    } else {
      let myWindow = window.open(meetingLink, '_system');
      setTimeout(() => {
        myWindow.close();
      }, 5000);
    }
  }

  openLink(link: string) {
    console.log(link);
    console.log(this.webLinksIndex[this.counter]);
    if (!this.isElectronRunning) {
      window.open(link, "myWindow", "width=1000,height=1000");
    }
    else {
      this.src = link;
      this.webview.setAttribute('src', link);
      this.ref.detectChanges();

      if (this.counter === this.webLinksIndex.length - 1) {
        console.log("automate done");

        clearInterval(this.intervalID);
        setTimeout(() => {
          if (this.slideshowService.isSlideshowRunning) {
            this.slideshowService.moveSlideshowNextComponent();
          }
        }, this.interval);

      }
      else {
        this.counter = this.counter + 1;
        if (this.counter === 1) {
          this.automateWebLinks(this.interval);
        }

        console.log(this.counter);
      }
    }
  }

  ngOnDestroy() {
    if (this.intervalID) {
      this.counter = 0;
      clearInterval(this.intervalID);
    }
  }
 }
