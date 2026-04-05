import { AuthService } from '@/shared/services/auth.service';
import { HttpInterceptorFn, HttpStatusCode } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { API } from '@/shared/constants/api';
import { ERoute } from '@/shared/constants/routes';

let isRefreshing = false;

export const authRefreshInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const isRefreshReq = req.url.includes(API.refresh);
  const isLogoutReq = req.url.includes(API.logout);

  return next(req).pipe(
    catchError((error) => {
      if (error.status !== HttpStatusCode.Unauthorized) return throwError(() => error);
      if (auth.isGettingMe()) return throwError(() => error);
      if (!auth.isLoggedIn()) return throwError(() => error);

      if (isRefreshing) return throwError(() => error);
      if (isRefreshReq || isLogoutReq) return throwError(() => error);

      isRefreshing = true;

      return auth.refresh().pipe(
        switchMap(() => {
          isRefreshing = false;
          return next(req);
        }),
        catchError((refreshError) => {
          isRefreshing = false;
          auth.user.set(null);
          router.navigateByUrl(ERoute.LOGIN);
          return throwError(() => refreshError);
        })
      );
    })
  );
};
