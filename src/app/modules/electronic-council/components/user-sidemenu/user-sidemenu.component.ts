import { Component, OnInit } from '@angular/core';
import { UserService } from '@shared/services/user.service';

@Component({
  selector: 'app-user-sidemenu',
  templateUrl: './user-sidemenu.component.html',
  styleUrls: ['./user-sidemenu.component.scss']
})
export class UserSidemenuComponent implements OnInit {

  displayName : string;
  address : string;
  email : string;
  phoneNumber : string;

  constructor(private userService : UserService) { 
    debugger
    this.displayName = this.userService.currentUser.displayName
    this.email = this.userService.currentUser.email
    this.address = this.userService.currentUser.address
    this.phoneNumber = this.userService.currentUser.phoneNumber

    console.log(typeof(this.userService.currentUser))
  }

  ngOnInit(): void {
    console.log('user-side-menu')
    console.log(this.userService.currentUser.displayName)
  }

}
