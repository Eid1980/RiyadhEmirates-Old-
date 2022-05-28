import { Component, OnInit } from '@angular/core';
import { UserModel } from '@shared/models/user-model';
import { UserService } from '@shared/services/user.service';

@Component({
  selector: 'app-user-sidemenu',
  templateUrl: './user-sidemenu.component.html',
  styleUrls: ['./user-sidemenu.component.scss'],
})
export class UserSidemenuComponent implements OnInit {
  userModel: UserModel;

  constructor(private userService: UserService) {
    this.userModel = new UserModel();
    
    debugger
    this.userModel.displayName = this.userService.currentUser?.displayName
    this.userModel.email = this.userService.currentUser?.email
    this.userModel.address = this.userService.currentUser?.address
    this.userModel.phoneNumber = this.userService.currentUser?.phoneNumber
    this.userModel.role = this.userService.currentUser?.role;

    console.log(typeof(this.userService.currentUser))
  }

  ngOnInit(): void {}
}
