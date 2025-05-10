import { Component, Input } from '@angular/core';

type InputTypeUnion = 'text' | 'email' | 'password';

@Component({
  selector: 'ui-input',
  imports: [],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  standalone: true,
})
export class InputComponent {
  @Input() placeholder: string = '';
  @Input() type: InputTypeUnion = 'text';

  isPasswordVisible = false;

  togglePassword() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
}
