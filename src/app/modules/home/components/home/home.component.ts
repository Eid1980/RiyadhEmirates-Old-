import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '@shared/services/user.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private _userService : UserService,
    private _router: Router) {}

  ngOnInit() {}


  navigateTo(){
    if(this._userService.currentUser.role.toLocaleLowerCase() == 'admin'){
      this._router.navigate(['/e-council/incoming-orders']);
    }
    else{
      this._router.navigate(['/e-council/create']);
    }
  }
}
