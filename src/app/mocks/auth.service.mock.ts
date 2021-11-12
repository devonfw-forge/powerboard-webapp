import { Injectable } from '@angular/core';

@Injectable()
export class AuthServiceMock {
  constructor() { }

guestLogin(){
    const home={
        My_Team:[],
        ADC_List:[
         {centerId: '98655bf7-ada7-495c-8019-8d7ab62d488e', centerName: 'ADCenter Valencia'},
         {centerId: '98755bf7-ada7-495c-8019-8d7ab62d488e', centerName: 'ADCenter Mumbai'}
        ],
        Teams_In_ADC: []
    }
    const loginResponse={
        homeResponse:home
    }
    return loginResponse;
}

Login(id:string,password:string){
const loginResponse='login successful'

return loginResponse;
}
}