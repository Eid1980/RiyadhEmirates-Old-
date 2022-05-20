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

    let userInfojson : UserModel = JSON.parse(this.sessionService.get('user'));

    if( userInfojson != null ){
      this.currentUser =  userInfojson;
     }
  }

  saveUserInfo(userModel : UserModel){
    this.currentUser = userModel;
    this.sessionService.setJSON('user' , userModel);
  }

  logout(){
    this.sessionService.remove('user');
  }


}
