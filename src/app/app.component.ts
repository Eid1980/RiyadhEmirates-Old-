import {
  Component,
  ChangeDetectorRef,
  AfterViewChecked,
  OnInit,
} from "@angular/core";
import { Subject } from "rxjs";
import { Router } from "@angular/router";
import { LoaderService } from "@shared/services/loader.service";
import { TranslationService } from "@shared/services/translation.service";

@Component({
  selector: 'app-root',
  templateUrl: "./app.component.html",

})
export class AppComponent implements OnInit, AfterViewChecked {
  isActive: Subject<boolean>;
  title = 'Electronic Services For Riyadh Emirate';


  constructor(
    private progressSpinner: LoaderService,
    private cdRef: ChangeDetectorRef,
    private transalationService: TranslationService
  ) {}

  ngOnInit(): void {
    this.transalationService.initializeLanguage();
    document.body.style.direction = this.transalationService.getCurrentLanguage().Direction;
  }

  ngAfterViewChecked() {
    this.isActive = this.progressSpinner.isLoading;
    this.cdRef.detectChanges();
  }
}
