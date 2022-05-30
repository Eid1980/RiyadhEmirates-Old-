import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private httpClient:HttpClient) { }

  getALlPosters(entityName: string):Observable<any[]> {
    return this.httpClient.get<any[]>(`${environment.adminUrl}/api/FileManager/GetByEntityNameAndActive/${entityName}`)
  }

  getALlEmiratesNews():Observable<any> {
    return this.httpClient.get<any[]>(`${environment.adminUrl}/api/EmiratesNews/GetAll`)
  }


  getALlLatesNews():Observable<any> {
    return this.httpClient.get<any>(`${environment.adminUrl}/api/LatestNews/GetAll`)
  }

  getALlReports():Observable<any> {
    return this.httpClient.get<any>(`${environment.adminUrl}/api/Reports/GetAll`)
  }
}
