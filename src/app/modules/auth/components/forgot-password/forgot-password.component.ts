import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ForgetPasswordStages } from '@shared/enums/forget-password-stages.enum';
import { MessageType } from '@shared/enums/message-type.enum';
import { ForgetPasswordDto, ResetPasswordDto, ValidateOTPDto } from '@shared/models/account-models';
import { ApiResponse } from '@shared/models/api-response.model';
import { AuthService } from '@shared/services/auth.service';
import { GlobalService } from '@shared/services/global.service';
import { TranslationService } from '@shared/services/translation.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  providers: [MessageService],
})
export class ForgotPasswordComponent implements OnInit {

  get currentLang() {
    return this._translateService.getCurrentLanguage().Name;
  }
  stage: number
  userName: string;
  otp: string;
  newPassword: string;

  forgetPasswordForm = this.fb.group({
    userName: ['', Validators.required],
  });

  constructor(
    private _authService: AuthService,
    private _translateService: TranslationService,
    private fb: FormBuilder,
    private _router: Router,
    private _globalService: GlobalService,
  ) {

    this.userName = '';
    this.otp = '';
    this.newPassword = '';
    this.stage = ForgetPasswordStages.EnterUserName;
  }

  ngOnInit() {
  }


  forgetPassword() {
    let forgetPassword: ForgetPasswordDto = { userName: this.userName };

    this._authService.forgetPassword(forgetPassword).subscribe(
      (result: any) => {
        if (result.isSuccess == true) {
          this._globalService.messageAlert(
            MessageType.Success,
            this._translateService.instant('forgetPassword.messages.sentConfirmOTP')
          );
          if (this.stage != ForgetPasswordStages.EnterOTP) {
            this.stage = ForgetPasswordStages.EnterOTP;
          }
        } else {
          this._globalService.messageAlert(
            MessageType.Error,
            this._translateService.instant('forgetPassword.messages.errorWhileSendingRequest')
          );
        }
      },
      () => { }
    );
  }

  validateOTP() {
    let validateOTP: ValidateOTPDto = { userName: this.userName, oTP: this.otp };

    this._authService.validateOTP(validateOTP).subscribe(
      (result: ApiResponse<boolean>) => {
        if (result.isSuccess && result.data) {
          this._globalService.messageAlert(
            MessageType.Success,
            this._translateService.instant('forgetPassword.messages.otpIsCorrect')
          );

          this.stage = ForgetPasswordStages.SetNewPassword;
        } else {
          this._globalService.messageAlert(
            MessageType.Error,
            this._translateService.instant('forgetPassword.messages.invalidOTP')
          );
        }
      },
      (err) => { }
    );
  }

  resetPassword() {
    let resetPassword: ResetPasswordDto = { userName: this.userName, newPassword: this.newPassword };

    this._authService.resetPassword(resetPassword).subscribe(
      (result: ApiResponse<boolean>) => {
        if (result.isSuccess && result.data) {
          this._globalService.messageAlert(
            MessageType.Success,
            this._translateService.instant('forgetPassword.messages.resetPasswordSuccessfuly')
          );
          setTimeout(() => {
            this._router.navigate(['/auth/login']);
          }, 3000);
        }
      },
      (err) => { }
    );
  }

  // change language
  onChangeLang() {
    this._translateService.switchLanguage();
  }
}
