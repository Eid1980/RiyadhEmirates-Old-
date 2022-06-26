import { TranslateService } from "@ngx-translate/core";
import { TranslationKeys } from "@shared/models/translation-keys";
import { BehaviorSubject } from "rxjs";
import { AppInjector } from "./app-injector";

export class Base {
  public lookups:any = {};

  public appMenus:any;

  public translationData:TranslationKeys =
    {languages: [], auth : [], home : [], electronic_council: []};

  public translate:TranslateService;

  private translateSubject = new BehaviorSubject({});

  public translationDataObs = this.translateSubject.asObservable();

  public isRTL : boolean = false;

  constructor(){

      const injector = AppInjector.getInjector();

      this.translate = injector.get(TranslateService);

      this.translateKeys();



      this.translate.onLangChange
      .subscribe((data : any) =>{
        this.translateKeys();
        if(data.lang == 'ar')
          this.isRTL = true;
        else{
          this.isRTL = false
        }

      })
  }

  private translateKeys(){
      this.translate.get([
        'languages',
        'auth',
        'home',
        'electronic_council'
      ]).subscribe(
          (translatedData : any) =>{
            this.translationData.languages = translatedData['languages'];
            this.translationData.auth = translatedData['auth'];
            this.translationData.home = translatedData['home'];
            this.translationData.electronic_council = translatedData['electronic_council'];

            this.translateSubject.next(this.translationData);
          }
      )
  }

}
