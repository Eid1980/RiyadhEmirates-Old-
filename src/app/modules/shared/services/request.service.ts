import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InquiryModel } from '@shared/Models/inquiry-model';
import { RequestModel } from '@shared/Models/request-model';
import { Observable } from 'rxjs';
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

  // get user request
  getRequests(searchCriteria : InquiryModel) : Observable<RequestModel>{
    return this.httpClient.post<RequestModel>(`${environment.apiUrl}/request/Inquire` , searchCriteria);
  }

}
