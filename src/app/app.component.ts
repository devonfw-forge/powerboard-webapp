import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { GeneralService } from './shared/services/general.service';
import { SlideshowService } from './teams/services/slideshow.service';
import { NavigationService } from './shared/services/navigation.service';
import { TeamDetailsService } from './teams/services/team-details.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'PowerboardFW_new';
  teamName: string;
  checklocationPath : string;
  
 
  constructor(public generalService: GeneralService, public slideShowService: SlideshowService,public navigation: NavigationService, public router: Router, public location: Location, public teamDetailService : TeamDetailsService) {

    this.teamName = "";
  }

  ngOnInit() {
    this.router.navigate(['auth/login']);
    
  }


  public toggle() {
    let toggle = document.getElementById('togglebtn');
    if (toggle.className == "btn btn-sm btn-toggle active") {
      toggle.className = "btn btn-sm btn-toggle";
      this.slideShowService.stopSlideShow();
    }
    else {
      toggle.className = "btn btn-sm btn-toggle active";
      this.slideShowService.startSlideShow();
    }
  }


  getTeamName() {
    if (this.generalService.IsShowNavBarIcons()) {
      if (localStorage.getItem('TeamDetailsResponse') != null) {
       this.teamName = JSON.parse(localStorage.getItem('TeamDetailsResponse')).powerboardResponse.team_name;
       return this.teamName;
      }
    }
    return "";
  }

  highlight(btnName: string) {
    if (this.generalService.IsShowNavBarIcons()) {
      if (btnName == 'dashboard') {
        this.highLightDashBoard();
      }
      if (btnName == 'links') {
        this.highlightLinks();
      }
      if (btnName == 'multimedia') {
        this.highlightMultimedia();
      }
    }
  }
  highLightDashBoard(){
    let dashboard = document.getElementById('dashboard');
    dashboard.style.color = "white";
    dashboard.style.backgroundColor = "#0070AD";
    dashboard.style.border = "none";
    this.unHighlightMultimedia();
    this.unHighlightLinks();
  }
  UnHighLightDashBoard(){
    let dashboard = document.getElementById('dashboard');
    dashboard.style.color = "#0070AD";
    dashboard.style.backgroundColor = "#FEFEFE";
    dashboard.style.border = "2px solid #0070AD";
  }
  highlightMultimedia(){
    let multimedia = document.getElementById('multimedia');
    multimedia.style.color = "white";
        multimedia.style.backgroundColor = "#0070AD";
        multimedia.style.border = "none";
        this.UnHighLightDashBoard();
        this.unHighlightLinks();
  }
  unHighlightMultimedia(){
    let multimedia = document.getElementById('multimedia');
    multimedia.style.color = "#0070AD";
        multimedia.style.backgroundColor = "#FEFEFE";
        multimedia.style.border = "2px solid #0070AD";
  }
  highlightLinks(){
    if (this.generalService.getIsLinksVisible()){
      let links = document.getElementById('links');
      links.style.color = "white";
      links.style.backgroundColor = "#0070AD";
      links.style.border = "none";
    }  
    this.UnHighLightDashBoard();
    this.unHighlightMultimedia();
  }
  unHighlightLinks(){
    if (this.generalService.getIsLinksVisible()){
      let links = document.getElementById('links');
          links.style.color = "#0070AD";
          links.style.backgroundColor = "#FEFEFE";
          links.style.border = "2px solid #0070AD";
    }  
  }



  public checkLocation() {
    if (this.location.path().includes("/dashboard") ) {
      this.highLightDashBoard()
    }
    else {
      if (this.generalService.IsShowNavBarIcons()){
        this.UnHighLightDashBoard();
      }
      else{
        console.log("not available");
      }
    }
    
    if(this.location.path().includes("/links") ){
      this.highlightLinks()
    }
    else{
      if (this.generalService.IsShowNavBarIcons()) {
        this.unHighlightLinks();
      }
      else{
        console.log("not available");
      }
    }
    if(this.location.path().includes("/multimedia")){
      this.highlightMultimedia();
    }
    else{   
      if (this.generalService.IsShowNavBarIcons()) {
        this.unHighlightMultimedia();
      }
      else{
        console.log("not available");
      }
    }
  }

  

  back() {
    
    if(!this.navigation.back()){
      console.log("call modal");
      document.getElementById("openLogoutModal").click();
    }
   
  }
confirmLogout(){
this.navigation.clearRouterHistory();
this.generalService.logout();
this.teamDetailService.resetTeamDetailPermissions();
}
confirmStay(){
  this.navigation.pushCurrentLocation();
}

  @HostListener('document:keydown.escape', ['$event'])
  onKeydownHandler(event: KeyboardEvent) {
    this.slideShowService.stopSlideShow();
  }

  public moveToSetings(){
   this.checklocationPath = this.location.path();
    if(this.checklocationPath.includes("config")){
      console.log("already in config");
    }
    else{
      this.router.navigateByUrl("/config");
    }
  }

}
