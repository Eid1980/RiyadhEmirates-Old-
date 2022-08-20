import { Component, OnInit } from '@angular/core';
import { GetUserDataDto } from '@shared/models/account-models';
import { AuthService } from '@shared/services/auth.service';

@Component({
  selector: 'app-user-data-view',
  templateUrl: './user-data-view.component.html',
  styleUrls: ['./user-data-view.component.scss']
})
export class UserDataViewComponent implements OnInit {

  userDataDto = {} as GetUserDataDto;

  constructor(private _accountService: AuthService) { }

  ngOnInit(): void {
  }

  initializeForm(userId?: number) {
      this._accountService.getAuthUser().subscribe((response : any) => {
        this.userDataDto = response.data;
      });
  }

}
