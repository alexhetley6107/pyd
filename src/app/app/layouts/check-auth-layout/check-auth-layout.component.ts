import { AuthService } from '@/shared/services/auth.service';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'check-auth-layout',
  imports: [RouterOutlet],
  templateUrl: './check-auth-layout.component.html',
  styleUrl: './check-auth-layout.component.scss',
})
export class CheckAuthLayoutComponent {
  auth = inject(AuthService);

  get isLoader() {
    return this.auth.isGettingMe();
  }

  ngOnInit() {
    this.auth.getMe().subscribe();
  }
}
