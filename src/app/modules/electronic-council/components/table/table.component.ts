import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import {TableModule} from 'primeng/table';
import {DialogModule} from 'primeng/dialog';
import { RequestModel } from '@shared/models/request-model';
import { InquiryModel } from '@shared/models/inquiry-model';
import { RequestService } from '@shared/services/request.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  requests : RequestModel[];
  selectedOrder : RequestModel;
  searchCriteria: InquiryModel;
  multiSortMeta : any[]

  display: boolean = false;

  constructor( private requsetService : RequestService,
    private messageService: MessageService,) { }

  ngOnInit(): void {

    //items: MenuItem[];

    this.searchCriteria = new InquiryModel();
    this.searchCriteria.requestTypeId = 1
    this.requsetService.getRequests(this.searchCriteria).subscribe(
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
    this.selectedOrder = selectedOrder;
    this.display = true;
}

}
