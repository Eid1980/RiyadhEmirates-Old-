import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@shared/services/auth.service';
import { SessionStorageService } from '@shared/services/session-storage.service';
import { UserService } from '@shared/services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  loginForm = this.fb.group({
    userName: ['', Validators.required],
    password: ['', Validators.required],
  });


  constructor(private authService : AuthService,
    private userService : UserService,
    private toastr: ToastrService,
    private router: Router,
    private fb: FormBuilder) {}

  ngOnInit() {}

  formSubmit(){
    this.authService.login(this.loginForm.value).subscribe(
      (result : any) => {
        if(result.code == 200){
          this.userService.saveUserInfo(result.data);
          this.router.navigate(['home']);
        }else{
          console.log(result)

          console.log(result.errorMessageAr)

          this.toastr.error(result.errorMessageAr, 'Error');
        }
      },
      (err) => {}
    )
  }
}
