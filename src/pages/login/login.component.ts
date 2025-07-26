import { Component, inject } from '@angular/core';
import { ButtonComponent } from '@/shared/ui/button/button.component';
import { Router, RouterLink } from '@angular/router';
import { InputComponent } from '@/shared/ui/input/input.component';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { getError } from '@/shared/helpers/formErrors';
import { AuthService } from '@/shared/services/auth.service';
import { ToastService } from '@/shared/services/toast.service';

@Component({
  selector: 'page-login',
  imports: [ButtonComponent, RouterLink, InputComponent, ReactiveFormsModule],
  templateUrl: './login.component.html',
  standalone: true,
})
export class LoginComponent {
  router = inject(Router);
  auth = inject(AuthService);
  toast = inject(ToastService);

  isLoading = false;

  form!: FormGroup<{
    login: FormControl<string>;
    password: FormControl<string>;
  }>;

  constructor(private fb: NonNullableFormBuilder) {}

  ngOnInit(): void {
    const isAuth = this.auth.isAuthenticated();

    if (isAuth) {
      this.router.navigate(['dashboard']);
      return;
    }

    this.form = this.fb.group({
      login: this.fb.control('', [Validators.required]),
      password: this.fb.control('', [Validators.required]),
    });
  }
  get loginError(): string | null {
    return getError(this.form.get('login'), 'login');
  }
  get passwordError(): string | null {
    return getError(this.form.get('password'), 'Password');
  }

  handleSubmit() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }
    this.isLoading = true;

    const login = this.form.value.login ?? '';
    const password = this.form.value.password ?? '';

    this.auth.login(login, password).subscribe({
      next: (res) => {
        this.toast.add(`Welcome ${res.nickname}`);
        this.router.navigate(['agile-board']);
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
