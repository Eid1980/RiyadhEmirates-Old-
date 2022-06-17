import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestStatusEnum } from '@shared/enums/request-status-enum';
import { UserModel } from '@shared/models/user-model';
import { RequestService } from '@shared/services/request.service';
import { UserService } from '@shared/services/user.service';
import {MessageService} from 'primeng/api';
import { DateFormatterService } from 'ngx-hijri-gregorian-datepicker';
import { InquiryModel } from '@shared/models/inquiry-model';
import { RequestModel } from '@shared/models/request-model';


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
    attahments: this.fb.array([])
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

        this._requestService.getRequestById( this.requestId ).subscribe(
          (result : any) => {
            if(result.IsSuccess == true){

              
              this.currentRequest = result.Data;
              this.orderForm.setValue({
                type : this.currentRequest.RequestTypeId,
                header : this.currentRequest.Header,
                content :  this.currentRequest.Content,
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
  get attahments(){
    return this.orderForm.get('attahments') as FormArray ;
  }

  addAttachment(){
 
    if( this.orderForm.value.attahments.length < 5 ){
    this.attahments.push(this.fb.control(''));
    
    console.log("added")
    }
  }

  removeAttachments(index : any){

    this.attahments.removeAt(index);
    console.log("removed");
  }

  upload(files: FileList) {

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
    var updateRequestStatus = {requestId : this.requestId , NewStatusId : requestStatusId };

    this._requestService.updateRequest(updateRequestStatus).subscribe(
      (result : any) =>{
        if(result.IsSuccess == true){

      this.resetForm();

      if(requestStatusId == RequestStatusEnum.New){
        this.messageService.add({severity:'success', summary: 'تم الارسال', detail: 'تم إرسال طلبك بنجاح'});
        setTimeout(() => {
          this._router.navigate(['/e-council/my-orders']);
          } , 3000);
      }

      else if(requestStatusId == RequestStatusEnum.Drafted){
        this.messageService.add({severity:'success', summary: 'تم الحفظ', detail: 'تم حفظ طلبك بنجاح'});
        setTimeout(() => {
            this._router.navigate(['/e-council/saved']);
          } , 3000);
      }
    }},

      () => {}
    )
   }
   else{
     // add new request

  let currentHigriDate =
  `${this.dateFormatterService.GetTodayHijri().year}-${this.dateFormatterService.GetTodayHijri().month}-${this.dateFormatterService.GetTodayHijri().day}` ;//new Date(this.date.year, this.date.month , this.date.day);

  this.orderFormData = new FormData();

  if(this.fileToUpload != null || this.fileToUpload != undefined){
    for(let file of this.uploadedFiles)
      this.orderFormData.append('attachments'  , file , file.name);
  }

 
  var attahmentsNames = this.orderForm.value.attahments as []
  if(attahmentsNames.length > 0){

    for(let name of attahmentsNames){
      
      var index = attahmentsNames.indexOf(name) + 1 ;
      var key = `attachmentHeader${index}`
      console.log(key + ':' +name)
      this.orderFormData.append(key , name)
    }
  } 
   

  this.orderFormData.append('header' , this.orderForm.value.header)
  this.orderFormData.append('content' , this.orderForm.value.content)
  this.orderFormData.append('requestTypeId' , this.orderForm.value.type)
  this.orderFormData.append('requestStatusId' , requestStatusId.toString())
  this.orderFormData.append('currentHigriDate' , currentHigriDate)


  this._requestService.createRequest(this.orderFormData).subscribe(
    (result : any) =>{
      if(result.IsSuccess == true){
        this.resetForm();

        if(requestStatusId == RequestStatusEnum.New){
          this.messageService.add({severity:'success', summary: 'تم الارسال', detail: 'تم إرسال طلبك بنجاح'});
          setTimeout(() => {
            this._router.navigate(['/e-council/my-orders']);
            } , 3000);
        }

        else if(requestStatusId == RequestStatusEnum.Drafted){
          this.messageService.add({severity:'success', summary: 'تم الحفظ', detail: 'تم حفظ طلبك بنجاح'});
          setTimeout(() => {
              this._router.navigate(['/e-council/saved']);
            } , 3000);
        }

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

  this.orderForm.controls['type'].setValue('1');
}

onUpload(event : any) {
  for(let file of event.files) {
    this.uploadedFiles.push(file);
  }
  this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
}
}
