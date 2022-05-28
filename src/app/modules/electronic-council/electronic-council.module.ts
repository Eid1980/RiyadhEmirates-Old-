import { NgModule } from '@angular/core';

import { ElectronicCouncilRoutingModule } from './electronic-council-routing.module';
import { SharedModule } from '@shared/shared.module';
import { ServiceDetailsComponent } from './components/service-details/service-details.component';
import { CreateRequestComponent } from './components/create-request/create-request.component';
import { OrderStatusDetailsComponent } from './components/order-status-details/order-status-details.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { SavedOrdersComponent } from './components/saved-orders/saved-orders.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserDashboradComponent } from './components/user-dashborad/user-dashborad.component';
import { UserSidemenuComponent } from './components/user-sidemenu/user-sidemenu.component';
import { OrderInquiryComponent } from './components/order-inquiry/order-inquiry.component';
import { RateServiceComponent } from './components/rate-service/rate-service.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IncomingOrdersComponent } from './components/incoming-orders/incoming-orders.component';
import { TableComponent } from './components/table/table.component';
import { DraftRequestsComponent } from './components/draft-requests/draft-requests.component';
import {DropdownModule} from 'primeng/dropdown';
import {ImageModule} from 'primeng/image';




@NgModule({
  declarations: [
    ServiceDetailsComponent,
    CreateRequestComponent,
    OrderStatusDetailsComponent,
    MyOrdersComponent,
    SavedOrdersComponent,
    UserProfileComponent,
    UserDashboradComponent,
    UserSidemenuComponent,
    OrderInquiryComponent,
    RateServiceComponent,
    IncomingOrdersComponent,
    TableComponent,
    DraftRequestsComponent,

  ],
  imports: [
    ElectronicCouncilRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    ImageModule

  ]
})
export class ElectronicCouncilModule { }
