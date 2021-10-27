import { Injectable } from '@angular/core';

@Injectable()
export class GeneralServiceMock {
  constructor() { }

isGuest=true;
 getisGuestLogin(): boolean {
    return this.isGuest;
  }

 setisGuestLogin(value: boolean) {
    
  }
  setLoginComplete(){

  }
}
