import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InquiryModel } from '@shared/Models/inquiry-model';
import { RequestModel } from '@shared/Models/request-model';
import { TypeCountModel } from '@shared/Models/type-count-model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  header : HttpHeaders

  constructor(
    private _httpClient : HttpClient,
    private _userService :UserService) {

      debugger
      let token = this._userService.currentUser?.token;

      this.header = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
  }


  createRequest(requestModel : any){
    debugger
    return this._httpClient.post(`${environment.apiUrl}/request/create` , requestModel , {headers : this.header});
  }

  inquire(inquiryModel : any){
    debugger
    return this._httpClient.post(`${environment.apiUrl}/request/Inquire` , inquiryModel , {headers : this.header});
  }

  // get user request
  getRequests(searchCriteria : InquiryModel) : Observable<RequestModel>{
    return this._httpClient.post<RequestModel>(`${environment.apiUrl}/request/Inquire` , searchCriteria , {headers : this.header});
  }


    // get user request
    getRequestsTypeCount() : Observable<TypeCountModel>{
      return this._httpClient.post<TypeCountModel>(`${environment.apiUrl}/request/getRequestTypeCount` , null , {headers : this.header});
    }

    updateRequestStatus(requestStatusModel : any){
      return this._httpClient.post(`${environment.apiUrl}/request/updateRequestStatus` , requestStatusModel , {headers : this.header});
    }
  
}
