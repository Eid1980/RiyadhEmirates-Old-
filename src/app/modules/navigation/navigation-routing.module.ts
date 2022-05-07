import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoreLayoutComponent } from '../shared/components/core-layout/core-layout.component';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('../home/home.module').then((x) => x.HomeModule),
      },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ],
    component: CoreLayoutComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, SharedModule],
})
export class NavigationRoutingModule {}
