import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './modules/shared/components/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/navigation/navigation.module').then(
        (x) => x.NavigationModule
      ),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((x) => x.AuthModule),
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
