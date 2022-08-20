import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageType } from '@shared/enums/message-type.enum';
import { Service } from '@shared/enums/service.enum';
import { Stages } from '@shared/enums/stage.enum';
import { RequestChangeStageDto } from '@shared/models/attachments-models';
import { GlobalService } from '@shared/services/global.service';
import { RequestService } from '@shared/services/request.service';
import { MenuItem } from 'primeng/api';
import { RateServiceComponent } from '../rate-service/rate-service.component';

@Component({
  selector: 'app-electronic-council-preview-step',
  templateUrl: './electronic-council-preview-step.component.html',
  styleUrls: ['./electronic-council-preview-step.component.scss']
})
export class ElectronicCouncilPreviewStepComponent implements OnInit {

  @ViewChild(RateServiceComponent, { static: true }) rateServiceComponent: RateServiceComponent;

  @Input() requestId: string;
  serviceId: number = Service.ElectronicSummon;
  showServiceRate: boolean = false;
  redirectUrl: string = "/eservice/my-requests";
  accept: boolean = false;

  constructor(private _requestService: RequestService,
    private _globalService: GlobalService,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    //this.globalService.setTitle("خدمة الاستدعاء الالكتروني");
    //this.requestId = this.activatedRoute.snapshot.params['id'];
    //this.getWizardItems();
  }
  sendRequest() {

    if (this.accept) {
      this._globalService.showConfirm('هل تريد متأكد من ارسال طلب استدعاء الكتروني؟');
      this._globalService.confirmSubmit = () => this.isconfirm();
    }
    else {
      this._globalService.messageAlert(MessageType.Warning, 'برجاء الموافقة على الشروط والأحكام')
    }
  }

  isconfirm() {
    const requestChangeStageDto = {
      id: this.requestId,
      stageId: Stages.NewRequest,
      notes: ''
    } as RequestChangeStageDto
    this._requestService.changeStage(requestChangeStageDto).subscribe((response) => {
      this._globalService.showMessage(response.message);
      this.showServiceRate = true;
      //this.rateServiceComponent.buildForm();
      this._globalService.navigate('/e-council/my-orders');
    });
    this._globalService.clearMessages();
  }

  navigate(event: boolean) {
    if (!event) {
      //this.globalService.navigateToRequesterDashboard();
    }
  }
}
