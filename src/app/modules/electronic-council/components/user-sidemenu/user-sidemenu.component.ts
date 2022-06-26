import { Component, OnInit } from '@angular/core';
import { Base } from '@shared/core/base';
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
export class UserSidemenuComponent extends Base implements OnInit {
  userModel: UserModel;

  showRateServiceModal : boolean = false

  constructor(private _userService: UserService,
    private _rateService : RateServiceServiceService,
    private messageService: MessageService,
    ) {

      super();

      this.userModel = new UserModel();


      this.userModel.Name = this._userService.currentUser?.Name
      this.userModel.Email = this._userService.currentUser?.Email
      this.userModel.Address = this._userService.currentUser?.Address
      this.userModel.PhoneNumber = this._userService.currentUser?.PhoneNumber
      this.userModel.Role = this._userService.currentUser?.Role;
      this.userModel.IsAdmin = this._userService.currentUser?.IsAdmin;

    console.log(typeof(this._userService.currentUser))
  }

  ngOnInit(): void {}

  closeModal(){
    this.showRateServiceModal = false;
  }

  submitModal(starsCount : number){
    console.log('submit')
    console.log(starsCount)


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
