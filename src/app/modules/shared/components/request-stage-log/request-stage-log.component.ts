import { Component, Input, OnInit } from '@angular/core';
import { GetRequestStageLogsDto } from '@shared/models/attachments-models';
import { RequestService } from '@shared/services/request.service';

@Component({
  selector: 'app-request-stage-log',
  templateUrl: './request-stage-log.component.html',
  styleUrls: ['./request-stage-log.component.scss']
})
export class RequestStageLogComponent implements OnInit {

  @Input() requestId: string;
  requestStageLogsDto = [] as GetRequestStageLogsDto[];

  constructor(private _requestService: RequestService)
  {
  }

  ngOnInit(): void {
    if (this.requestId) {
      this._requestService.getRequestStageLogs(this.requestId).subscribe((response) => {
        this.requestStageLogsDto = response.data;
      });
    }
  }

}
