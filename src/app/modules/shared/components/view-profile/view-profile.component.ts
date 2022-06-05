import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/modules/security/services/user.service';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss']
})
export class ViewProfileComponent implements OnInit {
 userInfo:any;

  constructor(private userService:UserService) { }

  ngOnInit() {
     this.userInfo = this.userService.getCurrentUserInfo();
  }

}
