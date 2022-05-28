import { Injectable } from '@angular/core';
import { RequestModel } from '@shared/models/request-model';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  // TODO
  selectedRequest : RequestModel

  constructor() { 
    this.selectedRequest = new RequestModel();
  }
}
