import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageType } from '@shared/enums/message-type.enum';
import { FileManagerService } from '@shared/services/file-manager.service';
import { GlobalService } from '@shared/services/global.service';

@Component({
  selector: 'app-add-poster',
  templateUrl: './add-poster.component.html',
  styleUrls: ['./add-poster.component.scss']
})
export class AddPosterComponent implements OnInit {

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
    private fileManagerService:FileManagerService,
    private router: Router,
    private globalService:GlobalService
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      Image: [null, Validators.required],
    });
  }

  onUpload(event: any) {
    this.form.get('Image').setValue(event.files[0]);
  }

  onRemove(event) {
    this.form.get('Image').setValue(null);
  }

  onSubmit() {
    this.isFormSubmitted = true;
    if (this.form.valid) {
      this.fileManagerService.upload('', 'Poster','', [this.form.get('Image').value]).subscribe(res =>{
        this.globalService.messageAlert(MessageType.Success,'تم الحفظ بنجاح');
        this.router.navigate(["/data-management/poster-list"]);
      })
    }
  }
}
