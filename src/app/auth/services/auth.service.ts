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
  /**
   *  
   * Inject HTTPClient to send various HTTP requests
   */
  constructor(private http: HttpClient) {}
/**
 * Sends HTTP POST request to rest API to log into the application
 * 
 */
  public async Login(
    userName: string,
    password: string
  ): Promise<PowerboardLoginResponse> {
    return this.http
    .post<PowerboardLoginResponse>(environment.globalEndPoint+ UrlPathConstants.loginEndPoint, {
      username: userName,
      password: password, 
    })
    .toPromise();
  }
/**
 * 
 * @param resetPassword 
 * Sends HTTP PUT request to rest API to rest the password
 */
  public async resetPassword(resetPassword: PasswordResetForm): Promise<any> {
    return this.http
      .put<any>(environment.globalEndPoint + UrlPathConstants.resetPasswordEndPonit, resetPassword)
      .toPromise();
  }

  /**
   * Sends HTTP POST request to rest API for guest user to log into the application
   * 
   */
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
