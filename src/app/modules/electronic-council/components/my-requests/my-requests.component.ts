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
import { Stages } from '@shared/enums/stage.enum';

@Component({
  selector: 'app-my-requests',
  templateUrl: './my-requests.component.html',
  styleUrls: ['./my-requests.component.scss'],
})
export class MyRequestsomponent implements OnInit {
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
        debugger
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
    this._router.navigate(['/e-council/electronic-board-view/' + selectedRequest.id]);

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

  getStatusColor(requestStageId: number) {

    if (requestStageId == Stages.Draft) {
      return 'alert alert-primary';
    } else if (requestStageId == Stages.NewRequest) {
      return 'alert alert-secondary';
    } else if (requestStageId == Stages.CompleteDataFromRequester) {
      return 'alert alert-info';
    } else if (requestStageId == Stages.UnderProcessing) {
      return 'alert alert-warning';
    } else if (requestStageId == Stages.RequestRejected) {
      return 'alert alert-danger';
    } else{
      return 'alert alert-success';
    }
  }
}
