import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '@/entities/user/service/auth.service';
import { ERoute } from '../../shared/constants/routes';

@Injectable({ providedIn: 'root' })
export class PrivateGuard implements CanActivate {
  private auth = inject(AuthService);
  private router = inject(Router);

  canActivate(_route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.auth.isGettingMe()) {
      return this.router.navigateByUrl(ERoute.ME, {
        state: { returnUrl: state.url },
      });
    }

    return this.auth.isLoggedIn() || this.router.navigateByUrl(ERoute.LOGIN);
  }
}
