import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { HelperFunctions } from '@shared/helpers/helper-functions';
import { DataAccessService } from '@shared/services/data-access.service';

@Injectable({
  providedIn: 'root'
})
export class ReportsService extends DataAccessService {
  serviceUrl: string;

  constructor(
    private _httpClient: HttpClient,
    private _helper: HelperFunctions
  ) {
    super(_httpClient, _helper, `${environment.ApiUrl}/api/Reports`);
    this.serviceUrl = `${environment.ApiUrl}/api/Reports`;
  }
}
