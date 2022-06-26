import { Injector, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '@shared/shared.module';
import { BrowserModule, Title } from '@angular/platform-browser';
import { MessagesModule } from 'primeng/messages';
import { FormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { AppInjector } from '@shared/core/app-injector';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

import {TranslateHttpLoader} from '@ngx-translate/http-loader';


@NgModule({
  declarations: [AppComponent],
  imports: [
    TranslateModule.forRoot(),

    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    FormsModule,
    MessagesModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  })
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private router: Router, private titleService: Title, private route: ActivatedRoute ,injector:Injector ) {
    AppInjector.setInjector(injector);
    router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
      }
    });
  }
}


// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
