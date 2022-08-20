import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserDataViewComponent } from '@shared/components/user-data-view/user-data-view.component';
import { MessageType } from '@shared/enums/message-type.enum';
import { GetRequestElectronicBoardDetailsDto } from '@shared/models/request-electronic-board-models';
import { GlobalService } from '@shared/services/global.service';
import { RequestElectronicBoardService } from '@shared/services/request-electronic-board.service';

@Component({
  selector: 'app-electronic-council-details',
  templateUrl: './electronic-council-details.component.html',
  styleUrls: ['./electronic-council-details.component.scss']
})
export class ElectronicCouncilDetailsComponent implements OnInit {
  @Input() requestId: string;
  requestElectronicSummonDetailsDto = {} as GetRequestElectronicBoardDetailsDto;
  @Input() showStatusLog: boolean = true;
  @ViewChild(UserDataViewComponent, { static: true }) userDataView: UserDataViewComponent;

  constructor(private requestElectronicSummonService: RequestElectronicBoardService,
    private _globalService: GlobalService,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    //this.requestId = this.activatedRoute.snapshot.params['id'];
    this.getDetails();
  }

  getDetails() {
    this.requestElectronicSummonService.getDetailsById(this.requestId).subscribe((response) => {
      if (!this.showStatusLog && !response.data.canEdit) {
        this._globalService.messageAlert(MessageType.Warning, "لا يمكن التعديل على الطلب في الوقت الحالي")
        this._globalService.navigateToRequesterDashboard();
      }
      this.requestElectronicSummonDetailsDto = response.data;
      this.userDataView.initializeForm(response.data.createdBy);
    });
  }
}
