import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RequestService } from '@shared/services/request.service';
import { UserService } from '@shared/services/user.service';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss']
})
export class CreateOrderComponent implements OnInit {

  orderFormData : FormData

  orderForm = this.fb.group({
    header: ['' , Validators.required],
    content: ['' , Validators.required],
    type: ['' , Validators.required],
  });

  constructor(private requestService : RequestService,
    private userService : UserService,
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


     this.orderFormData.forEach((key , value) => {
       console.log(key , value)
     })

     this.requestService.createRequest(this.orderFormData).subscribe(
        (result) =>{},
        (err) =>{}
     )
   }

}
