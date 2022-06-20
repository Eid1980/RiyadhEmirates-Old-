import { Component, OnInit } from '@angular/core';
import { InquiryModel } from '@shared/models/inquiry-model';
import { RequestService } from '@shared/services/request.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-order-inquiry',
  templateUrl: './order-inquiry.component.html',
  styleUrls: ['./order-inquiry.component.scss'],
  providers: [MessageService],

})
export class OrderInquiryComponent implements OnInit {

  inquiryModel :  InquiryModel

  constructor(private requestService : RequestService) {
    this.inquiryModel = new InquiryModel()
   }

  ngOnInit(): void {
  }

  inquiry(){
    this.requestService.inquire(this.inquiryModel).subscribe(
      (result : any) => {
        if(result.IsSuccess == true){
          console.log(result);

        }
      },
      (err) => {}
    )
  }

}
