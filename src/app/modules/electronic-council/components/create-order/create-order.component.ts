import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RequestStatusEnum } from '@shared/enums/request-status-enum';
import { UserModel } from '@shared/Models/user-model';
import { RequestService } from '@shared/services/request.service';
import { UserService } from '@shared/services/user.service';
import {MessageService} from 'primeng/api';


@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss'],
  providers: [MessageService]

})


export class CreateOrderComponent implements OnInit {

  @ViewChild('inputFile') inputFile: ElementRef;

  uploadedFiles: any[] = [];


  userModel : UserModel
  orderFormData : FormData
  fileToUpload : File

  orderForm = this.fb.group({
    header: ['' , Validators.required],
    content: ['' , Validators.required],
    type: [1 , Validators.required],
    attachmentName: ['' ,  Validators.required]
  });

  constructor(private requestService : RequestService,
    private _userService : UserService,
    private _router: Router,
    private messageService: MessageService,
    private fb: FormBuilder) { 
    this.orderFormData = new FormData()
  }

  ngOnInit(): void {

    this.userModel = this._userService.currentUser;
    console.log('user')
    console.log(this.userModel)
  }

  upload(files: FileList) {

    this.fileToUpload = files[0] as File;

   }

   formSubmit(){
     this.saveRequest(RequestStatusEnum.New)
    }

  saveAsDraft(){
    debugger
    this.saveRequest(RequestStatusEnum.Drafted);      
  }

  cancel(){
    this.resetForm();
  }

  
saveRequest(requestStatusId : number){
  this.orderFormData = new FormData();

     if(this.fileToUpload != null || this.fileToUpload != undefined){
     this.orderFormData.append('attachments'  , this.fileToUpload , this.fileToUpload?.name); 
     }   
     this.orderFormData.append('header' , this.orderForm.value.header)
     this.orderFormData.append('content' , this.orderForm.value.content)
     this.orderFormData.append('requestTypeId' , this.orderForm.value.type)
     this.orderFormData.append('requestStatusId' , requestStatusId.toString())

     

     this.requestService.createRequest(this.orderFormData).subscribe(
        (result : any) =>{
          if(result.code == 200){
            this.messageService.add({severity:'success', summary: 'تم الارسال', detail: 'تم إرسال طلبك بنجاح'});
            this.resetForm();
            setTimeout(() => {this._router.navigate(['/e-council/my-orders']);} , 3000);
            
          }else {
            this.messageService.add({severity:'error', summary: 'خطأ', detail: result.errorMessageAr});
          }
        },
        (err) =>{
          this.messageService.add({severity:'error', summary: 'خطأ', detail: 'خطأ في إرسال الطلب'});
        }
     )
}


   resetForm(){
    this.orderFormData = new FormData();

    this.orderForm.reset();  

    this.inputFile.nativeElement.value = ''
   }

   onUpload(event : any) {
     debugger
    for(let file of event.files) {
        this.uploadedFiles.push(file);
    }

    this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
}


onBasicUpload(event : any) {
  this.messageService.add({severity: 'info', summary: 'Success', detail: 'File Uploaded with Basic Mode'});
}

onBasicUploadAuto(event : any) {
  this.messageService.add({severity: 'info', summary: 'Success', detail: 'File Uploaded with Auto Mode'});
}
}
