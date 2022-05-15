import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerationFormData : FormData;

  registerationForm = this.fb.group({
    firstName: ['' , Validators.required],
    lastName: ['' , Validators.required],
    nationalID: ['' , Validators.required],
    userName: ['' , Validators.required],
    email: ['' , Validators.required],
    confirmEmail: ['' , Validators.required],
    phoneNumber:[ , Validators.required],
    password: ['' , Validators.required],
    confirmPassword: ['' , Validators.required],
    address: [''],
  });
  
  constructor(private authService : AuthService,
    private toastr: ToastrService,
    private router: Router,
    private fb: FormBuilder) { 

      this.registerationFormData = new FormData();

    }

  ngOnInit() {
  }

  formSubmit(){
    // TODO

    this.registerationForm.value.lastName = this.registerationForm.value.firstName;
    this.registerationForm.value.address = 'Saudi Arabia'
    this.registerationForm.value.nationalID = '29706055985889'

    this.registerationFormData.append('firstName'  , this.registerationForm.value.firstName); 
    this.registerationFormData.append('lastName'  , this.registerationForm.value.lastName); 
    this.registerationFormData.append('nationalID'  , this.registerationForm.value.nationalID); 
    this.registerationFormData.append('userName'  , this.registerationForm.value.userName); 
    this.registerationFormData.append('email'  , this.registerationForm.value.email); 
    this.registerationFormData.append('password'  , this.registerationForm.value.password); 
    this.registerationFormData.append('confirmPassword'  , this.registerationForm.value.password); 
    this.registerationFormData.append('phoneNumber'  , this.registerationForm.value.phoneNumber); 
    this.registerationFormData.append('address'  , this.registerationForm.value.address); 

    this.authService.register(this.registerationFormData).subscribe(
      (result : any) => {
        if(result.code == 200){
          this.toastr.success('تم التسجيل بنجاح' , 'تم التسجيل بنجاح' )
        }else{
          this.toastr.error(result.errorMessageAr, 'Error');
        }
      },
      (err) => {}
    )

  }

}
