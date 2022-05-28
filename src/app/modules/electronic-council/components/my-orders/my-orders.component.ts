import { Component, OnInit } from '@angular/core';
import { InquiryModel } from '@shared/models/inquiry-model';
import { RequestModel } from '@shared/models/request-model';
import { RequestService } from '@shared/services/request.service';
import { MessageService } from 'primeng/api';
import { SharedService } from '@shared/services/shared.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss'],
  providers: [MessageService]

})
export class MyOrdersComponent implements OnInit {

  requests : RequestModel[];
  selectedOrder : RequestModel;
  searchCriteria: InquiryModel;
  multiSortMeta : any[]

  display: boolean = false;

  first: number = 0;

  types: any[];

  value : any

  loading: boolean = true;

  constructor(
    private requsetService : RequestService,
    private messageService : MessageService,
    private _sharedService : SharedService,
    private _router: Router, 

    ) { 
      this.searchCriteria = new InquiryModel();

      this.types = [
        {label: 'طلب', value: 'طلب'},
        {label: 'إقتراح', value: 'إقتراح'},
        {label: 'شكوي', value: 'شكوي'}    ]
    }

  ngOnInit(): void {
    debugger
    this.requsetService.getRequests(this.searchCriteria).subscribe(
    (result : any) => {
      console.log(result)
      if(result.code == 200){
        this.requests = result.data
        this.loading = false;
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

  showDialog(selectedOrder : RequestModel) {
    this._sharedService.selectedRequest = selectedOrder;

    this._router.navigate(['/e-council/order-status']);
  
}

reset() {
  this.first = 0;
}

filter(value: any){

  console.log('jjjjjjjjjjj')

}
}