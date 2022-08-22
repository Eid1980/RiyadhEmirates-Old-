import { NgModule } from '@angular/core';

import { ElectronicCouncilRoutingModule } from './electronic-council-routing.module';
import { SharedModule } from '@shared/shared.module';
import { ServiceDetailsComponent } from './components/service-details/service-details.component';
import { CreateRequestComponent } from './components/create-request/create-request.component';
import { RequestStatusDetailsComponent } from './components/request-status-details/request-status-details.component';
import { MyRequestsomponent } from './components/my-requests/my-requests.component';
import { SavedOrdersComponent } from './components/saved-orders/saved-orders.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserDashboradComponent } from './components/user-dashborad/user-dashborad.component';
import { UserSidemenuComponent } from './components/user-sidemenu/user-sidemenu.component';
import { RequestsInquireComponent } from './components/requests-inquire/requests-inquire.component';
import { RateServiceComponent } from './components/rate-service/rate-service.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IncomingRequestsComponent } from './components/incoming-requests/incoming-requests.component';
import { TableComponent } from './components/table/table.component';
import { DraftRequestsComponent } from './components/draft-requests/draft-requests.component';
import { DropdownModule } from 'primeng/dropdown';
import { ImageModule } from 'primeng/image';
import { DialogModule } from 'primeng/dialog';
import { EditRequestComponent } from './components/edit-request/edit-request.component';
import { ElectronicCouncilAttachmentsComponent } from './components/electronic-council-attachments/electronic-council-attachments.component';
import { ElectronicCouncilComponent } from './components/electronic-council/electronic-council.component';
import { ElectronicCouncilPreviewStepComponent } from './components/electronic-council-preview-step/electronic-council-preview-step.component';
import { StepsModule } from 'primeng/steps';
import { ElectronicCouncilDetailsComponent } from './components/electronic-council-details/electronic-council-details.component';
import { ElectronicBoardViewComponent } from './components/electronic-board-view/electronic-board-view.component';


@NgModule({
  declarations: [
    ServiceDetailsComponent,
    CreateRequestComponent,
    RequestStatusDetailsComponent,
    MyRequestsomponent,
    SavedOrdersComponent,
    UserProfileComponent,
    UserDashboradComponent,
    UserSidemenuComponent,
    RequestsInquireComponent,
    RateServiceComponent,
    IncomingRequestsComponent,
    TableComponent,
    DraftRequestsComponent,
    EditRequestComponent,
    ElectronicCouncilAttachmentsComponent,
    ElectronicCouncilComponent,
    ElectronicCouncilPreviewStepComponent,
    ElectronicCouncilDetailsComponent,
    ElectronicBoardViewComponent,
  ],
  imports: [
    ElectronicCouncilRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    ImageModule,
    DialogModule,
    StepsModule,

  ],
})
export class ElectronicCouncilModule {}
