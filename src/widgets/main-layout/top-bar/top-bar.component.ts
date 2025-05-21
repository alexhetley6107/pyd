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

  handleLogout() {
    this.router.navigate(['login']);
  }
}
