import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from '@shared/models/user-model';
import { UserService } from '@shared/services/user.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  userModel : UserModel
  isAuthenticate =true;

  constructor(
    private _userService : UserService,
    private router: Router
    ) {
      if(_userService.currentUser.Id == undefined || _userService.currentUser.Id == "")
      this.isAuthenticate = false;
    }

  ngOnInit() {
    this.userModel = this._userService.currentUser;
  }

  logout(){
    this._userService.logout();

    this.router.navigate(['/auth/login']);
  }
}
