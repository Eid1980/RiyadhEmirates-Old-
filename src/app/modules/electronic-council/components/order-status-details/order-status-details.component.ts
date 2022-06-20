import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestStatusEnum } from '@shared/enums/request-status-enum';
import { RequestModel } from '@shared/models/request-model';
import { UserModel } from '@shared/models/user-model';
import { RequestService } from '@shared/services/request.service';
import { UserService } from '@shared/services/user.service';
import { MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';
import * as html2pdf from 'html2pdf.js'


@Component({
  selector: 'app-order-status-details',
  templateUrl: './order-status-details.component.html',
  styleUrls: ['./order-status-details.component.scss'],
  providers: [MessageService],
})
export class OrderStatusDetailsComponent implements OnInit {
  @Input() seletedOrder: RequestModel; // decorate the property with @Input()

  userModel: UserModel;
  currentRequestInfo: RequestModel;

  messageReason: string = '';
  displayMessage: boolean = false;

  imagePath: string = environment.imagePathURL;

  requestStatus: string;
  requestStatusStyle : string ;
  loading : boolean;

  constructor(
    private _requestService: RequestService,
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute,
    private messageService: MessageService
  ) {
    this._route.params.subscribe((params) => {
      let requestId: number = params['id'];

      if (requestId != undefined) {
        this.loading = true;
        this._requestService.getRequestById(requestId).subscribe(
          (result: any) => {
            if (result.IsSuccess == true) {
              console.log(result.Data)
              this.currentRequestInfo = result.Data;
              this.requestStatus = result.Data.StatusMsgAr;
              this.setStatusColor(result.Data.RequestStatusId);
              if (result.Data.RequestStatusId == RequestStatusEnum.Rejected || result.Data.RequestStatusId == RequestStatusEnum.Edit)
                this.requestStatus =
                  this.requestStatus + ' بسبب ' + result.Data.StatusMessage;
            } else {
              this.messageService.add({
                severity: 'error',
                summary: 'خطأ',
                detail: 'خطأ',
              });
            }
          },
          (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'خطأ',
              detail: 'خطأ',
            });
          }
        );
      }
    });
  }

  ngOnInit(): void {
    this.userModel = this._userService.currentUser;
  }

  acceptRequest() {
    var updateRequestStatus = {
      requestId: this.currentRequestInfo.Id,
      NewStatusId: RequestStatusEnum.Pending,
    };

    this._requestService.updateRequest(updateRequestStatus).subscribe(
      (result: any) => {
        if (result.IsSuccess == true) {
          this.messageService.add({
            severity: 'success',
            summary: 'تم الارسال',
            detail: 'تم إرسال طلبك بنجاح',
          });
          setTimeout(() => {
            this._router.navigate(['/e-council/incoming-orders']);
          }, 3000);
        }
      },
      () => {}
    );
  }

  rejectRequest() {
    if (this.displayMessage) {
      var updateRequestStatus = {
        requestId: this.currentRequestInfo.Id,
        NewStatusId: RequestStatusEnum.Rejected,
        rejectMsg: this.messageReason,
      };
      this._requestService.updateRequest(updateRequestStatus).subscribe(
        (result: any) => {
          if (result.IsSuccess == true) {
            this._router.navigate(['/e-council/incoming-orders']);
            this.displayMessage = false;
          }
        },
        () => {}
      );
    } else {
      this.displayMessage = true;
    }
  }

  editRequest() {
    if (this.displayMessage) {
      var updateRequestStatus = {
        requestId: this.currentRequestInfo.Id,
        NewStatusId: RequestStatusEnum.Edit,
        rejectMsg: this.messageReason,
      };
      this._requestService.updateRequest(updateRequestStatus).subscribe(
        (result: any) => {
          if (result.IsSuccess == true) {
            this._router.navigate(['/e-council/incoming-orders']);
            this.displayMessage = false;
          }
        },
        () => {}
      );
    } else {
      this.displayMessage = true;
    }
  }

  print() {
    var element = document.getElementById('requestInfo');
    var opt = {
      margin:       1,
      filename:     'output.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 3},
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'landscape' }
    };

    // New Promise-based usage:
    html2pdf().from(element).set(opt).save();

    //window.print();
  }

  setStatusColor(requestStatusId : number){
    if(requestStatusId == RequestStatusEnum.New){
      this.requestStatusStyle = "alert alert-warning"
    }else if (requestStatusId == RequestStatusEnum.Accept){
      this.requestStatusStyle = "alert alert-primary"
    } else if (requestStatusId == RequestStatusEnum.Pending){
      this.requestStatusStyle = "alert alert-info"
    }else if (requestStatusId == RequestStatusEnum.Rejected){
      this.requestStatusStyle = "alert alert-danger"
    }else if (requestStatusId == RequestStatusEnum.Drafted){
      this.requestStatusStyle = "alert alert-light"
    }else {
      this.requestStatusStyle = "alert alert-primary"
    }

  }

}
