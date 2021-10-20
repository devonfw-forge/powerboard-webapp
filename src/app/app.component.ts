import { Component, HostListener, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ElectronService } from 'ngx-electron';
import { Location } from '@angular/common';
import { GeneralService } from './shared/services/general.service';
import { SlideshowService } from './teams/services/slideshow.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnDestroy {
  title = 'PowerboardFW_new';
  teamName: string;
  isElectronRunning: boolean;
  constructor(
    public generalService: GeneralService,
    private electronService: ElectronService,
    public slideShowService: SlideshowService,
    public router: Router,
    public location: Location
  ) {
    this.teamName = '';
    if (electronService.isElectronApp) {
      // Do electron stuff
      this.isElectronRunning = true;
    } else {
      // Do other web stuff
      this.isElectronRunning = false;
    }
  }

  // @HostListener('window:beforeunload')
  ngOnDestroy() {
    //   this.generalService.storeLastLoggedIn();
    //   localStorage.removeItem('PowerboardDashboard');
    //   localStorage.removeItem('TeamDetailsResponse');
    //   localStorage.removeItem('currentTeam');
    //   this.generalService.setPermissions([]);
    //   this.generalService.showNavBarIcons = false;
    //   this.generalService.setLoginComplete(false);
    //   console.log('browser tab has been closed');
  }

  public toggle() {
    let toggle = document.getElementById('togglebtn');
    if (toggle.className == 'btn btn-sm btn-toggle active') {
      toggle.className = 'btn btn-sm btn-toggle';
      this.slideShowService.stopSlideShow();
    } else {
      toggle.className = 'btn btn-sm btn-toggle active';
      this.slideShowService.startSlideShow();
    }
  }

  // check(){
  //   console.log(this.generalService.isMeetingLinksVisible);
  //   return this.generalService.isDashboardVisible;
  // }

  getTeamName() {
    if (this.generalService.showNavBarIcons) {
      if (localStorage.getItem('TeamDetailsResponse') != null) {
        return (this.teamName = JSON.parse(
          localStorage.getItem('TeamDetailsResponse')
        ).powerboardResponse.team_name);
      }
    }
    return '';
  }

  highlight(btnName: string) {
    if (this.generalService.showNavBarIcons) {
      let dashboard = document.getElementById('dashboard');
      let multimedia = document.getElementById('multimedia');
      if (btnName == 'dashboard') {
        dashboard.style.color = 'white';
        dashboard.style.backgroundColor = '#0070AD';
        dashboard.style.border = 'none';

        multimedia.style.color = '#0070AD';
        multimedia.style.backgroundColor = '#FEFEFE';
        multimedia.style.border = '2px solid #0070AD';

        if (this.generalService.isLinksVisible) {
          let links = document.getElementById('links');
          links.style.color = '#0070AD';
          links.style.backgroundColor = '#FEFEFE';
          links.style.border = '2px solid #0070AD';
        }
      }
      if (btnName == 'links') {
        dashboard.style.color = '#0070AD';
        dashboard.style.backgroundColor = '#FEFEFE';
        dashboard.style.border = '2px solid #0070AD';

        multimedia.style.color = '#0070AD';
        multimedia.style.backgroundColor = '#FEFEFE';
        multimedia.style.border = '2px solid #0070AD';

        if (this.generalService.isLinksVisible) {
          let links = document.getElementById('links');
          links.style.color = 'white';
          links.style.backgroundColor = '#0070AD';
          links.style.border = 'none';
        }
      }
      if (btnName == 'multimedia') {
        dashboard.style.color = '#0070AD';
        dashboard.style.backgroundColor = '#FEFEFE';
        dashboard.style.border = '2px solid #0070AD';

        multimedia.style.color = 'white';
        multimedia.style.backgroundColor = '#0070AD';
        multimedia.style.border = 'none';

        if (this.generalService.isLinksVisible) {
          let links = document.getElementById('links');
          links.style.color = '#0070AD';
          links.style.backgroundColor = '#FEFEFE';
          links.style.border = '2px solid #0070AD';
        }
      }
    }
  }

  public checkLocation() {
    if (this.location.path() == '/dashboard') {
      this.highlight('dashboard');
    } else {
      if (this.generalService.showNavBarIcons) {
        let dashboard = document.getElementById('dashboard');
        dashboard.style.color = '#0070AD';
        dashboard.style.backgroundColor = '#FEFEFE';
        dashboard.style.border = '2px solid #0070AD';
      }
    }
  }
  back() {
    this.location.back();
  }
}
