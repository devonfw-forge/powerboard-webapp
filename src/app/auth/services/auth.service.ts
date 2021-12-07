import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlPathConstants } from 'src/app/UrlPaths';
import { environment } from '../../../environments/environment';
import {
  PasswordResetForm,
  PowerboardLoginResponse,
} from '../model/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  public async Login(
    userName: string,
    password: string
  ): Promise<PowerboardLoginResponse> {
    return this.http
    .post<PowerboardLoginResponse>(environment.globalEndPoint+ UrlPathConstants.loginEndPoint, {
      username: userName, //'raj11',
      password: password, //'password'
    })
    .toPromise();
  }

  public async resetPassword(resetPassword: PasswordResetForm): Promise<any> {
    return this.http
      .put<any>(environment.globalEndPoint + UrlPathConstants.resetPasswordEndPonit, resetPassword)
      .toPromise();
  }

  public async guestLogin(): Promise<PowerboardLoginResponse> {
    return this.http
      .post<PowerboardLoginResponse>(
        environment.globalEndPoint + UrlPathConstants.guestLoginEndPoint,
        {
          username: UrlPathConstants.guestUserName,
          password: UrlPathConstants.guestPassword,
        }
      )
      .toPromise();
  }
}
