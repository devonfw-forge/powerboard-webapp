import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/shared/services/general.service';
import { VisibilityService } from '../../services/visibility.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css'],
})
export class TeamComponent implements OnInit {
  constructor(
    public generalService: GeneralService,
    public visibilityService: VisibilityService
  ) {}

  ngOnInit(): void {}

  public showAddTeam() {
    this.visibilityService.hideAll();
    this.visibilityService.showAddTeamForm();
  }

  public displayViewAllTeams() {
    this.visibilityService.hideAll();
    this.visibilityService.displayViewAllTeams();
  }

  public changeActive(index: number) {
    let list = document.querySelectorAll('.list');
    let j = 0;
    while (j < list.length) {
      list[j++].className = 'list';
    }
    list[index - 1].className = 'list active';
  }
}
