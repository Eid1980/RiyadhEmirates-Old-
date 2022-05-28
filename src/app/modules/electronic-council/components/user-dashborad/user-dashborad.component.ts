import { Component, OnInit } from '@angular/core';
import { TypeCountModel } from '@shared/models/type-count-model';
import { RequestService } from '@shared/services/request.service';

@Component({
  selector: 'app-user-dashborad',
  templateUrl: './user-dashborad.component.html',
  styleUrls: ['./user-dashborad.component.scss']
})
export class UserDashboradComponent implements OnInit {

  requestTypeCount : TypeCountModel[] 

  constructor(private _requestService : RequestService) { }

  ngOnInit(): void {
    this._requestService.getRequestsTypeCount().subscribe(
      (result : any) => {
        this.requestTypeCount = result.data
      },
      () => {}
    )
  }

}
