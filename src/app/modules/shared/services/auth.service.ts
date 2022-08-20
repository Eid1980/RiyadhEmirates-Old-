import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ForgetPasswordDto, ResetPasswordDto, ValidateOTPDto } from '@shared/models/account-models';
import { ApiResponse } from '@shared/models/api-response.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SessionStorageService } from './session-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient : HttpClient) {
  }

  login(loginModel : any){
    return this.httpClient.post(`${environment.apiUrl}api/account/login` , loginModel);
  }

  register(registerModel : any){
    return this.httpClient.post(`${environment.apiUrl}api/account/register` , registerModel);
  }

  getAuthUser(){
    return this.httpClient.get(`${environment.apiUrl}api/account/getAuthUser`  );
  }

  forgetPassword(foregetPassword : ForgetPasswordDto ){
    return this.httpClient.post(`${environment.apiUrl}api/account/forgetPassword` , foregetPassword );
  }

  validateOTP(validateOTP : ValidateOTPDto) : Observable<ApiResponse<boolean>>{
    return this.httpClient.post<ApiResponse<boolean>>(`${environment.apiUrl}api/account/validateOTP` , validateOTP );
  }

  resetPassword(resetPassword : ResetPasswordDto) : Observable<ApiResponse<boolean>>{
    return this.httpClient.post<ApiResponse<boolean>>(`${environment.apiUrl}api/account/resetPassword` , resetPassword );
  }

  // TODO
  // remove this function from here
  getNtationalities(){
    return this.httpClient.get(`${environment.apiUrl}api/Nationalities/get/all`);
  }
}
