import { Injectable } from '@angular/core';
import { UserModel } from '@shared/models/user-model';
import { SessionStorageService } from './session-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUser : UserModel ;

  constructor(private sessionService : SessionStorageService) { 

    debugger
    this.currentUser = new UserModel();
    if(this.sessionService.get('user') != null &&  this.sessionService.get('user') != 'undefined'){
      let userInfojson : UserModel = JSON.parse( this.sessionService.get('user'));

      if( userInfojson != null && this.currentUser != null){
        this.currentUser =  userInfojson;
       }
    }
  }

  getAuthStatus() : boolean{
    return this.currentUser.Id == null || this.currentUser.Id == undefined  || this.currentUser.Id == "" ? false : true
  }

  saveUserInfo(userModel : UserModel){
    this.currentUser = userModel;
    this.sessionService.setJSON('user' , userModel);
  }

  logout(){
    this.sessionService.remove('user');
  }
}
