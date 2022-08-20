import { Component, OnInit } from '@angular/core';
import { InquiryModel } from '@shared/models/inquiry-model';
import { RequestModel } from '@shared/models/request-model';
import { RequestService } from '@shared/services/request.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { RequestStatusEnum } from '@shared/enums/request-status-enum';
import { SearchModel } from '@shared/models/search-models';
import { Service } from '@shared/enums/service.enum';
import { ApiResponse } from '@shared/models/api-response.model';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss'],
  providers: [MessageService],
})
export class MyOrdersComponent implements OnInit {
  requests: RequestModel[];
  selectedOrder: RequestModel;
  searchCriteria: InquiryModel;
  multiSortMeta: any[];

  display: boolean = false;

  first: number = 0;

  types: any[];

  value: any;

  loading: boolean = true;

  constructor(
    private _requsetService: RequestService,
    private _messageService: MessageService,
    private _router: Router
  ) {
    this.searchCriteria = new InquiryModel();

    this.types = [
      { label: 'طلب', value: 'طلب' },
      { label: 'إقتراح', value: 'إقتراح' },
      { label: 'شكوي', value: 'شكوي' },
    ];
  }

  ngOnInit(): void {

    let searchModel: SearchModel = {
      SearchFields: [
        {
          FieldName: "ServiceId",
          Operator: "Equal",
          Value: Service.ElectronicBoard.toString()
        }
      ]
    }

    this._requsetService.inbox(searchModel).subscribe((result: ApiResponse<any>) => {
      if (result.isSuccess) {
        this.requests = result.data.gridItemsVM
        console.log(this.requests)
        this.loading = false;
      } else {
        this._messageService.add({
          severity: 'error',
          summary: 'خطأ',
          detail: "",
        });
      }

    },
      (error) => {
        this._messageService.add({
          severity: 'error',
          summary: 'خطأ',
          detail: error,
        });
      })

    // sort critera
    this.multiSortMeta = [];
    this.multiSortMeta.push({ field: 'requestTypeAr', order: 1 });
    this.multiSortMeta.push({ field: 'statusMsgAr', order: -1 });
  }

  showDialog(selectedRequest) {
    this._router.navigate(['/e-council/electronic-board-view/'+selectedRequest.id]);

    /*if (selectedRequest.RequestStatusId == RequestStatusEnum.Edit) {
      this._router.navigate(['/e-council/electronic-board-view', selectedRequest.Id]);
    } else {
      this._router.navigate(['/e-council/order-status/' + selectedRequest.Id]);
    }*/
  }

  reset() {
    this.first = 0;
  }

  filter(value: any) { }

  getStatusColor(requestStatusId: number) {
    if (requestStatusId == RequestStatusEnum.New) {
      return 'alert alert-warning';
    } else if (requestStatusId == RequestStatusEnum.Accept) {
      return 'alert alert-primary';
    } else if (requestStatusId == RequestStatusEnum.Pending) {
      return 'alert alert-info';
    } else if (requestStatusId == RequestStatusEnum.Rejected) {
      return 'alert alert-danger';
    } else if (requestStatusId == RequestStatusEnum.Drafted) {
      return 'alert alert-light';
    } else {
      return 'alert alert-primary';
    }
  }
}
