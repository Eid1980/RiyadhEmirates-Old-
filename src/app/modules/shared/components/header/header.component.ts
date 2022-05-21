import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from '@shared/Models/user-model';
import { UserService } from '@shared/services/user.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  userModel : UserModel
  constructor(
    private userService : UserService,
    private router: Router
    ) {}

  ngOnInit() {
    this.userModel = this.userService.currentUser;
  }

  logout(){
    this.userService.logout();

    this.router.navigate(['/auth/login']);
  }
}
