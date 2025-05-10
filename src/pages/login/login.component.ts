import { Component, inject } from '@angular/core';
import { ButtonComponent } from '../../shared/ui/button/button.component';
import { Router, RouterLink } from '@angular/router';
import { InputComponent } from '../../shared/ui/input/input.component';

@Component({
  selector: 'page-login',
  imports: [ButtonComponent, RouterLink, InputComponent],
  templateUrl: './login.component.html',
  standalone: true,
})
export class LoginComponent {
  router = inject(Router);

  isLoading = false;

  handleLogin() {
    this.isLoading = !this.isLoading;
    // this.router.navigate(['dashboard']);
  }
}
