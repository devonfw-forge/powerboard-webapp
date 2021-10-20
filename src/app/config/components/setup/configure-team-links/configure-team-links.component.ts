import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { WebviewTag } from 'electron';
import { ElectronService } from 'ngx-electron';
import { LinkResponse, TeamDetailResponse } from 'src/app/shared/model/general.model';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { TeamLinksDetails } from '../../../model/config.model';
import { ConfigService } from '../../../services/config.service';
import { SetupService } from '../../../services/setup.service';
import { AddLinksComponent } from './add-links/add-links.component';

@Component({
  selector: 'app-configure-team-links',
  templateUrl: './configure-team-links.component.html',
  styleUrls: ['./configure-team-links.component.css'],
})
export class ConfigureTeamLinksComponent implements OnInit {
  src: string;
  public webview: WebviewTag;
  isElectronRunning: boolean;
  url: FormControl;
  usefullLinks: LinkResponse[];
  selectedLinkId: string;
  @ViewChild(AddLinksComponent) child;

  constructor(
    private setupService: SetupService,
    private ref: ChangeDetectorRef,
    private electronService: ElectronService,
    private notifyService: NotificationService,
    private configService: ConfigService
  ) {
    this.usefullLinks = [];
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

  public getLinks() {
    this.usefullLinks = JSON.parse(
      localStorage.getItem('TeamDetailsResponse')
    ).powerboardResponse.teamLinks;
    console.log(this.usefullLinks);
  }

  openLink(link: LinkResponse) {
    if (link.linkType === 'meeting_link') {
      this.openMeetingLink(link.links);
    } else if (link.linkType === 'web_link') {
      this.openTeamLink(link.links);
    }
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

  openTeamLink(link: string) {
    console.log(link);
    if (!this.isElectronRunning) {
      let myWindow = window.open(link, 'myWindow', 'width=1000,height=1000');
    } else {
      this.src = link;
      this.webview.setAttribute('src', link);
      this.ref.detectChanges();
    }
  }

  saveSeletedLink(id: string) {
    this.selectedLinkId = id;
  }

  async deleteLink() {
    try {
      const data = await this.setupService.deleteLink(this.selectedLinkId);
      this.notifyService.showSuccess('Team Link deleted successfully !!', '');
      console.log(data);
      this.configService.getTeamDetails();
      for (let link of this.configService.teamDetails.powerboardResponse
        .teamLinks) {
        if (link.teamLinkId == this.selectedLinkId) {
          this.configService.teamDetails.powerboardResponse.teamLinks = this.configService.teamDetails.powerboardResponse.teamLinks.filter(
            (item) => item !== link
          );
        }
      }
      this.configService.setTeamDetails();
      this.getLinks();
    } catch (e) {
      console.log(e.error.message);
      this.notifyService.showError('', e.error.message);
    }
  }

  addLink() {
    this.child.onSubmit();
  }

  close() {
    this.child.selectedLinkType = 'select Type';
    this.child.memberGroup.reset();
  }
}
