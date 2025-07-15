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

  get letters() {
    const user = this.auth.getUser();

    if (!user) return 'U';

    return user?.userName
      .split(' ')
      .map((name) => name[0])
      .join('');
  }

  handleLogout() {
    this.auth.logout();
    this.router.navigate(['login']);
  }
}
