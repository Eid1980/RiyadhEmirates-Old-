import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '@shared/models/api-response.model';
import { GetPosterDetailsDto } from '@shared/models/posters-models';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PosterService {

  serviceUrl: string = `${environment.apiUrl}api/Poster`;
  constructor(public httpClient: HttpClient) {
  }

  getById = (id: number): Observable<ApiResponse<GetPosterDetailsDto>> => {
    return this.httpClient.get<ApiResponse<GetPosterDetailsDto>>(`${this.serviceUrl}/GetById/${id}`).pipe(
    );
  }

  getAll = () : Observable<ApiResponse<GetPosterDetailsDto[]>> =>{
    return this.httpClient.get<ApiResponse<GetPosterDetailsDto[]>>(`${this.serviceUrl}/GetAll`).pipe();
  }

}
