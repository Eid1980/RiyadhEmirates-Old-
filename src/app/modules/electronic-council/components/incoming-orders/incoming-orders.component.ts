import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestStatusEnum } from '@shared/enums/request-status-enum';
import { InquiryModel } from '@shared/Models/inquiry-model';
import { RequestModel } from '@shared/Models/request-model';
import { RequestService } from '@shared/services/request.service';
import { SharedService } from '@shared/services/shared.service';
import { MessageService } from 'primeng/api';
import {MenuItem} from 'primeng/api';


@Component({
  selector: 'app-incoming-orders',
  templateUrl: './incoming-orders.component.html',
  styleUrls: ['./incoming-orders.component.scss'],
  providers: [MessageService]

})
export class IncomingOrdersComponent implements OnInit {

  requests : RequestModel[];
  selectedOrder : RequestModel;
  searchCriteria: InquiryModel;
  multiSortMeta : any[]
  newRequest : number = RequestStatusEnum.New;
  pendingRequest : number = RequestStatusEnum.Pending;
  acceptRequest : number = RequestStatusEnum.Accept;
  rejectedRequest : number = RequestStatusEnum.Rejected;
  dreatedRequest : number = RequestStatusEnum.Drafted; 



  display: boolean = false;
  
  constructor( private requsetService : RequestService,
    private messageService: MessageService,
    private _sharedService : SharedService,
    private _router: Router) { }

  ngOnInit(): void {

    this.searchCriteria = new InquiryModel();  
    this.getRequests(this.newRequest);


    // sort critera
    this.multiSortMeta = [];
    this.multiSortMeta.push({field: 'year', order: 1});
    this.multiSortMeta.push({field: 'brand', order: -1}); 
  }

  showDialog(selectedOrder : RequestModel) {
    this.selectedOrder = selectedOrder;
    this.display = true;

    debugger
    this._sharedService.selectedRequest = selectedOrder;

    this._router.navigate(['/e-council/order-status']);
}

 getRequests(requestTypeId : number){
   debugger
  this.searchCriteria.requestStatusId = requestTypeId
  this.requsetService.getRequests(this.searchCriteria).subscribe(
    (result : any) => {
      console.log(result)
      if(result.code == 200){
        this.requests = result.data
      }else{
        this.messageService.add({severity:'error', summary: 'خطأ', detail: result.errorMessageAr});
      }
    },
    (error) => {
      this.messageService.add({severity:'error', summary: 'خطأ', detail: error});
    }
    );
 }

 onNewTabClick(id : any)
 {
  this.getRequests(id);
  console.log(id)
 }

 onPendingTabClick(id : any)
 {
  this.getRequests(id);
  console.log(id)
 }

 onAcceptTabClick(id : any)
 {
  this.getRequests(id);
  console.log(id)
 }

 onRejectedTabClick(id : any)
 {
  this.getRequests(id);
  console.log(id)
 }

}
