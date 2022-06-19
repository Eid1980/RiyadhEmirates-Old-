import { Injectable, Injector } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, finalize } from "rxjs/operators";
import { GlobalService } from "@shared/services/global.service";
import { Router, ActivatedRoute } from "@angular/router";
import { LoaderService } from "@shared/services/loader.service";

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
  currentLanguage = "ar";

  constructor(
    private progressSpinner: LoaderService,
    private router: Router,
    private globalService: GlobalService,
    private active: ActivatedRoute,
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.progressSpinner.show();
    debugger

    /*const token = this.localStorage.get("EmiratesToken");

    if (token) {
      req = req.clone({
        headers: req.headers.set("Authorization", "Bearer " + token),
      });
    }*/

    /*req = req.clone({ headers: req.headers.set("Accept", "application/json") });*/

    return next.handle(req).pipe(
      finalize(() => {
        this.progressSpinner.hide();
      }),
      catchError((error) => {
        return this.errorHandler(error);
      })
    );
  }

  errorHandler(error: HttpErrorResponse) {
    // if (error.url.includes("IsAuthorizedComponent")) {
    //   this.globalService.messageAlert(
    //     MessageType.Error,
    //     "ليس لديك صلاحية لدخول هذة الصفحة"
    //   );
    //   setTimeout(() => {
    //     document.location.href = "/auth/login";
    //   }, 3000);
    // } else {
    /*this.globalService.messageAlert(
      MessageType.Error,
      "حدث خطأ ما من قبل الخادم (server)"
    );*/
    // }
    return throwError(error);
  }
}
