import { Component, OnInit } from '@angular/core';
import { UserModel } from '@shared/Models/user-model';
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
<<<<<<< HEAD
    
    debugger
    this.userModel.displayName = this.userService.currentUser?.displayName
    this.userModel.email = this.userService.currentUser?.email
    this.userModel.address = this.userService.currentUser?.address
    this.userModel.phoneNumber = this.userService.currentUser?.phoneNumber
    this.userModel.role = this.userService.currentUser?.role;

    console.log(typeof(this.userService.currentUser))
  }
=======
>>>>>>> 93e5b58ab7c796c4a9ff1214719a952529f6aca3

    this.userModel.displayName = this.userService.currentUser?.displayName;
    this.userModel.email = this.userService.currentUser?.email;
    this.userModel.address = this.userService.currentUser?.address;
    this.userModel.phoneNumber = this.userService.currentUser?.phoneNumber;

    console.log(typeof this.userService.currentUser);
  }

  ngOnInit(): void {}
}
