import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient : HttpClient) { }

  login(loginModel : any){
    return this.httpClient.post(`${environment.apiUrl}/authenticate/login` , loginModel);
  }

  register(registerModel : any){
    console.log('register')
    console.log(registerModel)
    return this.httpClient.post(`${environment.apiUrl}/authenticate/register` , registerModel);
  }

  
}
