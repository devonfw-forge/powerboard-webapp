import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { WebviewTag } from 'electron';
import { ElectronService } from 'ngx-electron';
import {
  AggregationLinkResponse,
  LinkResponse,
  TeamDetailResponse,
} from 'src/app/shared/model/general.model';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { SetupService } from '../../../services/setup.service';
import { AddAggregatorLinksComponent } from './add-aggregator-links/add-aggregator-links.component';
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
  aggregationLinks: AggregationLinkResponse[];
  selectedLinkId: string;
  addedLink: any;
  addedAggregationLink: any;
  teamId:string;
  teamDetail: TeamDetailResponse = new TeamDetailResponse();
  @ViewChild(AddLinksComponent) child;
  @ViewChild(AddAggregatorLinksComponent) aggregationChild;

  constructor(
    public setupService: SetupService,
    private ref: ChangeDetectorRef,
    private electronService: ElectronService,
    public notifyService: NotificationService,
    public router:Router
  ) {
    this.usefullLinks = [];
    if (electronService.isElectronApp) {
      this.isElectronRunning = true;
    } else {
      this.isElectronRunning = false;
    }
  }


  ngOnInit(): void {
    this.teamId = JSON.parse(
      localStorage.getItem('TeamDetailsResponse')
    ).powerboardResponse.team_id;
    this.getLinks();
  }

  ngAfterViewInit(){
    if(this.setupService.getOpenConfigureLinks() && this.setupService.getIsShowAddAggregationLinkModal()){
      document.getElementById("addAggregationLinkButton").click();
      this.setupService.setOpenConfigureLinksToFalse();
      this.setupService.hideAddAggregationLinkModal();
    }
  }
  

  /**
   * Get all links from local storage
   * If links are unavailable, display "links not available" message
   */
  public getLinks() {
    this.usefullLinks = JSON.parse(
      localStorage.getItem('TeamDetailsResponse')
    ).powerboardResponse.teamLinks;

    if (this.usefullLinks.length > 0) {
      console.log(this.usefullLinks);
    } else {
      this.notifyService.showInfo('', 'No Team links are available');
    }
    this.aggregationLinks = JSON.parse(
      localStorage.getItem('TeamDetailsResponse')
    ).powerboardResponse.aggregationLinks;

    if (this.aggregationLinks.length > 0) {
      console.log(this.aggregationLinks);
    } else {
      this.notifyService.showInfo('', 'No Aggregation links are available');
    }
  }

  /**
   * Opens meeting link or team links as per the input
   *
   */
  openLink(link: LinkResponse) {
    if (link.linkType === 'meeting_link') {
      this.openMeetingLink(link.links);
    } else if (link.linkType === 'web_link') {
      this.openTeamLink(link.links);
    }
  }

  /**
   * If electron running, open meeting link in same window
   * else, open in new tab
   *
   */
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

  /**
   * If electron running, open aggregation link in same window
   * else, open in new tab
   *
   */
  openAggregationLink(aggregationLink: string) {
    if (!this.isElectronRunning) {
      window.open(aggregationLink, '_blank');
    } else {
      let myWindow = window.open(aggregationLink, '_system');
      setTimeout(() => {
        myWindow.close();
      }, 5000);
    }
  }

  /**
   * If electron running, open team link in same window
   * else, open in new tab
   *
   */
  openTeamLink(link: string) {
    console.log(link);
    if (!this.isElectronRunning) {
      window.open(link, 'myWindow', 'width=1000,height=1000');
    } else {
      this.src = link;
      this.webview.setAttribute('src', link);
      this.ref.detectChanges();
    }
  }

  saveSeletedLink(id: string) {
    this.selectedLinkId = id;
  }

  /**
   * Delete link using link id
   * If link deleted successfully, display success message and update in links list and local storage
   * If error while deleting link, display error message
   */
  async deleteLink() {
    try {
      console.log(this.selectedLinkId);
      const data = await this.setupService.deleteLink(this.selectedLinkId);
      this.notifyService.showSuccess('Team link deleted successfully', '');
      console.log(data);
      this.usefullLinks = this.usefullLinks.filter(
        (link) => link.teamLinkId != this.selectedLinkId
      );
      this.teamDetail = JSON.parse(localStorage.getItem('TeamDetailsResponse'));
      this.teamDetail.powerboardResponse.teamLinks = this.usefullLinks;
      localStorage.setItem(
        'TeamDetailsResponse',
        JSON.stringify(this.teamDetail)
      );
    } catch (e) {
      console.log(e.error.message);
      this.notifyService.showError('', e.error.message);
    }
  }

  /**
   * Delete Aggregation link using link id
   * If link deleted successfully, display success message and update in links list and local storage
   * If error while deleting link, display error message
   */
  async deleteAggregationLink() {
    try {
      console.log(this.selectedLinkId);
      const data = await this.setupService.deleteAggregationLink(this.selectedLinkId);
      let linkName:string = '';
      for(let link of this.aggregationLinks){
        if(link.id == this.selectedLinkId){
          linkName = link.name;
        }
      }
      this.notifyService.showSuccess(linkName+' link deleted successfully', '');
      console.log(data);
      this.aggregationLinks = this.aggregationLinks.filter(
        (link) => link.id != this.selectedLinkId
      );
      this.teamDetail = JSON.parse(localStorage.getItem('TeamDetailsResponse'));
      this.teamDetail.powerboardResponse.aggregationLinks = this.aggregationLinks;
      localStorage.setItem(
        'TeamDetailsResponse',
        JSON.stringify(this.teamDetail)
      );
    } catch (e) {
      console.log(e.error.message);
      this.notifyService.showError('', e.error.message);
    }
  }

  /**
   * If link added, append the links in link list and local storage
   */
  async addLink() {
    const data = await this.child.onSubmit();

    this.addedLink = {
      linkName: data.linkName,
      teamLinkId: data.id,
      linkType: data.linkType.title,
      links: data.link,
    };
    this.usefullLinks.push(this.addedLink);
    console.log(this.usefullLinks);
    this.teamDetail = JSON.parse(localStorage.getItem('TeamDetailsResponse'));
    this.teamDetail.powerboardResponse.teamLinks = this.usefullLinks;
    localStorage.setItem(
      'TeamDetailsResponse',
      JSON.stringify(this.teamDetail)
    );
  }

  /**
   * If aggregation link added, append the links in link list and local storage
   */
  async addAggregationLink() {
    const data = await this.aggregationChild.onSubmit();
    console.log(data);
    this.addedAggregationLink = {
      id: data.id,
      url : data.url,
      teamId: data.team.id,
      name: data.name.title,
      aggregationFrequency: data.aggregationFrequency,
      startDate: data.startDate,
      isActive: data.isActive
    };
    this.aggregationLinks.push(this.addedAggregationLink);
    console.log(this.aggregationLinks);
    this.teamDetail = JSON.parse(localStorage.getItem('TeamDetailsResponse'));
    this.teamDetail.powerboardResponse.aggregationLinks = this.aggregationLinks;
    localStorage.setItem(
      'TeamDetailsResponse',
      JSON.stringify(this.teamDetail)
    );
  }

  close() {
    this.child.selectedLinkType = 'select Type';
    this.child.memberGroup.reset();
  }
  skip(){
    this.setupService.deactiveAdminSetup();
    this.router.navigate(['teams/dashboard']);
  }

 async finishConfiguration() {
    try {
      await this.setupService.updateTeamConfigured(this.teamId,true);
      this.notifyService.showSuccess('Team configured successfully', '');
      this.teamDetail = JSON.parse(localStorage.getItem('TeamDetailsResponse'));
      this.teamDetail.powerboardResponse.isTeamConfigured = true;
      localStorage.setItem(
        'TeamDetailsResponse',
        JSON.stringify(this.teamDetail)
      );
    } catch (e) {
      console.log(e.error.message);
      this.notifyService.showError('', e.error.message);
    }finally{
      this.setupService.deactiveAdminSetup();
      this.router.navigate(['teams/dashboard']);
    }
  }
  previous(){
    this.router.navigate(['config/setup/view-members']);
  }
}
