import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RateServiceServiceService {

  constructor(
    private _httpClient : HttpClient) {
  }

  addRateService(requestModel : any){
    return this._httpClient.post(`${environment.apiUrl}/api/ServiceRate/Create` , requestModel);
  }
}
