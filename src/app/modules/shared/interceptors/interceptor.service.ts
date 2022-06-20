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
    return throwError(error);
  }
}
