import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedRoutingModule } from './shared-routing.module';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { CoreLayoutComponent } from './components/core-layout/core-layout.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { NotAuthorizedComponent } from './components/not-authorized/not-authorized.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { FormsModule } from '@angular/forms';
import { MessageModule } from 'primeng/message';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import {TableModule} from 'primeng/table';
import {DialogModule} from 'primeng/dialog';
import { NgxHijriGregorianDatepickerModule } from 'ngx-hijri-gregorian-datepicker';
import {TabMenuModule} from 'primeng/tabmenu';
import {FileUploadModule} from 'primeng/fileupload';
import { HigriDatePipe } from './pipes/higri-date.pipe';
import { LoaderComponent } from './components/loader/loader.component';

import { ProgressSpinnerModule } from "primeng/progressspinner";
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AuthLayoutComponent,
    CoreLayoutComponent,
    HeaderComponent,
    NotAuthorizedComponent,
    FooterComponent,
    PageNotFoundComponent,
    HigriDatePipe,
    LoaderComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedRoutingModule,
    ProgressSpinnerModule,
    MessageModule,
    ButtonModule,
    ToastModule,
    TableModule,
    DialogModule,
    NgxHijriGregorianDatepickerModule,
    TabMenuModule,
    FileUploadModule,
    // TranslateModule.forChild({
    //   loader: {
    //     provide: TranslateLoader,
    //     useFactory: HttpLoaderFactory,
    //     deps: [HttpClient],
    //   },
    // }),
  ],
  exports: [
    CommonModule,
    AuthLayoutComponent,
    CoreLayoutComponent,
    HeaderComponent,
    FooterComponent,
    PageNotFoundComponent,
    MessageModule,
    ButtonModule,
    ToastModule,
    TableModule,
    DialogModule,
    NgxHijriGregorianDatepickerModule,
    TabMenuModule,
    FileUploadModule,
    ProgressSpinnerModule,
    TranslateModule
  ],
})
export class SharedModule {}
