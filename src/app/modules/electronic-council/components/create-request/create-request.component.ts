import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RequestStatusEnum } from '@shared/enums/request-status-enum';
import { UserModel } from '@shared/models/user-model';
import { RequestService } from '@shared/services/request.service';
import { UserService } from '@shared/services/user.service';
import { MessageService } from 'primeng/api';
import { DateFormatterService } from 'ngx-hijri-gregorian-datepicker';
import { RequestModel } from '@shared/models/request-model';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { StepInfoModel } from '@shared/models/step-info-model';

@Component({
  selector: 'app-create-request',
  templateUrl: './create-request.component.html',
  styleUrls: ['./create-request.component.scss'],
  providers: [MessageService]

})

export class CreateRequestComponent implements OnInit {

  @ViewChild('inputFile') inputFile: ElementRef;

  wizardItems: MenuItem[];

  activeIndex: number = 0;
  currentStep: number = 1

  userModel: UserModel

  requestId: string
  requestStatusId: number

  isRateService: boolean

  constructor(private _userService: UserService,
    private fb: FormBuilder,
    private _router: Router,
    private messageService: MessageService,
    private dateFormatterService: DateFormatterService,
    private _translate: TranslateService) {

    this.isRateService = false;
  }

  ngOnInit(): void {

    this.wizardItems = [
      { label: 'بيانات الطلب' },
      { label: 'المرفقات' },
      { label: 'ارسال الطلب' }
    ];

    this.userModel = this._userService.currentUser;

    this.activeIndex = 0
    this.currentStep = 1

  }

  changeActiveIndex(index) {

  }

  saveRequestInfo(info : StepInfoModel) {
    this.requestId = info.requestId;
    this.activeIndex = info.nextStep - 1;
    this.currentStep = info.nextStep;
  }

  saveRequestAttachment(nextStep) {
    this.activeIndex = nextStep - 1;
    this.currentStep = nextStep;
  }
}
