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
import { decryptObject, encryptObject } from '@/shared/utils/encrypt';

@Component({
  selector: 'page-login',
  imports: [ButtonComponent, RouterLink, InputComponent, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone: true,
})
export class LoginComponent {
  router = inject(Router);
  auth = inject(AuthService);
  toast = inject(ToastService);

  isLoading = false;
  isRememberMe = false;

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

    const initials = { login: '', password: '' };

    const savedCreds = localStorage.getItem('rememberMe');
    if (savedCreds) {
      this.isRememberMe = true;
      const decryptedCreds = decryptObject(savedCreds);
      initials.login = decryptedCreds?.login ?? '';
      initials.password = decryptedCreds?.password ?? '';
    }

    this.form = this.fb.group({
      login: this.fb.control(initials.login, [Validators.required]),
      password: this.fb.control(initials.password, [Validators.required]),
    });
  }

  toggleRememberMe(e: Event) {
    const input = e.target as HTMLInputElement;
    this.isRememberMe = input.checked;
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
    const body = { login, password };

    this.auth.login(body).subscribe({
      next: (res) => {
        if (this.isRememberMe) {
          localStorage.setItem('rememberMe', encryptObject(body));
        } else {
          localStorage.removeItem('rememberMe');
        }
        this.router.navigate(['backlog']);
        this.toast.add(`Welcome ${res.nickname}`);
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
