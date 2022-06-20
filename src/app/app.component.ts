import {
  Component,
  ChangeDetectorRef,
  AfterViewChecked,
  OnInit,
} from "@angular/core";
import { Subject } from "rxjs";
import { Router } from "@angular/router";
import { LoaderService } from "@shared/services/loader.service";

@Component({
  selector: 'app-root',
  templateUrl: "./app.component.html",

})
export class AppComponent implements OnInit, AfterViewChecked {
  isActive: Subject<boolean>;
  title = 'Electronic Services For Riyadh Emirate';


  constructor(
    private progressSpinner: LoaderService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {}

  ngAfterViewChecked() {
    this.isActive = this.progressSpinner.isLoading;
    this.cdRef.detectChanges();
  }
}
