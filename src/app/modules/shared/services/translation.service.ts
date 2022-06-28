import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageDirection } from '@shared/enums/language-direction';
import { LanguageName } from '@shared/enums/language-name.enum';
import { LanguageModel } from '@shared/Models/language-model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  private currentLang: LanguageModel = {
    Name: LanguageName.Arabic,
    Direction: LanguageDirection.RightToLeft,
  };
  // Observable Source
  private languageChangeSource = new Subject<LanguageModel>();

  // Observable Stream
  languageChange = this.languageChangeSource.asObservable();

  constructor(private translateService: TranslateService) {
    translateService.onLangChange.subscribe(l => {
      this.languageChangeSource.next(this.currentLang);
    })
  }

  initializeLanguage() {
    if (
      !localStorage.getItem('lang') ||
      localStorage.getItem('lang') === null
    ) {

      localStorage.setItem('lang', this.currentLang.Name);
    }
    const langName =
      localStorage.getItem('lang') !== null
        ? localStorage.getItem('lang')
        : this.currentLang.Name;

    this.currentLang.Name = langName as LanguageName;
    this.currentLang.Direction =
      this.currentLang.Name == LanguageName.English
        ? LanguageDirection.LeftToRight
        : LanguageDirection.RightToLeft;

    this.translateService.use(this.currentLang.Name);
    document
      .getElementsByTagName('html')[0]
      .setAttribute('dir', this.currentLang.Direction);
  }

  switchLanguage() {
    window.location.reload();
    if (this.currentLang.Name == LanguageName.Arabic) {
      this.currentLang.Name = LanguageName.English;
      this.currentLang.Direction = LanguageDirection.LeftToRight;
    } else {
      this.currentLang.Name = LanguageName.Arabic;
      this.currentLang.Direction = LanguageDirection.RightToLeft;
    }
    localStorage.setItem('lang', this.currentLang.Name);
    this.translateService.use(this.currentLang.Name);
  }

  instant(key: string): any {
    return this.translateService.instant(key);
  }

  getCurrentLanguage(): LanguageModel {
    const langName =
      localStorage.getItem('lang') !== null
        ? localStorage.getItem('lang')
        : this.currentLang.Name;

    this.currentLang.Name = langName as LanguageName;
    this.currentLang.Direction =
      this.currentLang.Name == LanguageName.English
        ? LanguageDirection.LeftToRight
        : LanguageDirection.RightToLeft;

    return this.currentLang;
  }

}
