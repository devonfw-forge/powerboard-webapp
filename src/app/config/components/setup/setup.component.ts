import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/shared/services/general.service';
import { VisibilityService } from '../../services/visibility.service';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.css'],
})
export class SetupComponent implements OnInit {
  constructor(
    public generalService: GeneralService,
    public visibilityService: VisibilityService
  ) {}

  ngOnInit(): void {}
  public showLogo() {
    this.visibilityService.hideAll();
    this.visibilityService.ShowLogo();
  }

  public showMeetingLink() {
    this.visibilityService.hideAll();
    this.visibilityService.ShowMeetingLink();
  }

  public showTeamLink() {
    this.visibilityService.hideAll();
    this.visibilityService.ShowTeamLink();
  }

  public showMultimedia() {
    this.visibilityService.hideAll();
    this.visibilityService.ShowMultimedia();
  }

  public showVideos() {
    this.visibilityService.hideAll();
    this.visibilityService.ShowVideo();
  }

  public showSendToTeamSpirit() {
    this.visibilityService.hideAll();
    this.visibilityService.ShowSendToTeamSpirit();
  }

  public showAddTeamMember() {
    this.visibilityService.hideAll();
    this.visibilityService.ShowAddTeamMember();
  }

  public showViewTeamMember() {
    this.visibilityService.hideAll();
    this.visibilityService.ShowViewTeamMember();
  }

  public changeActive(index: number) {
    let list = document.querySelectorAll('.list');
    let j = 0;
    while (j < list.length) {
      list[j++].className = 'list';
    }
    list[index - 1].className = 'list active';
  }

  public showEditTeam() {
    this.visibilityService.hideAll();
    this.visibilityService.ShowEditTeam();
  }
}
