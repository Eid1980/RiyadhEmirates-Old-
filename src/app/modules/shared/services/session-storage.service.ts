import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  constructor() { }

  set(key: string, value: string) {
    sessionStorage.setItem(key, value);
  }

  setJSON(key: string, value: Object) {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  get(key: string): any {
    return sessionStorage.getItem(key);
  }

  remove(key: string) {
    sessionStorage.removeItem(key);
  }

  clear() {
    sessionStorage.clear();
  }
}
