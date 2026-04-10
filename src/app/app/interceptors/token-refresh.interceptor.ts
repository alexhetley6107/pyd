import { HttpInterceptorFn, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, filter, switchMap, take, throwError, Subject } from 'rxjs';

import { AuthService } from '@/entities/auth/service/auth.service';
import { API } from '@/shared/constants/api';
import { ERoute } from '@/shared/constants/routes';

let refreshInProgress = false;
let refreshSubject = new Subject<boolean>();

export const authRefreshInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const isRefreshReq = req.url.includes(API.refresh);
  const isLogoutReq = req.url.includes(API.logout);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status !== HttpStatusCode.Unauthorized) {
        return throwError(() => error);
      }

      if (isRefreshReq || isLogoutReq) {
        auth.user.set(null);
        router.navigateByUrl(ERoute.LOGIN);
        return throwError(() => error);
      }

      if (refreshInProgress) {
        return refreshSubject.pipe(
          filter(Boolean),
          take(1),
          switchMap(() => next(req))
        );
      }

      refreshInProgress = true;
      refreshSubject = new Subject<boolean>();

      return auth.refresh().pipe(
        switchMap(() => {
          refreshInProgress = false;
          refreshSubject.next(true);
          refreshSubject.complete();

          return next(req);
        }),

        catchError((refreshError) => {
          refreshInProgress = false;

          refreshSubject.next(false);
          refreshSubject.complete();

          auth.user.set(null);
          router.navigateByUrl(ERoute.LOGIN);

          return throwError(() => refreshError);
        })
      );
    })
  );
};
