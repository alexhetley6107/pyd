import { Component } from '@angular/core';
import { ButtonComponent } from '../../shared/ui/button/button.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'page-login',
  imports: [ButtonComponent, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone: true,
})
export class LoginComponent {
  handleLogin() {
    console.log('login');
  }
}
