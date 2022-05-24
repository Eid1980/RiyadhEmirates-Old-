import { Component, OnInit } from '@angular/core';
import { InquiryModel } from '@shared/Models/inquiry-model';
import { RequestModel } from '@shared/Models/request-model';
import { RequestService } from '@shared/services/request.service';
import { MessageService } from 'primeng/api';
import {TableModule} from 'primeng/table';
import {DialogModule} from 'primeng/dialog';
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

  constructor(
    private requsetService : RequestService,
    private messageService : MessageService,
    private _sharedService : SharedService,
    private _router: Router, 

    ) { 
      this.searchCriteria = new InquiryModel();
    }

  ngOnInit(): void {
    debugger
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

    // sort critera
    this.multiSortMeta = [];
    this.multiSortMeta.push({field: 'year', order: 1});
    this.multiSortMeta.push({field: 'brand', order: -1}); 
  }

  showDialog(selectedOrder : RequestModel) {
    this._sharedService.selectedRequest = selectedOrder;

    this._router.navigate(['/e-council/order-status']);
    
   /* this.selectedOrder = selectedOrder;
    this.display = true;*/
}

}
