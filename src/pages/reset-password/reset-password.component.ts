import { getError } from '@/shared/helpers/formErrors';
import { matchPasswords, passwordStrengthValidator } from '@/shared/helpers/matchPasswords';
import { AuthService } from '@/shared/services/auth.service';
import { ToastService } from '@/shared/services/toast.service';
import { ButtonComponent } from '@/shared/ui/button/button.component';
import { InputComponent } from '@/shared/ui/input/input.component';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  imports: [ButtonComponent, RouterLink, InputComponent, ReactiveFormsModule],

  templateUrl: './reset-password.component.html',
})
export class ResetPasswordComponent {
  router = inject(Router);
  auth = inject(AuthService);
  toast = inject(ToastService);

  isLoading = false;
  isDone = false;

  form!: FormGroup<{
    password: FormControl<string>;
    confirmPassword: FormControl<string>;
  }>;

  constructor(private fb: NonNullableFormBuilder, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const isAuth = this.auth.isAuthenticated();

    if (isAuth) {
      this.router.navigate(['dashboard']);
      return;
    }

    this.form = this.fb.group(
      {
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

    const token = this.route.snapshot.queryParamMap.get('token') ?? '';
    const newPassword = this.form.value.password ?? '';

    this.auth.resetPassword(token, newPassword).subscribe({
      next: (res) => {
        this.toast.add(res.message);
        this.form.reset();

        setTimeout(() => {
          this.router.navigate(['login']);
        }, 5000);
      },
      error: (err) => {
        this.toast.add(err.error.message, { type: 'error' });
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
        this.isDone = true;
      },
    });
  }
}
