import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-rate-service',
  templateUrl: './rate-service.component.html',
  styleUrls: ['./rate-service.component.scss']
})
export class RateServiceComponent implements OnInit , OnDestroy {

  @Output() OnSubmit = new EventEmitter<number>();

  @Output() OnClose = new EventEmitter();


  rate : number = 0

  constructor() {

   }
  ngOnDestroy(): void {
    this.rate = 1
    }

  ngOnInit(): void {
    this.rate = 0

  }

  rateService(starsCount : number){
    this.rate = starsCount;
  }

  onnModalClose() {
    this.OnClose.emit();
    this.rate = 0

  }

  onnModalSubmit() {
    this.OnSubmit.emit(this.rate);
    this.rate = 0

  }


}
