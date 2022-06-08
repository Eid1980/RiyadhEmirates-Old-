import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InquiryModel } from '@shared/models/inquiry-model';
import { RequestModel } from '@shared/models/request-model';
import { RequestService } from '@shared/services/request.service';
import { SharedService } from '@shared/services/shared.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-draft-requests',
  templateUrl: './draft-requests.component.html',
  styleUrls: ['./draft-requests.component.scss']
})
export class DraftRequestsComponent implements OnInit {


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

    this.requsetService.getDraftedRequests().subscribe(
      (result : any) => {
        console.log(result)
        if(result.IsSuccess == true){
          this.requests = result.Data
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

    this._router.navigate(['/e-council/create']);

   /* this.selectedOrder = selectedOrder;
    this.display = true;*/
}
}
