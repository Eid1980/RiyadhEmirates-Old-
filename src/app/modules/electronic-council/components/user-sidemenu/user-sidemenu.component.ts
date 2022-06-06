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
    this.userModel.Name = this.userService.currentUser?.Name
    this.userModel.Email = this.userService.currentUser?.Email
    this.userModel.Address = this.userService.currentUser?.Address
    this.userModel.PhoneNumber = this.userService.currentUser?.PhoneNumber
    this.userModel.Role = this.userService.currentUser?.Role;

    console.log(typeof(this.userService.currentUser))
  }

  ngOnInit(): void {}
}
