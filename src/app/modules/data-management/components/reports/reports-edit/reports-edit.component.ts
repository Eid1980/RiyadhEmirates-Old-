import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageType } from '@shared/enums/message-type.enum';
import { FileManagerService } from '@shared/services/file-manager.service';
import { GlobalService } from '@shared/services/global.service';
import { ReportsService } from '../../../services/reports.service';

@Component({
  selector: 'app-reports-edit',
  templateUrl: './reports-edit.component.html',
  styleUrls: ['./reports-edit.component.scss']
})
export class ReportsEditComponent implements OnInit {
  form: FormGroup;
  isFormSubmitted: boolean;
  id:number;
  editVM:any;
  oldImage:any;

  // for uploader
  @ViewChild('uploader',{static:true}) uploader;
  isMultiple: boolean = false;
  fileSize: number = 1000000;
  acceptType: 'image/*';
  isCustomUpload: boolean = true;
  isDisabled: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private reportsService: ReportsService,
    private fileManagerService:FileManagerService,
    private router: Router,
    private globalService:GlobalService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      Id:[null, Validators.required],
      TitleAr: [null, Validators.required],
      TitleEn: [null, Validators.required],
      DescriptionAr: [null, Validators.required],
      DescriptionEn: [null, Validators.required],
      Date: [null, Validators.required],
      HijriDate: [null, Validators.required],
      Image: [null],
      IsActive: [true],
    });

    this.activatedRoute.queryParamMap.subscribe((params) => {
      this.id = Number(params.get("Id"));
      this.getEdit(this.id);
    });
  }

  getEdit(productId) {
    this.reportsService.getById(productId).subscribe(
      (response) => {
        debugger;
        this.editVM = response.Data;

        this.form.patchValue({
          Id: this.editVM.Id,
          TitleAr:this.editVM.TitleAr,
          TitleEn:this.editVM.TitleEn,
          DescriptionAr:this.editVM.DescriptionAr,
          DescriptionEn:this.editVM.DescriptionEn,
          Date: new Date(this.editVM.Date),
           HijriDate: this.globalService.convertToHijri(new Date(this.editVM.Date),'ar'),
          IsActive: this.editVM.IsActive,
        });

        this.oldImage = this.editVM.Image
      }
    );
  }

  onUpload(event: any) {
    debugger;
    this.form.get('Image').setValue(event.files[0]);
  }

  onRemove(event) {
    debugger;
    this.form.get('Image').setValue(null);
  }

  onSelectGregorianDate(){
    debugger;
    let gregorianDate: Date = this.form.get('Date').value as Date;
    let hijriDate = this.globalService.convertToHijri(gregorianDate,'ar');
    this.form.get('HijriDate').setValue(hijriDate);
  }

  onSubmit() {
    this.isFormSubmitted = true;
    if (this.form.valid) {
      const postedVM = this.form.value;
      postedVM.Id = this.editVM.Id;

      this.reportsService.update(postedVM)
      .subscribe((response) => {
        if (response.IsSuccess) {
          debugger;
          if(this.form.get('Image').value){
            this.fileManagerService.deleteByEntityName(this.editVM.Id,'Reports').subscribe(res=>{
              this.fileManagerService.upload(this.editVM.Id, 'Reports','', [this.form.get('Image').value]).subscribe(res =>{
                this.globalService.messageAlert(MessageType.Success,'تم التعديل بنجاح');
                this.router.navigate(["/data-management/reports-list"]);
              })
            })
          } else{
            this.router.navigate(["/data-management/reports-list"]);
          }
        }
      });
    }
  }
}
