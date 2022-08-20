import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from '@shared/services/global.service';

@Component({
  selector: 'app-electronic-board-view',
  templateUrl: './electronic-board-view.component.html',
  styleUrls: ['./electronic-board-view.component.scss']
})
export class ElectronicBoardViewComponent implements OnInit {

  requestId: string;

  constructor(private globalService: GlobalService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.requestId = this.activatedRoute.snapshot.params['id'];
  }

}
