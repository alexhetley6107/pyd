// auth.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { toObservable } from '@angular/core/rxjs-interop';
import { filter, map, take } from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isGettingMe()) {
    return toObservable(auth.isGettingMe).pipe(
      filter((isLoading) => !isLoading), // ждём false
      take(1),
      map(() => auth.isLoggedIn() || router.createUrlTree(['/login']))
    );
  }

  return auth.isLoggedIn() || router.createUrlTree(['/login']);
};

export const publicGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isGettingMe()) {
    return toObservable(auth.isGettingMe).pipe(
      filter((isLoading) => !isLoading),
      take(1),
      map(() => !auth.isLoggedIn() || router.createUrlTree(['/boards']))
    );
  }

  return !auth.isLoggedIn() || router.createUrlTree(['/boards']);
};
