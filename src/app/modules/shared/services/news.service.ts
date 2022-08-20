import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '@shared/models/api-response.model';
import { GetNewsDetailsDto } from '@shared/models/news-models';
import { ServiceResponseVM } from '@shared/models/response-models';
import { SearchModel } from '@shared/models/search-models';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  serviceUrl: string = `${environment.apiUrl}api/News`;

  constructor(private httpClient:HttpClient) { }

  getALlPosters(entityName: string):Observable<any[]> {
    return this.httpClient.get<any[]>(`${environment.adminUrl}/api/FileManager/GetByEntityNameAndActive/${entityName}`)
  }

  getById = (id: number): Observable<ApiResponse<GetNewsDetailsDto>> => {
    return this.httpClient.get<ApiResponse<GetNewsDetailsDto>>(`${this.serviceUrl}/GetById/${id}`).pipe(
    );
  }


  getListPage(searchModel: SearchModel): Observable<ServiceResponseVM> {
    return this.httpClient
      .post(`${this.serviceUrl}/GetListPage`, searchModel)
      .pipe();
  }

  getAll(): Observable<ServiceResponseVM> {
    return this.httpClient
      .get(`${this.serviceUrl}/GetAll`)
  }

}
