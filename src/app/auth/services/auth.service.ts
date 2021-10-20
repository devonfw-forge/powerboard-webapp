import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { promise } from 'protractor';
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
    return await this.http
      .post<PowerboardLoginResponse>(environment.restPathRoot + 'v1/auth/login', {
        username: userName, //'raj11',
        password: password, //'password'
      })
      .toPromise();
  }

  public async resetPassword(resetPassword: PasswordResetForm): Promise<any> {
    return await this.http
      .put<any>(environment.restPathRoot + 'v1/auth/change-password', resetPassword)
      .toPromise();
  }

  public async guestLogin(): Promise<PowerboardLoginResponse> {
    return await this.http
      .post<PowerboardLoginResponse>(
        environment.restPathRoot + 'v1/auth/login/guest',
        {
          username: 'guest',
          password: 'guest',
        }
      )
      .toPromise();
  }
}
