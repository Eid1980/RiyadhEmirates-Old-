import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageType } from '@shared/enums/message-type.enum';
import { GetAttachmentsDto } from '@shared/models/attachments-models';
import { FileManagerService } from '@shared/services/file-manager.service';
import { GlobalService } from '@shared/services/global.service';
import { RequestService } from '@shared/services/request.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-request-attachments',
  templateUrl: './request-attachments.component.html',
  styleUrls: ['./request-attachments.component.scss']
})
export class RequestAttachmentsComponent implements OnInit {

  @Input() allowedExtensions: string = environment.allowedExtensions;
  @Input() fileSize: number = environment.fileSize;
  @Input() serviceName: string = "ُ";
  @Input() requestId: string;
  @Input() isCreatRequest: boolean
  serviceId: number;
  attachmentsDto = [] as GetAttachmentsDto[];
  isModalOpen: boolean = false;
  attachment: any;

  constructor(private _fileManagerService: FileManagerService,
    private _requestService: RequestService,
    private _activatedRoute: ActivatedRoute,
    private _globalService: GlobalService) {
  }


  ngOnInit(): void {
    if (this.requestId) {
      this.getRequestDetails();
    }
    else {
      this._globalService.navigateToRequesterDashboard();
    }
  }


  getRequestDetails() {
    this._requestService.getAttachments(this.requestId).subscribe((response) => {
      this.attachmentsDto = response.data;
    });
  }

  showAttachment(id: string) {
    if (id) {
      this._fileManagerService.getById(id).subscribe((response) => {
        if (response) {
          if (response.extention == '.pdf') {
            this.isModalOpen = false;
            const byteCharacters = atob(response.base64File);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
              byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            let file = new window.Blob([byteArray], { type: 'application/pdf' });
            var url = URL.createObjectURL(file);
            var win = window.open();
            win?.document.write('<iframe src="' + url + '" frameborder="0" style="border:0; width:100%; height:100%;"></iframe>')
          }
          else {
            this.attachment = response.base64File;
            this.isModalOpen = true;
          }
        }
        else {
        this._globalService.messageAlert(MessageType.Error, 'فشل في عرض المرفق');
        }
      });

    }
  }
  downloadAttachment(id: string) {
    if (id) {
      this._fileManagerService.download(id);
    }
  }
  deleteAttachment(id: string) {
    if (id) {
      this._globalService.showConfirm('هل تريد حذف هذا المرفق؟');
      this._globalService.confirmSubmit = () => this.isconfirm(id);
    }
  }
  isconfirm(id: string) {
    this._fileManagerService.delete(id).subscribe((result) => {
      this.getRequestDetails();
    });
    this._globalService.clearMessages();
  }

  checkRequiredAttachments() {
    return !(this.attachmentsDto.filter(x => x.attachmentIsRequired && !x.isAdded).length > 0);
  }

  onUpload(event: any, requestAttachmentType: string) {
    this._fileManagerService.upload(this.requestId, this.serviceName, requestAttachmentType, event.files).subscribe(res => {
     this._globalService.messageAlert(MessageType.Success, 'تم رفع المرفق بنجاح');
      this.getRequestDetails();
    })

  }
}
