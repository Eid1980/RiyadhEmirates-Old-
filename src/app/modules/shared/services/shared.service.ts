import { Injectable } from '@angular/core';
import { RequestModel } from '@shared/Models/request-model';

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
