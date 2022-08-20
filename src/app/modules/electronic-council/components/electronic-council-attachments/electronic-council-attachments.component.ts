import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-electronic-council-attachments',
  templateUrl: './electronic-council-attachments.component.html',
  styleUrls: ['./electronic-council-attachments.component.scss']
})
export class ElectronicCouncilAttachmentsComponent implements OnInit {

  @Output() onSubmit = new EventEmitter<number>();

  submitted: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  nextPage() {
    this.onSubmit.emit(3)
}

}
