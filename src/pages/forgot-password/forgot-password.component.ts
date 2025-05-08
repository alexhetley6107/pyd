import { Component } from '@angular/core';
import { InputComponent } from '../../shared/ui/input/input.component';
import { ButtonComponent } from '../../shared/ui/button/button.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'page-forgot-password',
  imports: [InputComponent, ButtonComponent, RouterLink],
  templateUrl: './forgot-password.component.html',
  standalone: true,
})
export class ForgotPasswordComponent {}
