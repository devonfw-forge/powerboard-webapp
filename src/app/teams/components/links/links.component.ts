import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { WebviewTag } from 'electron';
import { ElectronService } from 'ngx-electron';
import { LinkResponse } from '../../../shared/model/general.model';

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

  constructor(
    private electronService: ElectronService,
    private ref: ChangeDetectorRef
  ) {
    this.src = '';
    this.teamLinks = [];
    if (electronService.isElectronApp) {
      // Do electron stuff
      this.isElectronRunning = true;
    } else {
      // Do other web stuff
      this.isElectronRunning = false;
    }
  }

  ngOnInit(): void {
    this.getLinks();
  }

  ngAfterViewInit() {
    if (this.isElectronRunning) {
      this.getLinks();
      console.log('I am not suppose to be present here');
      this.webview = document.querySelector('webview');

      this.webview.setAttribute('src', this.src);
      // Loading
      this.webview.addEventListener('did-start-loading', (e) => {
        this.loading = true;
        this.ref.detectChanges();

        this.webview.addEventListener('did-stop-loading', (e) => {
          this.loading = false;
          const target: any = e.target;

          this.ref.detectChanges();
        });
      });
    }
  }

  public getLinks() {
    let i = 0;
    this.teamLinks = JSON.parse(
      localStorage.getItem('TeamDetailsResponse')
    ).powerboardResponse.teamLinks;
    for (i = 0; i < this.teamLinks.length; i++) {
      if (this.teamLinks[i].linkType == 'web_link') {
        this.src = this.teamLinks[i].links;
        break;
      }
    }
  }

  openMeetingLink(meetingLink) {
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
    if (!this.isElectronRunning) {
      let myWindow = window.open(link, 'myWindow', 'width=1000,height=1000');
    } else {
      this.src = link;
      this.webview.setAttribute('src', link);
      this.ref.detectChanges();
    }
  }
}
