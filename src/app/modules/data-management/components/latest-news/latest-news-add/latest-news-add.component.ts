import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageType } from '@shared/enums/message-type.enum';
import { FileManagerService } from '@shared/services/file-manager.service';
import { GlobalService } from '@shared/services/global.service';
import { LatestNewsService } from '../../../services/latest-news.service';

@Component({
  selector: 'app-latest-news-add',
  templateUrl: './latest-news-add.component.html',
  styleUrls: ['./latest-news-add.component.scss']
})
export class LatestNewsAddComponent implements OnInit {
  form: FormGroup;
  isFormSubmitted: boolean;

  // for uploader
  @ViewChild('uploader',{static:true}) uploader;
  isMultiple: boolean = false;
  fileSize: number = 1000000;
  acceptType: 'image/*';
  isCustomUpload: boolean = true;
  isDisabled: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private latestNewsService: LatestNewsService,
    private fileManagerService:FileManagerService,
    private router: Router,
    private globalService:GlobalService
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      TitleAr: [null, Validators.required],
      TitleEn: [null, Validators.required],
      DescriptionAr: [null, Validators.required],
      DescriptionEn: [null, Validators.required],
      Date: [null, Validators.required],
      HijriDate: [null, Validators.required],
      Image: [null, Validators.required],
      IsActive: [true],
    });
  }

  onUpload(event: any) {
    debugger;
    this.form.get('Image')?.setValue(event.files[0]);
  }

  onRemove(event) {
    debugger;
    this.form.get('Image')?.setValue(null);
  }

  onSelectGregorianDate(){
    debugger;
    let gregorianDate: Date = this.form.get('Date')?.value as Date;
    let hijriDate = this.globalService.convertToHijri(gregorianDate,'ar');
    this.form.get('HijriDate')?.setValue(hijriDate);
  }

  onSubmit() {
    this.isFormSubmitted = true;
    if (this.form.valid) {
      const postedVM = this.form.value;
      this.latestNewsService.create(postedVM)
      .subscribe((response) => {
        if (response.IsSuccess) {
          debugger;
          let id = response.Data.toString();
          this.fileManagerService.upload(id, 'LatestNews','', [this.form.get('Image')?.value]).subscribe(res =>{
            this.globalService.messageAlert(MessageType.Success,'تم الحفظ بنجاح');
            this.router.navigate(["/data-management/latest-news-list"]);
          })
        }
      });
    }
  }
}
