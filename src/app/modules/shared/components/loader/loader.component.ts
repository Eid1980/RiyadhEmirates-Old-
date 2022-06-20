import { Component, OnInit } from '@angular/core';
import { LoaderService } from '@shared/services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  isActive = this.progressSpinner.isLoading;

  constructor(private progressSpinner: LoaderService) {
  }

  ngOnInit(): void {
  }

}
