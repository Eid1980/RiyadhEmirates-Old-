import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@shared/services/auth.service';
import { SessionStorageService } from '@shared/services/session-storage.service';
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
    private messageService: MessageService) {}

  ngOnInit() {}

  formSubmit(){
    console.log('formSubmit')
    this.authService.login(this.loginForm.value).subscribe(
      (result : any) => {

        if(result.IsSuccess == true){

          // save token
          this.sessionService.set('token' , result.Data)
          // call getAuthUser

          this.authService.getAuthUser().subscribe(
            (result : any) => {
              if(result.IsSuccess == true){
                this.userService.saveUserInfo(result.Data);
                this.router.navigate(['home']);
              }
            },
            () => {}
          )
        }else{
          this.messageService.add({severity:'error', summary: 'خطأ', detail: result.Message});
        }
      },
      (err) => {
        this.messageService.add({severity:'error', summary: 'خطأ', detail: 'اسم المستخدم او كلمة المرور غير صحيحة'});
      }
    )
  }
}
