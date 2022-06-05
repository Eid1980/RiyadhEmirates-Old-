import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestStatusEnum } from '@shared/enums/request-status-enum';
import { UserModel } from '@shared/models/user-model';
import { RequestService } from '@shared/services/request.service';
import { UserService } from '@shared/services/user.service';
import {MessageService} from 'primeng/api';
import { DateFormatterService } from 'ngx-hijri-gregorian-datepicker';
import { InquiryModel } from '@shared/models/inquiry-model';
import { RequestModel } from '@shared/models/request-model';
import {FileUploadModule} from 'primeng/fileupload';
import {HttpClientModule} from '@angular/common/http';


@Component({
  selector: 'app-create-request',
  templateUrl: './create-request.component.html',
  styleUrls: ['./create-request.component.scss'],
  providers: [MessageService]

})


export class CreateRequestComponent implements OnInit {

  @ViewChild('inputFile') inputFile: ElementRef;

  uploadedFiles: File[] = [];
  fileToUpload : File
  orderFormData : FormData
  
  userModel : UserModel
  currentRequest : RequestModel

  requestId : number


  orderForm = this.fb.group({
    header: ['' , Validators.required],
    content: ['' , Validators.required],
    type: ['1' , Validators.required],
    attachmentName: ['' ,  Validators.required]
  });

  constructor(private _requestService : RequestService,
    private _userService : UserService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private _router: Router,
    private messageService: MessageService,
    private dateFormatterService: DateFormatterService) {

    this.orderFormData = new FormData()

    this.route.params.subscribe(params => {
      this.requestId = params['id'];

      if(this.requestId != undefined){
        // get request by id 

        let inquire = new InquiryModel();
        inquire.requestId = this.requestId
        
        this._requestService.getRequests(inquire).subscribe(
          (result : any) => {
            if(result.code == 200){
              debugger
              this.currentRequest = result.data[0];
              this.orderForm.setValue({
                type : this.currentRequest.requestTypeId,
                header : this.currentRequest.header,
                content :  this.currentRequest.content,
                attachmentName : ''});
            }else{
              this.messageService.add({severity:'error', summary: 'خطأ', detail: 'خطأ'});
            }
          },
          () => {
            this.messageService.add({severity:'error', summary: 'خطأ', detail: 'خطأ'});

          }
        )
      }
    });

  }

  ngOnInit(): void {
    this.userModel = this._userService.currentUser;

  }

  upload(files: FileList) {

    debugger
    console.log('uuuuuuuuuu')
    this.fileToUpload = files[0] as File;

    this.uploadedFiles.push(files[0])
   }

   remove(files: FileList) {  
    //this.uploadedFiles.

   }

   formSubmit(){
      this.saveRequest(RequestStatusEnum.New)

    }

  saveAsDraft(){
    this.saveRequest(RequestStatusEnum.Drafted);      
  }

  cancel(){
    this.resetForm();
  }

  
saveRequest(requestStatusId : number){


  // update request
  if(this.requestId != undefined){
    var updateRequestStatus = {requestId : this.requestId , status : requestStatusId };

    this._requestService.updateRequestStatus(updateRequestStatus).subscribe(
      (result : any) =>{
        if(result.code == 200){

      this.resetForm();

      setTimeout(() => {
        if(requestStatusId == RequestStatusEnum.New){
          this._router.navigate(['/e-council/my-orders']);
          this.messageService.add({severity:'success', summary: 'تم الارسال', detail: 'تم إرسال طلبك بنجاح'});
        }else if(requestStatusId == RequestStatusEnum.Drafted){
          this._router.navigate(['/e-council/saved']);
          this.messageService.add({severity:'success', summary: 'تم الحفظ', detail: 'تم حفظ طلبك بنجاح'});
        }} , 3000);          }
      },
      () => {}
    )
   }
   else{
     // add new request

     debugger
  let currentHigriDate =  
  `${this.dateFormatterService.GetTodayHijri().year}/${this.dateFormatterService.GetTodayHijri().month}/${this.dateFormatterService.GetTodayHijri().day}` ;//new Date(this.date.year, this.date.month , this.date.day);

  this.orderFormData = new FormData();

  if(this.fileToUpload != null || this.fileToUpload != undefined){
    for(let file of this.uploadedFiles)
      this.orderFormData.append('attachments'  , file , file.name); 
  }   
  this.orderFormData.append('header' , this.orderForm.value.header)
  this.orderFormData.append('content' , this.orderForm.value.content)
  this.orderFormData.append('requestTypeId' , this.orderForm.value.type)
  this.orderFormData.append('requestStatusId' , requestStatusId.toString())
  this.orderFormData.append('currentHigriDate' , currentHigriDate)

  
  debugger

  this._requestService.createRequest(this.orderFormData).subscribe(
    (result : any) =>{
      if(result.code == 200){
        this.messageService.add({severity:'success', summary: 'تم الارسال', detail: 'تم إرسال طلبك بنجاح'});
        this.resetForm();

        debugger

        setTimeout(() => {
          if(requestStatusId == RequestStatusEnum.New){
            this._router.navigate(['/e-council/my-orders']);
          }else if(requestStatusId == RequestStatusEnum.Drafted){
            this._router.navigate(['/e-council/saved']);
          }} , 3000);
        
      }else {
        this.messageService.add({severity:'error', summary: 'خطأ', detail: result.errorMessageAr});
      }
    },
    (err) =>{
      this.messageService.add({severity:'error', summary: 'خطأ', detail: 'خطأ في إرسال الطلب'});
    }
  )
   }
}


resetForm(){
  this.orderFormData = new FormData();

  this.orderForm.reset();  

  //this.inputFile.nativeElement.value = ''
}

onUpload(event : any) {
  console.log('onUpload')
  console.log(event)
  for(let file of event.files) {
    this.uploadedFiles.push(file);
  }

  this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
}

}
