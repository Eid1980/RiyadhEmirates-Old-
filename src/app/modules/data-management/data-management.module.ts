import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { DataManagementRoutingModule } from './data-management-routing.module';
import { AddPosterComponent } from './components/poster/add-poster/add-poster.component';
import { EditPosterComponent } from './components/poster/edit-poster/edit-poster.component';
import { ListPosterComponent } from './components/poster/list-poster/list-poster.component';
import { EmiratesNewsAddComponent } from './components/emirates-news/emirates-news-add/emirates-news-add.component';
import { EmiratesNewsListComponent } from './components/emirates-news/emirates-news-list/emirates-news-list.component';
import { EmiratesNewsEditComponent } from './components/emirates-news/emirates-news-edit/emirates-news-edit.component';
import { EmiratesNewsViewComponent } from './components/emirates-news/emirates-news-view/emirates-news-view.component';
import { LatestNewsAddComponent } from './components/latest-news/latest-news-add/latest-news-add.component';
import { LatestNewsListComponent } from './components/latest-news/latest-news-list/latest-news-list.component';
import { LatestNewsEditComponent } from './components/latest-news/latest-news-edit/latest-news-edit.component';
import { LatestNewsViewComponent } from './components/latest-news/latest-news-view/latest-news-view.component';
import { ReportsAddComponent } from './components/reports/reports-add/reports-add.component';
import { ReportsEditComponent } from './components/reports/reports-edit/reports-edit.component';
import { ReportsListComponent } from './components/reports/reports-list/reports-list.component';
import { ReportsViewComponent } from './components/reports/reports-view/reports-view.component';

@NgModule({
  declarations: [
     AddPosterComponent, 
     EditPosterComponent, 
     ListPosterComponent, 
     EmiratesNewsAddComponent, 
     EmiratesNewsListComponent, 
     EmiratesNewsEditComponent, 
     EmiratesNewsViewComponent,
     LatestNewsAddComponent,
     LatestNewsListComponent,
     LatestNewsEditComponent,
     LatestNewsViewComponent,
     ReportsAddComponent,
     ReportsEditComponent,
     ReportsListComponent,
     ReportsViewComponent
    ],
  imports: [CommonModule, DataManagementRoutingModule, SharedModule]
})
export class DataManagementModule { }
