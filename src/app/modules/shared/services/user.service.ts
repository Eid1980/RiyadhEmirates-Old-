import { Injectable } from '@angular/core';
import { UserModel } from '@shared/Models/user-model';
import { SessionStorageService } from './session-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUser : UserModel ;

  constructor(private sessionService : SessionStorageService) { 
    this.currentUser = new UserModel();

    let userInfojson = JSON.parse(this.sessionService.get('user'));

    debugger
    if( userInfojson != null ){
      this.currentUser.displayName =  userInfojson.displayName;
      console.log('userInfo');
      console.log(this.currentUser)
     }
  }

  saveUserInfo(userModel : UserModel){
    debugger
    this.currentUser = userModel;
    JSON.stringify(this.sessionService.setJSON('user' , userModel));
  }


}
