import { Component, inject } from '@angular/core';
import { InputComponent } from '@/shared/ui/input/input.component';
import { ButtonComponent } from '@/shared/ui/button/button.component';
import { Router, RouterLink } from '@angular/router';
import {
  FormGroup,
  FormControl,
  NonNullableFormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { getError } from '@/shared/helpers/formErrors';
import { AuthService } from '@/entities/user/service/auth.service';
import { ToastService } from '@/shared/services/toast.service';
import { Nullable } from '@/shared/types';

@Component({
  selector: 'page-forgot-password',
  imports: [ButtonComponent, RouterLink, InputComponent, ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
  standalone: true,
})
export class ForgotPasswordComponent {
  router = inject(Router);
  auth = inject(AuthService);
  toast = inject(ToastService);

  isLoading = false;

  form!: FormGroup<{
    email: FormControl<string>;
  }>;

  constructor(private fb: NonNullableFormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
    });
  }
  get error(): Nullable<string> {
    return getError(this.form.get('email'));
  }

  handleSubmit() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }
    this.isLoading = true;

    const email = this.form.value.email ?? '';

    this.auth.forgotPassword(email).subscribe({
      next: () => {
        this.toast.success(`Check your email to reset your password`);
        this.form.reset();
      },
      error: (err) => {
        this.toast.error(err.error.message);
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }
}
