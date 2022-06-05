import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ListPosterComponent } from "./components/poster/list-poster/list-poster.component";
import { AddPosterComponent } from "./components/poster/add-poster/add-poster.component";
import { EditPosterComponent } from "./components/poster/edit-poster/edit-poster.component";
import { EmiratesNewsAddComponent } from "./components/emirates-news/emirates-news-add/emirates-news-add.component";
import { EmiratesNewsListComponent } from "./components/emirates-news/emirates-news-list/emirates-news-list.component";
import { EmiratesNewsEditComponent } from "./components/emirates-news/emirates-news-edit/emirates-news-edit.component";
import { EmiratesNewsViewComponent } from "./components/emirates-news/emirates-news-view/emirates-news-view.component";
import { LatestNewsListComponent } from "./components/latest-news/latest-news-list/latest-news-list.component";
import { LatestNewsAddComponent } from "./components/latest-news/latest-news-add/latest-news-add.component";
import { LatestNewsEditComponent } from "./components/latest-news/latest-news-edit/latest-news-edit.component";
import { LatestNewsViewComponent } from "./components/latest-news/latest-news-view/latest-news-view.component";
import { ReportsListComponent } from "./components/reports/reports-list/reports-list.component";
import { ReportsAddComponent } from "./components/reports/reports-add/reports-add.component";
import { ReportsEditComponent } from "./components/reports/reports-edit/reports-edit.component";
import { ReportsViewComponent } from "./components/reports/reports-view/reports-view.component";
import { AuthGuard } from "@shared/services/auth.guard";
import { LayoutComponent } from "@shared/components/layout/layout.component";

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "poster-list",
        component: ListPosterComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "poster-add",
        component: AddPosterComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "poster-edit",
        component: EditPosterComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "emirates-news-add",
        component: EmiratesNewsAddComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "emirates-news-edit",
        component: EmiratesNewsEditComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "emirates-news-list",
        component: EmiratesNewsListComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "emirates-news-view",
        component: EmiratesNewsViewComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "latest-news-list",
        component: LatestNewsListComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "latest-news-add",
        component: LatestNewsAddComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "latest-news-edit",
        component: LatestNewsEditComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "latest-news-view",
        component: LatestNewsViewComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "reports-list",
        component: ReportsListComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "reports-add",
        component: ReportsAddComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "reports-edit",
        component: ReportsEditComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "reports-view",
        component: ReportsViewComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "",
        redirectTo: "index",
        pathMatch: "full"
      }
    ],
    component: LayoutComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataManagementRoutingModule {}
