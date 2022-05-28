import { Component, OnInit } from '@angular/core';
import { InquiryModel } from '@shared/models/inquiry-model';
import { RequestService } from '@shared/services/request.service';

@Component({
  selector: 'app-order-inquiry',
  templateUrl: './order-inquiry.component.html',
  styleUrls: ['./order-inquiry.component.scss']
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
        if(result.code == 200){
          console.log(result);

        }
      },
      (err) => {}
    )
  }

}
