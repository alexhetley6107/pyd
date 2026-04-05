import { ERoute } from '@/shared/constants/routes';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  router = inject(Router);

  ngOnInit() {
    this.router.navigateByUrl(ERoute.BOARDS);
  }
}
