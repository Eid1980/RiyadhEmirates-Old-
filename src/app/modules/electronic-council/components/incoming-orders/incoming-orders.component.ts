import { Component, OnInit } from '@angular/core';
import { InquiryModel } from '@shared/Models/inquiry-model';
import { RequestModel } from '@shared/Models/request-model';
import { RequestService } from '@shared/services/request.service';
import { MessageService } from 'primeng/api';

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

  display: boolean = false;
  
  constructor( private requsetService : RequestService,
    private messageService: MessageService,) { }

  ngOnInit(): void {

    this.searchCriteria = new InquiryModel();
    this.searchCriteria.requestTypeId = 1
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
    this.selectedOrder = selectedOrder;
    this.display = true;
}

}
