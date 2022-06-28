import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicesRoutingModule } from './services-routing.module';
import { ServicesListComponent } from './components/services-list/services-list.component';
import { ServiceDetailsComponent } from './components/service-details/service-details.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [ServicesListComponent, ServiceDetailsComponent],
  imports: [SharedModule, CommonModule, ServicesRoutingModule],
})
export class ServicesModule {}
