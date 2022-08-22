import { AfterViewChecked, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageType } from '@shared/enums/message-type.enum';
import { Service } from '@shared/enums/service.enum';
import { LookupDto } from '@shared/models/lookup-dto.model';
import { CreateRequestElectronicBoardDto, UpdateRequestElectronicBoardDto } from '@shared/models/request-electronic-board-models';
import { StepInfoModel } from '@shared/models/step-info-model';
import { GlobalService } from '@shared/services/global.service';
import { RequestElectronicBoardService } from '@shared/services/request-electronic-board.service';
import { RequestTypeService } from '@shared/services/request-type.service';

@Component({
  selector: 'app-electronic-council',
  templateUrl: './electronic-council.component.html',
  styleUrls: ['./electronic-council.component.scss']
})
export class ElectronicCouncilComponent implements OnInit, AfterViewChecked {

  @Output() onSubmit = new EventEmitter<StepInfoModel>();

  @Input() requestId: string

  activeIndex: number = 0;
  electronicBoardForm: FormGroup;
  createRequestElectronicBoardDto = {} as CreateRequestElectronicBoardDto;
  serviceId: number = Service.ElectronicBoard;
  requestTypes: LookupDto<number>[] = [];
  isFormSubmitted: boolean = false;

  constructor(private _formBuilder: FormBuilder,
    private _requestElectronicBoardService: RequestElectronicBoardService,
    private _requestTypeService: RequestTypeService,
    private _activatedRoute: ActivatedRoute,
    private _globalService: GlobalService) {
  }
  ngOnInit(): void {
    debugger
    this.buildForm();
    this.fillRequestType();

    if (!this.requestId)
      this.requestId = this._activatedRoute.snapshot.params['id'];

    if (this.requestId) {
      this.getDetails();
    }
  }

  ngAfterViewChecked() {
    debugger
  }

  formSubmit() {
    this.isFormSubmitted = true;
    if (this.electronicBoardForm.valid) {
      if (this.requestId) {
        const updateRequestElectronicSummonDto = { ...this.electronicBoardForm.value } as UpdateRequestElectronicBoardDto;
        updateRequestElectronicSummonDto.id = this.requestId;
        this._requestElectronicBoardService.update(updateRequestElectronicSummonDto).subscribe((response) => {
          //this._globalService.navigate(`/eservice/electronic-summon-attachments/${this.requestId}`);
          this.requestId = response.data.toString();
          this.nextPage();
        });
      }
      else {
        this.createRequestElectronicBoardDto = { ...this.electronicBoardForm.value } as CreateRequestElectronicBoardDto;
        this._requestElectronicBoardService.create(this.createRequestElectronicBoardDto).subscribe((response) => {
          //this._globalService.navigate(`/eservice/electronic-summon-attachments/${response.data}`);
          this.requestId = response.data;
          this.nextPage();
        });
      }
    }
  }

  buildForm() {
    this.electronicBoardForm = this._formBuilder.group({
      requestTypeId: [this.createRequestElectronicBoardDto.requestTypeId || null, Validators.required],
      requestTitle: [this.createRequestElectronicBoardDto.requestTitle || '', Validators.required],
      requestContent: [this.createRequestElectronicBoardDto.requestContent || null, Validators.required]
    });
  }
  fillRequestType() {
    this._requestTypeService.getLookupListByServiceId(this.serviceId).subscribe((response) => {
      this.requestTypes = response.data;
    });
  }
  getDetails() {
    this._requestElectronicBoardService.getById(this.requestId).subscribe((response) => {
      if (response.data.canEdit) {
        this.createRequestElectronicBoardDto = response.data;
        this.buildForm();
      }
      else {
        this._globalService.messageAlert(MessageType.Warning, "لا يمكن التعديل على الطلب في الوقت الحالي")
        this._globalService.navigateToRequesterDashboard();
      }
    });
  }

  nextPage() {
    let info: StepInfoModel = { nextStep: 2, requestId: this.requestId }
    this.onSubmit.emit(info)
  }

}
