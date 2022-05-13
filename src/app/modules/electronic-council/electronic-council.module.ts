import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ElectronicCouncilRoutingModule } from './electronic-council-routing.module';
import { SharedModule } from '@shared/shared.module';
import { ServiceDetailsComponent } from './components/service-details/service-details.component';
import { CreateOrderComponent } from './components/create-order/create-order.component';
import { OrderStatusDetailsComponent } from './components/order-status-details/order-status-details.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { SavedOrdersComponent } from './components/saved-orders/saved-orders.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserDashboradComponent } from './components/user-dashborad/user-dashborad.component';


@NgModule({
  declarations: [
    ServiceDetailsComponent,
    CreateOrderComponent,
    OrderStatusDetailsComponent,
    MyOrdersComponent,
    SavedOrdersComponent,
    UserProfileComponent,
    UserDashboradComponent
  ],
  imports: [
    ElectronicCouncilRoutingModule,
    SharedModule
  ]
})
export class ElectronicCouncilModule { }
