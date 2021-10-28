import { Injectable } from '@angular/core';

@Injectable()
export class GeneralServiceMock {
  constructor() { }

isGuest=true;
SlideShowfiles=[];
 getisGuestLogin(): boolean {
    return this.isGuest;
  }

 setisGuestLogin(value: boolean) {
    
  }
  setLoginComplete(){

  }

  getSlideshowFiles(teamId:string){
    this.SlideShowfiles=['bannerd8a32383-b767-44e7-b48c-d15fbecc9a49.jpg']
  }
}
