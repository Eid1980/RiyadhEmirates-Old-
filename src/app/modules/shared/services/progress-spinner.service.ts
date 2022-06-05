import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgressSpinnerService {
  constructor() {}
  isLoading = new Subject<boolean>();
  isActive = this.isLoading.asObservable();

  show() {
    this.isLoading.next(true);
  }
  hide() {
    this.isLoading.next(false);
  }
}
