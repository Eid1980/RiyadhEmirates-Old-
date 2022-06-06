import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestStatusEnum } from '@shared/enums/request-status-enum';
import { InquiryModel } from '@shared/models/inquiry-model';
import { RequestModel } from '@shared/models/request-model';
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


  first: number = 0;

  types: any[];

  loading: boolean = true;

  display: boolean = false;

  constructor( private requsetService : RequestService,
    private messageService: MessageService,
    private _sharedService : SharedService,
    private _router: Router) {

      this.types = [
        {label: 'طلب', value: 'طلب'},
        {label: 'إقتراح', value: 'إقتراح'},
        {label: 'شكوي', value: 'شكوي'}    ]
     }

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

    this._sharedService.selectedRequest = selectedOrder;

    this._router.navigate(['/e-council/order-status']);
}

 getRequests(requestTypeId : number){

  this.searchCriteria.requestStatusId = requestTypeId
  this.requsetService.getRequests(this.searchCriteria).subscribe(
    (result : any) => {
      console.log(result)
      
      if(result.IsSuccess == true){
        this.requests = result.Data
        this.loading = false
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
