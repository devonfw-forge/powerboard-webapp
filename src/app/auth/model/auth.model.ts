import { PowerboardResponse } from 'src/app/shared/model/general.model';

export class PowerboardLoginResponse {
  loginResponse: LoginResponse = new LoginResponse();
 
}
export class LoginResponse {
  userId: string;
  isPasswordChanged: boolean;
  My_Center: ADCDetails = new ADCDetails();
  privileges: string[];
  My_Team?: TeamDetails[];
  Teams_In_ADC: TeamDetails[];
  ADC_List: ADCDetails[];
  powerboardResponse?: PowerboardResponse;
}
/* export class MyCenterDetails { 
    centerId : string;
    centerName: string;
} */

export class TeamDetails {
  teamId: string;
  teamName: String;
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
