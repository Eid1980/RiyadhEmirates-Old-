import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@shared/services/auth.service';
import {MessageService} from 'primeng/api';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [MessageService]

})
export class RegisterComponent implements OnInit {

  registerationFormData : FormData;

  registerationForm = this.fb.group({
    name: ['' , Validators.required],
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
    private messageService: MessageService,
    private router: Router,
    private fb: FormBuilder) { 

      this.registerationFormData = new FormData();

    }

  ngOnInit() {
  }

  formSubmit(){
    // TODO
    this.registerationFormData = new FormData();
    
    // set default values for address and nationId
    this.registerationForm.value.address = 'Saudi Arabia'
    this.registerationForm.value.nationalID = '29706055985889'

    this.registerationFormData.append('name'  , this.registerationForm.value.name); 
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
          this.messageService.add({severity:'success', summary: 'نجاح', detail: 'تم التسجيل بنجاح'});
          setTimeout(() => {
            this.router.navigate(['/auth/login']);
          }, 2000);
        }else{
          this.messageService.add({severity:'error', summary: 'خطأ', detail: result.errorMessageAr});
        }
      },
      (err) => {
        this.messageService.add({severity:'error', summary: 'خطأ', detail: 'خطأ'});
      }
    )

  }

  resetForm(){
    this.registerationFormData = new FormData();

    this.registerationForm.reset();  
   }

}
