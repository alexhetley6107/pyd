import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class PublicGuard implements CanActivate {
  private auth = inject(AuthService);
  private router = inject(Router);

  canActivate(_route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.auth.isGettingMe()) {
      return this.router.navigate(['/me'], {
        state: { returnUrl: state.url },
      });
    }

    return !this.auth.isLoggedIn() || this.router.navigate(['/boards']);
  }
}
