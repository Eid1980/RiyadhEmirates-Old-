import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InquiryModel } from '@shared/models/inquiry-model';
import { RequestModel } from '@shared/models/request-model';
import { TypeCountModel } from '@shared/models/type-count-model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SessionStorageService } from './session-storage.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  header : HttpHeaders

  constructor(
    private _httpClient : HttpClient,
    private _userService :UserService,
    private _sessionService : SessionStorageService ) {

  }


  createRequest(requestModel : any){
    let token = this._sessionService.get('token');
    this.header = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    return this._httpClient.post(`${environment.apiUrl}/request/create` , requestModel , {headers : this.header});
  }

  getRequestById(requestId : number){
    let token = this._sessionService.get('token');
    this.header = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })

    return this._httpClient.get(`${environment.apiUrl}/request/getById/${requestId}` , {headers : this.header});
  }

  inquire(inquiryModel : any){
    let token = this._sessionService.get('token');

    this.header = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    return this._httpClient.post(`${environment.apiUrl}/request/Inquire` , inquiryModel , {headers : this.header});
  }

  // get user request
  getRequests(searchCriteria : InquiryModel) : Observable<RequestModel>{
    let token = this._sessionService.get('token');

    this.header = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    return this._httpClient.post<RequestModel>(`${environment.apiUrl}/request/Inquire` , searchCriteria , {headers : this.header});
  }

    // get user request
  getRequestsTypeCount() : Observable<TypeCountModel>{
    return this._httpClient.post<TypeCountModel>(`${environment.apiUrl}/request/getRequestTypeCount` , null , {headers : this.header});
  }

  updateRequestStatus(requestStatusModel : any){
    return this._httpClient.post(`${environment.apiUrl}/request/updateRequestStatus` , requestStatusModel , {headers : this.header});
  }

  getDraftedRequests() : Observable<RequestModel>{
    return this._httpClient.post<RequestModel>(`${environment.apiUrl}/request/getDraftStatus`, {"" : ""},  {headers : this.header});
  }

}
