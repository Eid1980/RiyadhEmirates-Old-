import { Component, Input, OnInit } from '@angular/core';
import { RequestModel } from '@shared/Models/request-model';

@Component({
  selector: 'app-order-status-details',
  templateUrl: './order-status-details.component.html',
  styleUrls: ['./order-status-details.component.scss']
})
export class OrderStatusDetailsComponent implements OnInit {

  @Input() seletedOrder : RequestModel;; // decorate the property with @Input()

  constructor() { }

  ngOnInit(): void {
  }

}
