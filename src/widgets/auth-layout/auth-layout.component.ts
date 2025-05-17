import { LogoComponent } from '@/shared/ui/logo/logo.component';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'auth-layout',
  imports: [RouterOutlet, LogoComponent],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.scss',
  standalone: true,
})
export class AuthLayoutComponent {
  year = new Date().getFullYear();
  owner = this.year + ' © Aleksandr Bredun';
}
