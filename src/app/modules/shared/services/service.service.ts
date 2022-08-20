import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '@shared/models/api-response.model';
import { GetServiceDetailsDto, GetServiceListDto } from '@shared/models/service-models';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  serviceUrl: string = `${environment.apiUrl}-api/Service`;
  constructor(public httpClient: HttpClient) {
  }

  getById = (id: number): Observable<ApiResponse<GetServiceDetailsDto>> => {
    return this.httpClient.get<ApiResponse<GetServiceDetailsDto>>(`${this.serviceUrl}/GetById/${id}`).pipe(
    );
  }
  getByServiceId = (serviceId: number): Observable<ApiResponse<GetServiceListDto[]>> => {
    return this.httpClient.get<ApiResponse<GetServiceListDto[]>>(`${this.serviceUrl}/GetByServiceId/${serviceId}`).pipe(
    );
  }
  getAll = (): Observable<ApiResponse<GetServiceListDto[]>> => {
    return this.httpClient.get<ApiResponse<GetServiceListDto[]>>(`${this.serviceUrl}/GetAll`).pipe(
    );
  }
  searchByFilter = (filter: string): Observable<ApiResponse<GetServiceListDto[]>> => {
    return this.httpClient.get<ApiResponse<GetServiceListDto[]>>(`${this.serviceUrl}/SearchByFilter/${filter}`).pipe(
    );
  }

  changeStatus = (id: number): Observable<ApiResponse<boolean>> => {
    return this.httpClient.get<ApiResponse<boolean>>(`${this.serviceUrl}/ChangeStatus/${id}`).pipe();
  }
}
