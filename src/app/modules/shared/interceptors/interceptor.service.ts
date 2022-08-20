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
import { TranslationService } from "@shared/services/translation.service";
import { SessionStorageService } from "@shared/services/session-storage.service";

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
  currentLanguage = "ar";

  constructor(
    private progressSpinner: LoaderService,
    private translationService: TranslationService,
    private _sessionStorage : SessionStorageService,
    private router: Router,
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.progressSpinner.show();

    request = request.clone({
      headers: request.headers.set(
        'accept-language',
        this.translationService.getCurrentLanguage().Name
      ),
    });

    // inject token to request
    let token = this._sessionStorage.get('token');

    if (token) {
      // If we have a token, we set it to the header
      request = request.clone({
         setHeaders: {Authorization: `Bearer ${token}`}
      });
   }

    return next.handle(request).pipe(
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
