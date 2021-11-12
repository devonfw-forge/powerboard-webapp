import { Injectable } from '@angular/core';
import { PowerboardLoginResponse } from '../auth/model/auth.model';
import { SlideshowFiles } from '../shared/model/general.model';

@Injectable()
export class GeneralServiceMock {
  constructor() { }

isGuest=true;
// slideShowfiles=[];
 getisGuestLogin(): boolean {
    return this.isGuest;
  }

 setisGuestLogin(value: boolean) {
    
  }
  setLoginComplete(b:boolean){

  }

  getLoginComplete(b:boolean){

  }

  getSlideshowFiles(teamId:string){
    let slideShowfiles=['bannerd8a32383-b767-44e7-b48c-d15fbecc9a49.jpg']
    return slideShowfiles;
  }

  setPermissions(){

  }

  setpowerboardLoginResponse(value: PowerboardLoginResponse){
   
  }
  checkLastLoggedIn(){
  return true;
  }

  checkVisibility(){
    return true;
  }

  IsShowNavBarIcons(){
    return true;
  }
  getIsLinksVisible(){
    return true;
  }

  logout(){
    return true;
  }
}
