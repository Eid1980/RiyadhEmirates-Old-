import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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

  orderFormData : FormData

  orderForm = this.fb.group({
    header: ['' , Validators.required],
    content: ['' , Validators.required],
    type: ['' , Validators.required],
  });

  constructor(private requestService : RequestService,
    private userService : UserService,
    private messageService: MessageService,
    private fb: FormBuilder) { 
    this.orderFormData = new FormData()
  }

  ngOnInit(): void {
  }

  upload(files: FileList) {

    const fileToUpload = files[0] as File;

    this.orderFormData.append('attachments'  , fileToUpload , fileToUpload.name);    
   }

   formSubmit(){
     this.orderFormData.append('header' , this.orderForm.value.header)
     this.orderFormData.append('content' , this.orderForm.value.content)
     this.orderFormData.append('type' , this.orderForm.value.type)

     this.requestService.createRequest(this.orderFormData).subscribe(
        (result : any) =>{
          if(result.code == 200){
            this.messageService.add({severity:'success', summary: 'تم الارسال', detail: 'تم إرسال طلبك بنجاح'});
            this.resetForm();
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

}
