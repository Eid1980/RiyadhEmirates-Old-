import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@shared/services/auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  providers: [MessageService]

})
export class ForgotPasswordComponent implements OnInit {

  state : number  = 1 // 1 => eneter userName, 2 => eneter otp, 3 => eneter new password

  placeHolderText : string = "ادخل اسم المستخدم"

  inputText : string = ""

  userName : string = ""

  constructor(private _authService : AuthService,
    private _messageService: MessageService,
    private _router: Router,
    ) { }

  ngOnInit() {
  }

  btnClick(){

    if(this.state == 1 )
    {
      this.userName = this.inputText;
      let forgetPassword : any = {UserName  : this.userName};
      this._authService.forgetPassword(forgetPassword).subscribe(
        (result : any) => {
          if(result.IsSuccess == true){
            this._messageService.add({severity:'success', summary: 'تم الارسال', detail: 'تم ارسال الرقم التاكيدي الي البريد الالكتروني'});
            this.updatePlaceHolder(++this.state);
          }
        } ,
        () => {}
      )
    }

    if(this.state == 2 )
    {
      let validateOTP : any = {UserName  : this.userName  , OTP : this.inputText};
      this._authService.validateOTP(validateOTP).subscribe(
        (result : any) => {
          if(result.IsSuccess == true){
            this._messageService.add({severity:'success', summary: 'تم  التخقق', detail: 'تم التحقق من ارمز التاكيدي'});
            this.updatePlaceHolder(++this.state);
          }else{
            this._messageService.add({severity:'error', summary: 'تم  التخقق', detail: 'الرمز التأكيدي غير صحيح'});
          }
        } ,
        () => {}
      )
    }

    if(this.state == 3 )
    {
      let resetPassword : any = {UserName  : this.userName , NewPassword : this.inputText};
      this._authService.resetPassword(resetPassword).subscribe(
        (result : any) => {
          if(result.IsSuccess == true){
            this._messageService.add({severity:'success', summary: 'تم  التحديث', detail: 'تم تحديث كلمة السر بيجاح '});
            setTimeout(() =>{
              this._router.navigate(['/auth/login']);
            } , 3000)

          }
        } ,
        () => {}
      )
    }
  }

  updatePlaceHolder(state : number){
    switch(state)
    {
      case 1 :

        break;
      case 2:
        this.placeHolderText = "ادخل الرمز التاكيدي";
        this.inputText = ""
        break;
      case 3:
        this.placeHolderText = "ادخل كلمة السر الجديدة";
        this.inputText =""
        break;

    }
  }

}
