import { Component, OnInit } from '@angular/core';
import { RateService } from '@shared/models/rate-service';
import { UserModel } from '@shared/models/user-model';
import { RateServiceServiceService } from '@shared/services/rate-service-service.service';
import { UserService } from '@shared/services/user.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-user-sidemenu',
  templateUrl: './user-sidemenu.component.html',
  styleUrls: ['./user-sidemenu.component.scss'],
  providers: [MessageService],

})
export class UserSidemenuComponent implements OnInit {
  userModel: UserModel;

  showRateServiceModal : boolean = false

  constructor(private _userService: UserService,
    private _rateService : RateServiceServiceService,
    private messageService: MessageService,
    ) {
    this.userModel = new UserModel();

    debugger
    this.userModel.nameAr = this._userService.currentUser?.nameAr
    this.userModel.nameEn = this._userService.currentUser?.nameEn
    this.userModel.shortNameAr = this._userService.currentUser?.shortNameAr;
    this.userModel.shortNameEn = this._userService.currentUser?.shortNameEn;
    this.userModel.email = this._userService.currentUser?.email;
    this.userModel.phoneNumber = this._userService.currentUser?.phoneNumber
    this.userModel.address = this._userService.currentUser?.address
  }

  ngOnInit(): void {}

  closeModal(){
    this.showRateServiceModal = false;
  }

  submitModal(starsCount : number){
    let serviceRate : any = {StarsCount : starsCount}

    this._rateService.addRateService(serviceRate).subscribe(
      (result : any) => {
        if(result.IsSuccess == true){
          this.messageService.add({severity:'success', summary: 'تم الحفظ', detail: 'تك حفظ تقييمك بنجاح'});
        }
      },
      (err) => {
        this.messageService.add({severity:'error', summary: 'خطأ', detail: 'خطأ'});

      }
    )
    this.showRateServiceModal = false;
  }

  close(event : any){
  }
}
