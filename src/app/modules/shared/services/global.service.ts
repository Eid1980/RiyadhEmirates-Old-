import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { throwError } from "rxjs";
import { MessageType } from "@shared/enums/message-type.enum";
import { environment } from "@environments/environment";
import { ToastrService } from "ngx-toastr";

@Injectable({
  providedIn: "root"
})
export class GlobalService {
  constructor(private toastr: ToastrService, private router: Router) {}

  public messageAlert(messageType: MessageType, message: string) {
    switch (messageType) {
      case MessageType.Success:
        this.toastr.success(message);
        break;
      case MessageType.Info:
        this.toastr.info(message);
        break;
      case MessageType.Warning:
        this.toastr.warning(message);
        break;
      case MessageType.Error:
        this.toastr.error(message);
        break;
    }
  }

  convertToHijri(date, lang) {
    var date = date || new Date();
    lang = lang || 'en';
    var options = {
      year: 'numeric', month: 'long', day: 'numeric',weekday: 'long'
    };
    return date.toLocaleString(lang + '-u-ca-islamic', options);
  }
  
  errorHandler(error: HttpErrorResponse) {
    if (error.status === 401) {
      this.toastr.error("ليس لديك صلاحية لدخول هذة الصفحة");
      setTimeout(() => {
        document.location.href = "/security/login";
      }, 3000);
    } else {
      this.toastr.error("حدث خطأ ما من قبل الخادم (server)");
    }
    return throwError(error);
  }
}
