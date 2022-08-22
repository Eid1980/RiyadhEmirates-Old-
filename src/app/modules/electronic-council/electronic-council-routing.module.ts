import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@shared/services/auth.guard';
import { CreateRequestComponent } from './components/create-request/create-request.component';
import { DraftRequestsComponent } from './components/draft-requests/draft-requests.component';
import { EditRequestComponent } from './components/edit-request/edit-request.component';
import { ElectronicBoardViewComponent } from './components/electronic-board-view/electronic-board-view.component';
import { ElectronicCouncilAttachmentsComponent } from './components/electronic-council-attachments/electronic-council-attachments.component';
import { ElectronicCouncilPreviewStepComponent } from './components/electronic-council-preview-step/electronic-council-preview-step.component';
import { ElectronicCouncilComponent } from './components/electronic-council/electronic-council.component';
import { IncomingRequestsComponent } from './components/incoming-requests/incoming-requests.component';
import { MyRequestsomponent } from './components/my-requests/my-requests.component';
import { RateServiceComponent } from './components/rate-service/rate-service.component';
import { RequestStatusDetailsComponent } from './components/request-status-details/request-status-details.component';
import { RequestsInquireComponent } from './components/requests-inquire/requests-inquire.component';
import { SavedOrdersComponent } from './components/saved-orders/saved-orders.component';
import { ServiceDetailsComponent } from './components/service-details/service-details.component';
import { UserDashboradComponent } from './components/user-dashborad/user-dashborad.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

const routes: Routes = [
  { path: 'request/edit/:id', component: EditRequestComponent, canActivate: [AuthGuard] },
  { path: 'create', component: CreateRequestComponent, canActivate: [AuthGuard] },
  { path: 'update/:id', component: CreateRequestComponent, canActivate: [AuthGuard] },
  { path: 'my-requests', component: MyRequestsomponent, canActivate: [AuthGuard] },
  { path: 'inquire', component: RequestsInquireComponent },
  { path: 'request-status/:id', component: RequestStatusDetailsComponent, canActivate: [AuthGuard] },
  { path: 'rate', component: RateServiceComponent },
  { path: 'saved', component: SavedOrdersComponent },
  { path: 'service-details', component: ServiceDetailsComponent },
  { path: 'dashboard', component: UserDashboradComponent },
  { path: 'profile', component: UserProfileComponent },
  { path: 'incoming-orders', component: IncomingRequestsComponent, canActivate: [AuthGuard] },
  { path: 'draft-requests', component: DraftRequestsComponent, canActivate: [AuthGuard] },

  {
    path: 'electronic-council',
    component: ElectronicCouncilComponent,
  },
  {
    path: 'electronic-council/:id',
    component: ElectronicCouncilComponent,
  },
  {
    path: 'electroic-council-attachments/:id',
    component: ElectronicCouncilAttachmentsComponent,
  },
  {
    path: 'electroic-council-preview-step/:id',
    component: ElectronicCouncilPreviewStepComponent,
  },
  {
    path: 'electroic-council-view/:id',
    component: ElectronicCouncilPreviewStepComponent,
  },

  {
    path: 'electronic-board-view/:id',
    component: ElectronicBoardViewComponent,
    canActivate: [AuthGuard],
  },

  { path: '', redirectTo: 'service-details', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ElectronicCouncilRoutingModule { }
