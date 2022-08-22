import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MessageType } from '@shared/enums/message-type.enum';
import { MenuItem, MessageService } from 'primeng/api';
import { Subject, throwError } from 'rxjs';
import { GlobalOptions } from './global-options';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(private _titleService: Title,
    private messageService: MessageService,
    private router: Router) { }

  public setTitle(newTitle: string) {
    this._titleService.setTitle('إمارة منطقة الرياض | ' + newTitle);
  }
  public setAdminTitle(newTitle: string) {
    this._titleService.setTitle('لوحة التحكم | ' + newTitle);
  }

  //#region Messaging
  public messageAlert(messageType: MessageType, message: string) {
    switch (messageType) {
      case MessageType.Success:
        this.messageService.add({ severity: 'success', summary: 'عملية ناجحة', detail: message });
        break;
      case MessageType.Info:
        this.messageService.add({ severity: 'info', summary: '', detail: message });
        break;
      case MessageType.Warning:
        this.messageService.add({ severity: 'warn', summary: 'تنبيه', detail: message });
        break;
      case MessageType.Error:
        this.messageService.add({ severity: 'error', summary: 'خطأ', detail: message });
        break;
    }
  }
  public showMessage(msg: string): void {
    if (msg) {
      var msgArray = msg.split(',');
      this.messageService.add({ severity: msgArray[0], summary: msgArray[1], detail: msgArray[2] });
    }
  }

  public showConfirm(message: string) {
    this.clearMessages();
    this.messageService.add({ key: 'confirm', sticky: true, severity: 'warn', summary: message });
  }
  confirm() {
    this.confirmSubmit();
  }
  confirmSubmit: Function;
  public clearMessages() {
    this.messageService.clear('confirm');
  }
  //#endregion

  convertToHijri(date, lang) {
    var date = date || new Date();
    lang = lang || 'en';
    var options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
    };
    return date.toLocaleString(lang + '-u-ca-islamic', options);
  }

  errorHandler(error: HttpErrorResponse) {
    if (error.status === 401) {
      this.messageService.add({ severity: 'error', summary: '', detail: 'ليس لديك صلاحية لدخول هذة الصفحة' });
      setTimeout(() => {
        document.location.href = '/auth/login';
      }, 3000);
    } else {
      this.messageService.add({ severity: 'error', summary: '', detail: 'حدث خطأ ما من قبل الخادم (server)' });
    }
    return throwError(error);
  }

  navigate(url: string) {
    this.router.navigate([url]);
  }
  navigateToInbox() {
    this.router.navigate(["/admin/eservice-admin/inbox"]);
  }
  navigateToRequesterDashboard() {
    this.router.navigate(["/e-council/my-requests"]);
  }

  //#region markAllControls
  markAllControls(formGroup: FormGroup, options?: Partial<GlobalOptions.ControlOptions>) {
    const defaultOptions = { markAsDirty: true, updateValueAndValidity: true } as GlobalOptions.ControlOptions;
    this.markFormGroup(formGroup, { ...defaultOptions, ...options });
  }
  markFormGroup(formGroup: FormGroup, options: GlobalOptions.ControlOptions) {
    Object.keys(formGroup.controls).forEach(key => {
      if (formGroup.get(key) instanceof FormGroup) {
        this.markFormGroup(formGroup.get(key) as FormGroup, options);
      }
      else if (formGroup.get(key) instanceof FormArray) {
        this.markFormArray(formGroup.get(key) as FormArray, options);
      }
      else if (formGroup.get(key) instanceof FormControl) {
        this.markFormControl(formGroup.get(key) as FormControl, options);
      }
    });
  }
  markFormArray(formArray: FormArray, options: GlobalOptions.ControlOptions) {
    formArray.controls.forEach(control => {
      if (control instanceof FormGroup) {
        this.markFormGroup(control as FormGroup, options);
      }
      else if (control instanceof FormArray) {
        this.markFormArray(control as FormArray, options);
      }
      else if (control instanceof FormControl) {
        this.markFormControl(control as FormControl, options);
      }
    });
  }

  markFormControl(formControl: FormControl, options: GlobalOptions.ControlOptions) {
    if (options.markAsDirty) formControl.markAsDirty();
    if (options.updateValueAndValidity) formControl.updateValueAndValidity();
  }
  //#endregion

  //#region Breadcrumb
  _breadcrumbItems = [] as MenuItem[];
  subject = new Subject();
  changeBreadcrumbItems(breadcrumbItems: MenuItem[]) {
    this._breadcrumbItems = breadcrumbItems;
    this.subject.next(this._breadcrumbItems);
  }
  //#end region

}
