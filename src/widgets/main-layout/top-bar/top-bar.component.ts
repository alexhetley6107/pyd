import { AuthService } from '@/shared/services/auth.service';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'top-bar',
  imports: [],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss',
})
export class TopBarComponent {
  router = inject(Router);
  auth = inject(AuthService);

  handleLogout() {
    this.auth.logout();
    this.router.navigate(['login']);
  }
}
