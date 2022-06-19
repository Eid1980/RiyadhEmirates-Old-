import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestStatusEnum } from '@shared/enums/request-status-enum';
import { InquiryModel } from '@shared/models/inquiry-model';
import { RequestModel } from '@shared/models/request-model';
import { RequestService } from '@shared/services/request.service';
import { SharedService } from '@shared/services/shared.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-saved-orders',
  templateUrl: './saved-orders.component.html',
  styleUrls: ['./saved-orders.component.scss'],
  providers: [MessageService]

})
export class SavedOrdersComponent implements OnInit {

  requests : RequestModel[];
  selectedOrder : RequestModel;
  searchCriteria: InquiryModel;
  multiSortMeta : any[]

  display: boolean = false;

  loading : boolean = true;

  types: any[];

  first: number = 0;

  constructor(
    private requsetService : RequestService,
    private messageService : MessageService,
    private _sharedService : SharedService,
    private _requestService : RequestService,
    private _router: Router,
  ) {
    this.searchCriteria = new InquiryModel();

    this.types = [
      {label: 'طلب', value: 'طلب'},
      {label: 'إقتراح', value: 'إقتراح'},
      {label: 'شكوي', value: 'شكوي'}    ]
   }

  ngOnInit(): void {

    let inquire = {requestStatusId : RequestStatusEnum.Drafted};

    this.requsetService.inquire(inquire).subscribe(
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

      // sort critera
      this.multiSortMeta = [];
      this.multiSortMeta.push({field: 'year', order: 1});
      this.multiSortMeta.push({field: 'brand', order: -1});
  }

  showReuestInfo(selectedOrder : RequestModel) {
    debugger;
    this._sharedService.selectedRequest = selectedOrder;

    this._router.navigate(['/e-council/create' , selectedOrder.Id]);
}

sendRequest(selectedOrder : RequestModel){
  var updateRequestStatus = {requestId : selectedOrder.Id , NewStatusId : RequestStatusEnum.New };

  this._requestService.updateRequest(updateRequestStatus).subscribe(
    (result : any) =>{
      if(result.IsSuccess == true){

      this.messageService.add({severity:'success', summary: 'تم الارسال', detail: 'تم إرسال طلبك بنجاح'});

      this.requests =  this.requests.filter(r =>r.Id != selectedOrder.Id);

     /* setTimeout(() => {
        this._router.navigate(['/e-council/my-orders']);
        } , 3000);*/
    }
  },
  (err) => {}
  )
}

}
