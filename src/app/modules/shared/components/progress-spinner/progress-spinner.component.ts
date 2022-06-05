import { ProgressSpinnerService } from '@shared/services/progress-spinner.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress-spinner',
  templateUrl: './progress-spinner.component.html',
  styleUrls: ['./progress-spinner.component.scss']
})
export class ProgressSpinnerComponent implements OnInit {
  isActive = this.progressSpinner.isLoading;

  constructor(private progressSpinner: ProgressSpinnerService) {}

  ngOnInit() {}
}
