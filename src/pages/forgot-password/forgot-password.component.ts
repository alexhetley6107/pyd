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
import { AuthService } from '@/shared/services/auth.service';

@Component({
  selector: 'page-forgot-password',
  imports: [ButtonComponent, RouterLink, InputComponent, ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
  standalone: true,
})
export class ForgotPasswordComponent {
  router = inject(Router);
  auth = inject(AuthService);

  isLoading = false;

  form!: FormGroup<{
    email: FormControl<string>;
  }>;

  constructor(private fb: NonNullableFormBuilder) {}

  ngOnInit(): void {
    const isAuth = this.auth.isAuthenticated();

    if (isAuth) {
      this.router.navigate(['dashboard']);
      return;
    }

    this.form = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
    });
  }
  get error(): string | null {
    return getError(this.form.get('email'));
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
