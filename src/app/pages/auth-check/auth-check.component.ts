import { AuthService } from '@/shared/services/auth.service';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'auth-check',
  imports: [],
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
        this.router.navigate(['boards']);
      },
      error: () => {
        this.router.navigate(['login']);
      },
    });
  }
}
