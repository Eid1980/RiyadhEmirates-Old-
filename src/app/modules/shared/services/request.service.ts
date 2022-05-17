import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InquiryModel } from '@shared/Models/inquiry-model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private httpClient : HttpClient) { }


  createRequest(requestModel : any){
    return this.httpClient.post(`${environment.apiUrl}/request/create` , requestModel);
  }

  inquire(inquiryModel : any){
    return this.httpClient.post(`${environment.apiUrl}/request/Inquire` , inquiryModel);
  }
}
