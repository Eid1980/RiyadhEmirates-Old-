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
import { UserSidemenuComponent } from './components/user-sidemenu/user-sidemenu.component';
import { OrderInquiryComponent } from './components/order-inquiry/order-inquiry.component';
import { RateServiceComponent } from './components/rate-service/rate-service.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageModule } from 'primeng/message';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { AppModule } from 'src/app/app.module';


@NgModule({
  declarations: [
    ServiceDetailsComponent,
    CreateOrderComponent,
    OrderStatusDetailsComponent,
    MyOrdersComponent,
    SavedOrdersComponent,
    UserProfileComponent,
    UserDashboradComponent,
    UserSidemenuComponent,
    OrderInquiryComponent,
    RateServiceComponent
  ],
  imports: [
    ElectronicCouncilRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ElectronicCouncilModule { }
