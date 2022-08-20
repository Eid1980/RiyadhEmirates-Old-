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
import { GlobalService } from "@shared/services/global.service";

@Component({
  selector: 'app-root',
  templateUrl: "./app.component.html",

})
export class AppComponent implements OnInit, AfterViewChecked {

  isActive: Subject<boolean>;
  title = "Admin Dashboard";

  constructor(private progressSpinner: LoaderService, private _translateService : TranslationService,
     private cdRef: ChangeDetectorRef, private router: Router, private globalService: GlobalService

  ) {}

  ngOnInit(): void {
    this._translateService.initializeLanguage();
    document.body.style.direction = this._translateService.getCurrentLanguage().Direction;
  }

  ngAfterViewChecked() {
    this.isActive = this.progressSpinner.isLoading;
    this.cdRef.detectChanges();
  }
  onConfirm() {
    this.globalService.confirm();
  }
  onReject() {
    this.globalService.clearMessages();
  }
}
