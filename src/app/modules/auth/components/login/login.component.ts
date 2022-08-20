import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@shared/services/auth.service';
import { SessionStorageService } from '@shared/services/session-storage.service';
import { TranslationService } from '@shared/services/translation.service';
import { UserService } from '@shared/services/user.service';
import { MessageService } from 'primeng/api';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]

})
export class LoginComponent implements OnInit {

  loginForm = this.fb.group({
    userName: ['', Validators.required],
    password: ['', Validators.required],
  });


  constructor(private authService : AuthService,
    private userService : UserService,
    private sessionService : SessionStorageService,
    private router: Router,
    private fb: FormBuilder,
    private messageService: MessageService,
    private translationService: TranslationService) {}

  ngOnInit() {}

  formSubmit(){
    debugger
    this.authService.login(this.loginForm.value).subscribe(
      (result : any) => {
        if(result.isSuccess == true){
          // save token
          this.sessionService.set('token' , result.data)

          // get user info
          this.authService.getAuthUser().subscribe(
            (result : any) => {
              if(result.isSuccess == true){
                this.userService.saveUserInfo(result.data);
                this.router.navigate(['home']);
              }
            },
            () => {}
          )
        }else{
          this.messageService.add({severity:'error', summary: 'خطأ', detail: result.message});
        }
      },
      (err) => {
        this.messageService.add({
          severity:'error',
          summary: this.translationService.instant('login.text.error'),
          detail:  this.translationService.instant('login.text.invalidUsernameOrPassword')});
      }
    )
  }

  get currentLang() {
    return this.translationService.getCurrentLanguage().Name;
  }

  onChangeLang() {
    this.translationService.switchLanguage();
  }
}
