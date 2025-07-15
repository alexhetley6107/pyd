import { Component, inject } from '@angular/core';
import { ButtonComponent } from '@/shared/ui/button/button.component';
import { Router, RouterLink } from '@angular/router';
import { InputComponent } from '@/shared/ui/input/input.component';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { getError } from '@/shared/helpers/formErrors';
import { matchPasswords, passwordStrengthValidator } from '@/shared/helpers/matchPasswords';
import { AuthService } from '@/shared/services/auth.service';
import { ToastService } from '@/shared/services/toast.service';

@Component({
  selector: 'page-signup',
  imports: [ButtonComponent, RouterLink, InputComponent, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  standalone: true,
})
export class SignupComponent {
  router = inject(Router);
  auth = inject(AuthService);
  toast = inject(ToastService);

  isLoading = false;

  form!: FormGroup<{
    username: FormControl<string>;
    email: FormControl<string>;
    password: FormControl<string>;
    confirmPassword: FormControl<string>;
  }>;

  constructor(private fb: NonNullableFormBuilder) {}

  ngOnInit(): void {
    const isAuth = this.auth.isAuthenticated();

    if (isAuth) {
      this.router.navigate(['dashboard']);
      return;
    }

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
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    const userName = this.form.value.username ?? '';
    const email = this.form.value.email ?? '';
    const password = this.form.value.password ?? '';

    this.auth.signup(userName, email, password).subscribe({
      next: (res) => {
        this.toast.add(`Welcome ${res.userName}`);
        this.router.navigate(['dashboard']);
      },
      error: (err) => {
        this.toast.add(err.error.message, { type: 'error' });
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }
}
