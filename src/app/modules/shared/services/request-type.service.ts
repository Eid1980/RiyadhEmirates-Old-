import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '@shared/models/api-response.model';
import { LookupDto } from '@shared/models/lookup-dto.model';
import { CreateRequestTypeDto, GetRequestTypeDetailsDto, GetRequestTypeListDto, UpdateRequestTypeDto } from '@shared/models/request-models';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RequestTypeService {

  serviceUrl: string = `${environment.apiUrl}api/RequestType`;
  constructor(public httpClient: HttpClient) {
  }

  getById = (id: number): Observable<ApiResponse<GetRequestTypeDetailsDto>> => {
    return this.httpClient.get<ApiResponse<GetRequestTypeDetailsDto>>(`${this.serviceUrl}/GetById/${id}`).pipe(
    );
  }
  getByServiceId = (serviceId: number): Observable<ApiResponse<GetRequestTypeListDto[]>> => {
    return this.httpClient.get<ApiResponse<GetRequestTypeListDto[]>>(`${this.serviceUrl}/GetByServiceId/${serviceId}`).pipe(
    );
  }

  create = (createdDto: CreateRequestTypeDto): Observable<ApiResponse<number>> => {
    return this.httpClient.post<ApiResponse<number>>(`${this.serviceUrl}/Create`, createdDto).pipe();
  }
  update = (updatedDto: UpdateRequestTypeDto): Observable<ApiResponse<number>> => {
    return this.httpClient.put<ApiResponse<number>>(`${this.serviceUrl}/Update`, updatedDto).pipe();
  }

  changeStatus = (id: number): Observable<ApiResponse<boolean>> => {
    return this.httpClient.get<ApiResponse<boolean>>(`${this.serviceUrl}/ChangeStatus/${id}`).pipe();
  }

  getLookupList = (): Observable<ApiResponse<LookupDto<number>[]>> => {
    return this.httpClient.get<ApiResponse<LookupDto<number>[]>>(`${this.serviceUrl}/GetLookupList`).pipe(
    );
  }
  getLookupListByServiceId = (serviceId: number): Observable<ApiResponse<LookupDto<number>[]>> => {
    return this.httpClient.get<ApiResponse<LookupDto<number>[]>>(`${this.serviceUrl}/GetLookupListByServiceId/${serviceId}`).pipe(
    );
  }
}
