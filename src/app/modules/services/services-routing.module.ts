import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServiceDetailsComponent } from './components/service-details/service-details.component';
import { ServicesListComponent } from './components/services-list/services-list.component';

const routes: Routes = [
  { path: '', component: ServicesListComponent },
  { path: 'services-list', component: ServicesListComponent },
  { path: 'details', component: ServiceDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServicesRoutingModule {}
