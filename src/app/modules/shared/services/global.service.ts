import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor() { }

  convertToHijri(date:any, lang:string) {
    var date = date || new Date();
    lang = lang || 'en';
    var options = {
      year: 'numeric', month: 'long', day: 'numeric',weekday: 'long'
    };
    return date.toLocaleString(lang + '-u-ca-islamic', options);
  }
}
