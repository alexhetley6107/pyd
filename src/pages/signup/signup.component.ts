import { Component, inject } from '@angular/core';
import { ButtonComponent } from '../../shared/ui/button/button.component';
import { Router, RouterLink } from '@angular/router';
import { InputComponent } from '../../shared/ui/input/input.component';

@Component({
  selector: 'page-signup',
  imports: [ButtonComponent, RouterLink, InputComponent],
  templateUrl: './signup.component.html',
  standalone: true,
})
export class SignupComponent {
  router = inject(Router);

  handleSignup() {
    this.router.navigate(['/dashboard']);
  }
}
