import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@shared/services/auth.service';
import {MessageService} from 'primeng/api';
import { NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { DateFormatterService , DateType } from 'ngx-hijri-gregorian-datepicker';

import * as momentjs from 'moment';
const moment = momentjs;

import * as moment_ from 'moment-hijri';
const momentHijri = moment_;


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [MessageService]

})
export class RegisterComponent implements OnInit {

  date: NgbDateStruct;
  minHigriDate : NgbDateStruct;
  minGreg : NgbDateStruct;
  maxHigriDate : NgbDateStruct;
  maxGreg : NgbDateStruct;
  dateString: string;
  selectedDateType = DateType.Hijri;

  isDisabled: boolean;
  isReadOnly: boolean;


  nationalities : any ;

  @ViewChild('datePicker') startDatePicker: any;


  registerationFormData : FormData;

  registerationForm = this.fb.group({
    name: ['' , Validators.required ],
    nationalID: ['111' , Validators.required],
    userName: ['' , [Validators.required , Validators.pattern('^(1|2){1}[0-9]{9}$')]],
    email: ['' , [Validators.required , Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    confirmEmail: ['abc' , Validators.required],
    phoneNumber:[ , [Validators.required, Validators.pattern('^966{1}[0-9]{9}$')]],
    password: ['' , [Validators.required]] //Validators.pattern('(?:(?=.*[a-z])(?:(?=.*[A-Z])(?=.*[\d\W])|(?=.*\W)(?=.*\d))|(?=.*\W)(?=.*[A-Z])(?=.*\d)).{8,}')]],
//    confirmPassword: ['' , Validators.required],
//    address: [''],
  });

  constructor(private authService : AuthService,
    private messageService: MessageService,
    private router: Router,
    private fb: FormBuilder,
    private dateFormatterService: DateFormatterService) {

      this.registerationFormData = new FormData();

      //this.date = this.dateFormatterService.GetTodayGregorian();

      this.minHigriDate = {day : 1,month : 1,  year : 1360  }
      this.maxHigriDate = {day : 1,month : 1,  year : 1425}
      this.minGreg = {day : 1,month : 1,  year : 1950  }
      this.maxGreg = {day : 1,month : 1,  year : 2004 }

      // this.nationalities.push('سعودي')
      // this.nationalities.push('مصري')



    }

  ngOnInit() {
    this._getNationalities();
  }

  formSubmit(){

    console.log(this.date)
    console.log(this.selectedDateType)

    let birthDate =  `${this.date.year}/${this.date.month}/${this.date.day}` ;//new Date(this.date.year, this.date.month , this.date.day);
    // TODO
    this.registerationFormData = new FormData();



    // set default values for address and nationId
    this.registerationForm.value.address = 'Saudi Arabia'
    this.registerationForm.value.nationalID = this.registerationForm.value.userName

    this.registerationFormData.append('name'  , this.registerationForm.value.name);
    this.registerationFormData.append('nationalId'  , this.registerationForm.value.nationalID);
    this.registerationFormData.append('userName'  , this.registerationForm.value.userName);
    this.registerationFormData.append('email'  , this.registerationForm.value.email);
    this.registerationFormData.append('password'  , this.registerationForm.value.password);
    this.registerationFormData.append('confirmPassword'  , this.registerationForm.value.password);
    this.registerationFormData.append('phoneNumber'  , this.registerationForm.value.phoneNumber);
    this.registerationFormData.append('birthDate'  , birthDate);
    this.registerationFormData.append('address'  , this.registerationForm.value.address);


    this.authService.register(this.registerationFormData).subscribe(
      (result : any) => {
        if(result.IsSuccess == true){
          this.messageService.add({severity:'success', summary: 'نجاح', detail: 'تم التسجيل بنجاح'});
          setTimeout(() => {
            this.router.navigate(['/auth/login']);
          }, 2000);
        }else{
          this.messageService.add({severity:'error', summary: 'خطأ', detail: result.errorMessageAr});
        }
      },
      (err) => {
        this.messageService.add({severity:'error', summary: 'خطأ', detail: err.error.Message});
      }
    )

  }

  resetForm(){
    this.registerationFormData = new FormData();

    this.registerationForm.reset();
   }


   makeReadonly() {
    if (this.isReadOnly) {
      this.isReadOnly = false;
    } else {
      this.isReadOnly = true;
    }
  }

  makeDisabled() {
    if (this.isDisabled) {
      this.isDisabled = false;
    } else {
      this.isDisabled = true;
    }
  }

  getDate() {
    this.dateString = this.startDatePicker.getSelectedDate();
  }

  setCurrentGreg() {
    this.selectedDateType = DateType.Gregorian;
    this.date = this.dateFormatterService.GetTodayGregorian();
  }

  setHijri() {
    this.selectedDateType = DateType.Hijri;
    this.date = this.dateFormatterService.GetTodayHijri();
  }

  _getNationalities(){

    this.authService.getNtationalities().subscribe(

      (result : any) => {
       this.nationalities = result.Data ;
      },
      (err) => {
        this.messageService.add({severity:'error', summary: 'خطأ', detail: err.error.Message});
      }
    )
  }

}
