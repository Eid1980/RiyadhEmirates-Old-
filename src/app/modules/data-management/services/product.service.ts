import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { HelperFunctions } from '@shared/helpers/helper-functions';
import { DataAccessService } from '@shared/services/data-access.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends DataAccessService {
  serviceUrl: string;

  constructor(
    private _httpClient: HttpClient,
    private _helper: HelperFunctions
  ) {
    super(_httpClient, _helper, `${environment.ApiUrl}/api/Product`);
    this.serviceUrl = `${environment.ApiUrl}/api/Product`;
  }

  getUnitList() {
    return this.httpClient.get(`${environment.ApiUrl}/api/Product/GetUnitList`)
  }
}