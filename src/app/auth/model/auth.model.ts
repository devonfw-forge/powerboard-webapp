import { PowerboardResponse } from 'src/app/shared/model/general.model';

export class PowerboardLoginResponse {
  loginResponse: LoginResponse = new LoginResponse();
}
export class LoginResponse {
  userId: string;
  isPasswordChanged: boolean;
  privileges: string[];
  homeResponse: HomeResponse;
  powerboardResponse?: PowerboardResponse;
  loginResponse: PowerboardLoginResponse;
}

export class HomeResponse {
  My_Center: ADCDetails = new ADCDetails();
  My_Team?: TeamDetails[];
  Teams_In_ADC: TeamDetails[];
  ADC_List: ADCDetails[];
}

export class TeamDetails {
  teamId: string;
  teamLogo?: string;
  teamName: string;
  myRole?: string;
  teamStatus?: number;
}
export class ADCDetails {
  centerId: string;
  centerName: string;
}

export class PasswordResetForm {
  userId: string;
  oldPassword: string;
  newPassword: string;
}
