import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestStatusEnum } from '@shared/enums/request-status-enum';
import { RequestModel } from '@shared/Models/request-model';
import { UserModel } from '@shared/Models/user-model';
import { RequestService } from '@shared/services/request.service';
import { SharedService } from '@shared/services/shared.service';
import { UserService } from '@shared/services/user.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-order-status-details',
  templateUrl: './order-status-details.component.html',
  styleUrls: ['./order-status-details.component.scss'],
  providers: [MessageService]

})
export class OrderStatusDetailsComponent implements OnInit {

  @Input() seletedOrder : RequestModel; // decorate the property with @Input()

  userModel: UserModel;
  currentRequestInfo : RequestModel

  messageReason : string = "";
  displayMessage : boolean = false

  constructor(
    private _requestService : RequestService,
    private _sharedService : SharedService,
    private _userService: UserService,
    private _router: Router) { }

  ngOnInit(): void {
    this.userModel = this._userService.currentUser;
    this.currentRequestInfo = this._sharedService.selectedRequest;
  }

  acceptRequest(){
    debugger
    var updateRequestStatus = {requestId : this.currentRequestInfo.id , status : RequestStatusEnum.Pending};

    this._requestService.updateRequestStatus(updateRequestStatus).subscribe(
      (result : any) =>{
        if(result.code == 200){
          this._router.navigate(['/e-council/incoming-orders']);
        }

      },
      () => {}
    )

  }

  rejectRequest(){

    if(this.displayMessage){ 

        debugger
        var updateRequestStatus = {requestId : this.currentRequestInfo.id , status : RequestStatusEnum.Rejected , rejectMsg : this.messageReason};

        this._requestService.updateRequestStatus(updateRequestStatus).subscribe(
          (result : any) =>{
            if(result.code == 200){
              this._router.navigate(['/e-council/incoming-orders']);
              this.displayMessage = false
            }

          },
          () => {}
        )
    }else{
      this.displayMessage = true;
    }
  }

}
