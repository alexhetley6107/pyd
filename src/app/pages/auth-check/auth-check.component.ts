import { AuthService } from '@/entities/user/service/auth.service';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ERoute } from '@/shared/constants/routes';
import { delay } from 'rxjs';
import { LogoComponent } from '@/shared/ui/logo/logo.component';

@Component({
  selector: 'auth-check',
  imports: [LogoComponent],
  templateUrl: './auth-check.component.html',
  styleUrl: './auth-check.component.scss',
})
export class AuthCheckComponent {
  router = inject(Router);
  auth = inject(AuthService);
  location = inject(Location);

  ngOnInit() {
    this.auth.getMe().subscribe({
      next: () => {
        const returnUrl = (this.location.getState() as { returnUrl: string }).returnUrl;

        if (returnUrl) {
          this.router.navigateByUrl(returnUrl);
          return;
        }
        this.router.navigateByUrl(ERoute.LOGIN);
      },
      error: () => {
        this.router.navigateByUrl(ERoute.LOGIN);
      },
    });
  }
}
