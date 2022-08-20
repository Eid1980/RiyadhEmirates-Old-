import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from '@shared/models/user-model';
import { TranslationService } from '@shared/services/translation.service';
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
    private router: Router,
    private translationService: TranslationService
    ) {
      if(!_userService.currentUser.id)
        this.isAuthenticate = false;
    }

  ngOnInit() {
    this.userModel = this._userService.currentUser;
  }

  logout(){
    this._userService.logout();

    this.router.navigate(['/auth/login']);
  }

  get currentLang() {
    return this.translationService.getCurrentLanguage().Name;
  }

  onChangeLang() {
    this.translationService.switchLanguage();
  }
}
