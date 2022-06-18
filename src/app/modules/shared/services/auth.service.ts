import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SessionStorageService } from './session-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  header : HttpHeaders

  constructor(private httpClient : HttpClient,
    private sessionService : SessionStorageService) {
  }

  login(loginModel : any){
    return this.httpClient.post(`${environment.apiUrl}/auth/login` , loginModel);
  }

  register(registerModel : any){
    return this.httpClient.post(`${environment.apiUrl}/auth/register` , registerModel);
  }

  getAuthUser(){
    let token = this.sessionService.get('token');

    this.header = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    return this.httpClient.get(`${environment.apiUrl}/auth/getAuthUser` , {headers :this.header} );
  }

  forgetPassword(foregetPassword : any ){
    return this.httpClient.post(`${environment.apiUrl}/auth/forgetPassword` , foregetPassword );
  }

  validateOTP(validateOTP : any){
    return this.httpClient.post(`${environment.apiUrl}/auth/validateOTP` , validateOTP );
  }

  resetPassword(resetPassword : any){
    return this.httpClient.post(`${environment.apiUrl}/auth/resetPassword` , resetPassword );
  }

  getNtationalities(){
    return this.httpClient.get(`${environment.apiUrl}/Nationalities/get/all`);
  }


}
