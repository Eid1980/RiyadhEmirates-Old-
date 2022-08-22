import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestStatusEnum } from '@shared/enums/request-status-enum';
import { InquiryModel } from '@shared/models/inquiry-model';
import { RequestModel } from '@shared/models/request-model';
import { TypeCountModel } from '@shared/models/type-count-model';
import { RequestService } from '@shared/services/request.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-incoming-requests',
  templateUrl: './incoming-requests.component.html',
  styleUrls: ['./incoming-requests.component.scss'],
})
export class IncomingRequestsComponent implements OnInit {

  requests: RequestModel[];
  selectedOrder: RequestModel;
  searchCriteria: InquiryModel;
  multiSortMeta: any[];
  newRequest: number = RequestStatusEnum.New;
  pendingRequest: number = RequestStatusEnum.Pending;
  acceptRequest: number = RequestStatusEnum.Accept;
  rejectedRequest: number = RequestStatusEnum.Rejected;
  dreatedRequest: number = RequestStatusEnum.Drafted;

  requestTypeCount: TypeCountModel[];

  first: number = 0;
  types: any[];
  loading: boolean = true;
  display: boolean = false;
  messageReason: string = '';

  constructor(
    private _requsetService: RequestService,
    private _messageService: MessageService,
    private _router: Router
  ) {
    this.types = [
      { label: 'طلب', value: 'طلب' },
      { label: 'إقتراح', value: 'إقتراح' },
      { label: 'شكوي', value: 'شكوي' },
    ];

    // sort critera
    this.multiSortMeta = [];
    this.multiSortMeta.push({ field: 'requestTypeAr', order: 1 });
    this.multiSortMeta.push({ field: 'statusMsgAr', order: -1 });
  }

  ngOnInit(): void {
    this.searchCriteria = new InquiryModel();

    /*this._requsetService.getRequestsTypeCount().subscribe(
      (result: any) => {
        this.requestTypeCount = result.Data;
      },
      () => {}
    );*/

    this.getRequests(this.newRequest);

    // sort critera
    this.multiSortMeta = [];
    this.multiSortMeta.push({ field: 'year', order: 1 });
    this.multiSortMeta.push({ field: 'brand', order: -1 });
  }

  showDialog(selectedRequest: RequestModel) {
    //this.display = true;

    this._router.navigate(['/e-council/order-status/' + selectedRequest.Id]);
  }

  getRequests(requestTypeId: number) {
    this.searchCriteria.requestStatusId = requestTypeId;
    this._requsetService.getRequests(this.searchCriteria).subscribe(
      (result: any) => {
        console.log(result);

        if (result.IsSuccess == true) {
          this.requests = result.Data;
          this.loading = false;
        } else {
          this._messageService.add({
            severity: 'error',
            summary: 'خطأ',
            detail: result.errorMessageAr,
          });
        }
      },
      (error) => {
        this._messageService.add({
          severity: 'error',
          summary: 'خطأ',
          detail: error,
        });
      }
    );
  }

  onNewTabClick(id: any) {
    this.getRequests(id);
    console.log(id);
  }

  onPendingTabClick(id: any) {
    this.getRequests(id);
    console.log(id);
  }

  onAcceptTabClick(id: any) {
    this.getRequests(id);
    console.log(id);
  }

  onRejectedTabClick(id: any) {
    this.getRequests(id);
    console.log(id);
  }

  showConfirmDialog(request: RequestModel) {
    this.selectedOrder = request;
    if (this.display == false) {
      this.display = true;
    }
  }

  updateRequestStatus(request: RequestModel, newRequestStatus: number) {
    var updateRequestStatus = {
      requestId: request.Id,
      NewStatusId: newRequestStatus,
      RejectMsg: this.messageReason,
    };
    this._requsetService.updateRequest(updateRequestStatus).subscribe(
      (result: any) => {
        if (result.IsSuccess == true) {
          if (newRequestStatus == RequestStatusEnum.Pending) {
            this._messageService.add({
              severity: 'success',
              summary: 'تم الارسال',
              detail: 'تم إرسال طلبك بنجاح',
            });
          } else if (newRequestStatus == RequestStatusEnum.Rejected) {
            this._messageService.add({
              severity: 'success',
              summary: 'تم التخديث',
              detail: 'تم الاعتذار عن الطلب',
            });
            this.display = false;
          }

          this.requests = this.requests.filter((r) => r.Id != request.Id);
        }
      },
      () => { }
    );
  }

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
