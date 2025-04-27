import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'auth-layout',
  imports: [RouterOutlet],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.scss',
})
export class AuthLayoutComponent {
  year = new Date().getFullYear();
  owner = this.year + ' © Aleksandr Bredun';
}
