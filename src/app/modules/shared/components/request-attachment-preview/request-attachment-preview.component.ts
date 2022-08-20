import { Component, Input, OnInit } from '@angular/core';
import { GetRequestAttachmentsDto } from '@shared/models/attachments-models';
import { FileManagerService } from '@shared/services/file-manager.service';
import { RequestService } from '@shared/services/request.service';

@Component({
  selector: 'app-request-attachment-preview',
  templateUrl: './request-attachment-preview.component.html',
  styleUrls: ['./request-attachment-preview.component.scss']
})
export class RequestAttachmentPreviewComponent implements OnInit {

  @Input() requestId: string;
  requestAttachmentsDto = [] as GetRequestAttachmentsDto[];
  isModalOpen: boolean = false;
  attachment: any;

  constructor(private _requestService: RequestService,
    private _fileManagerService: FileManagerService)
    //private globalService: GlobalService)
  {
  }

  ngOnInit(): void {
    if (this.requestId) {
      this._requestService.getRequestAttachments(this.requestId).subscribe((response) => {
        this.requestAttachmentsDto = response.data;
      });
    }
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
          //this.globalService.messageAlert(MessageType.Error, 'فشل في عرض المرفق');
        }
      });

    }
  }
  downloadAttachment(id: string) {
    if (id) {
      this._fileManagerService.download(id);
    }
  }
}
