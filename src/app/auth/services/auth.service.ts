import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { promise } from 'protractor';
import { environment } from '../../../environments/environment';
import {
  HomeResponse,
  PasswordResetForm,
  PowerboardLoginResponse,
} from '../model/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) 
  {
   }

   public async Login(userName: string, password: string): Promise<PowerboardLoginResponse> {
    return await this.http
      .post<PowerboardLoginResponse>(
        environment.globalEndPoint + environment.loginEndPoint,
        {
          username: userName,     
          password: password            

        }
      ).toPromise();
      
  }

  public async resetPassword(resetPassword : PasswordResetForm): Promise<any>{
       return await this.http.put<any>(environment.globalEndPoint + environment.resetPasswordEndPonit, resetPassword).toPromise();
  }

  public async guestLogin(): Promise<HomeResponse> {
    return await this.http
      .post<HomeResponse>(
        environment.globalEndPoint + environment.guestLoginEndPoint,
        {
          username: "guest",  
          password: "guest"              

        }
      ).toPromise();
      
  }
}
