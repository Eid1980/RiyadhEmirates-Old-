import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '@shared/models/api-response.model';
import {
  GetAttachmentsDto,
  GetRequestAttachmentsDto,
  GetRequestStageLogsDto, RequestChangeStageDto
} from '@shared/models/attachments-models';
import { InquiryModel } from '@shared/models/inquiry-model';
import { RequestModel } from '@shared/models/request-model';
import { SearchModel } from '@shared/models/search-models';
import { TypeCountModel } from '@shared/models/type-count-model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  serviceUrl: string = `${environment.apiUrl}api/Request`;

  constructor(private _httpClient: HttpClient) {
  }

  createRequest(requestModel: any) {
    return this._httpClient.post(`${environment.apiUrl}/api/request/create`, requestModel)
  }

  getRequestById(requestId: number) {
    return this._httpClient.get(`${environment.apiUrl}/api/request/getById/${requestId}`);
  }

  getRequests(searchCriteria: InquiryModel): Observable<RequestModel> {
    return this._httpClient.post<RequestModel>(`${environment.apiUrl}/api/request/Inquire`, searchCriteria)
  }

  updateRequest(updatedRequestModel: any) {
    return this._httpClient.post(`${environment.apiUrl}/api/request/update`, updatedRequestModel)
  }

  getDraftedRequests(): Observable<RequestModel> {
    return this._httpClient.post<RequestModel>(`${environment.apiUrl}/api/request/getDraftStatus`, { "": "" });
  }

  getAttachments = (id: string): Observable<ApiResponse<GetAttachmentsDto[]>> => {
    return this._httpClient.get<ApiResponse<GetAttachmentsDto[]>>(`${this.serviceUrl}/GetAttachments/${id}`).pipe(
    );
  }

  getRequestAttachments = (id: string): Observable<ApiResponse<GetRequestAttachmentsDto[]>> => {
    return this._httpClient.get<ApiResponse<GetRequestAttachmentsDto[]>>(`${this.serviceUrl}/GetRequestAttachments/${id}`)
      .pipe();
  }

  getRequestStageLogs = (id: string): Observable<ApiResponse<GetRequestStageLogsDto[]>> => {
    return this._httpClient.get<ApiResponse<GetRequestStageLogsDto[]>>(`${this.serviceUrl}/GetRequestStageLogs/${id}`).pipe(
    );
  }

  changeStage = (changeStageDto: RequestChangeStageDto): Observable<ApiResponse<number>> => {
    return this._httpClient.post<ApiResponse<number>>(`${this.serviceUrl}/ChangeStage`, changeStageDto).pipe();
  }

  inbox = (searchModel: SearchModel): Observable<ApiResponse<any>> => {
    return this._httpClient.post<ApiResponse<any>>(`${this.serviceUrl}/electroniccouncil/inbox`, searchModel).pipe();
  }

}
