import { Component, inject } from '@angular/core';
import { ButtonComponent } from '../../shared/ui/button/button.component';
import { Router, RouterLink } from '@angular/router';
import { InputComponent } from '../../shared/ui/input/input.component';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { getError } from '../../shared/helpers/formErrors';
import { matchPasswords, passwordStrengthValidator } from '../../shared/helpers/matchPasswords';

@Component({
  selector: 'page-signup',
  imports: [ButtonComponent, RouterLink, InputComponent, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  standalone: true,
})
export class SignupComponent {
  router = inject(Router);

  isLoading = false;

  form!: FormGroup<{
    username: FormControl<string>;
    email: FormControl<string>;
    password: FormControl<string>;
    confirmPassword: FormControl<string>;
  }>;

  constructor(private fb: NonNullableFormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group(
      {
        username: this.fb.control('', [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ]),
        email: this.fb.control('', [Validators.required, Validators.email]),
        password: this.fb.control('', [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(40),
          passwordStrengthValidator,
        ]),
        confirmPassword: this.fb.control('', [Validators.required]),
      },
      { validators: matchPasswords('password', 'confirmPassword') }
    );
  }
  get usernameError(): string | null {
    return getError(this.form.get('username'), 'Username');
  }
  get emailError(): string | null {
    return getError(this.form.get('email'), 'Email');
  }
  get passwordError(): string | null {
    return getError(this.form.get('password'), 'Password');
  }
  get confirmPasswordError(): string | null {
    return getError(
      this.form.get('confirmPassword'),
      'Confirm Password',
      this.form,
      'passwordsMismatch'
    );
  }

  handleSubmit() {
    console.log(this.form.value);

    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    // this.isLoading = !this.isLoading;
    this.router.navigate(['dashboard']);
  }
}
