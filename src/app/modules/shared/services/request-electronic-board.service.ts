import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '@shared/models/api-response.model';
import { CreateRequestElectronicBoardDto, GetRequestElectronicBoardDetailsDto, RequestElectronicBoardDto, UpdateRequestElectronicBoardDto } from '@shared/models/request-electronic-board-models';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SessionStorageService } from './session-storage.service';

@Injectable({
  providedIn: 'root'
})
export class RequestElectronicBoardService {

  serviceUrl: string = `${environment.apiUrl}api/RequestElectronicBoard`;

  constructor(public httpClient: HttpClient) {

  }

  getById = (id: string): Observable<ApiResponse<RequestElectronicBoardDto>> => {
    debugger
    return this.httpClient.get<ApiResponse<RequestElectronicBoardDto>>(`${this.serviceUrl}/GetById/${id}`).pipe(
    );
  }
  getDetailsById = (id: string): Observable<ApiResponse<GetRequestElectronicBoardDetailsDto>> => {
    return this.httpClient.get<ApiResponse<GetRequestElectronicBoardDetailsDto>>(`${this.serviceUrl}/GetDetailsById/${id}`)
    .pipe();
  }

  create = (createdDto: CreateRequestElectronicBoardDto): Observable<ApiResponse<string>> => {
    return this.httpClient.post<ApiResponse<string>>(`${this.serviceUrl}/Create`, createdDto).pipe();
  }
  update = (updatedDto: UpdateRequestElectronicBoardDto): Observable<ApiResponse<number>> => {
    return this.httpClient.put<ApiResponse<number>>(`${this.serviceUrl}/Update`, updatedDto).pipe();
  }
}
