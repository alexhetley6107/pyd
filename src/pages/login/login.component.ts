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
import { tap } from 'rxjs';
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
    username: FormControl<string>;
    password: FormControl<string>;
  }>;

  constructor(private fb: NonNullableFormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      username: this.fb.control('', [Validators.required]),
      password: this.fb.control('', [Validators.required]),
    });
  }
  get usernameError(): string | null {
    return getError(this.form.get('username'), 'Username');
  }
  get passwordError(): string | null {
    return getError(this.form.get('password'), 'Password');
  }

  handleSubmit() {
    this.toast.add(
      'Hello World toast,toast, Hello World toast,toast, Hello World toast,toast, Hello World toast,toast,'
    );
    //   if (!this.form.valid) {
    //     this.form.markAllAsTouched();
    //     return;
    //   }
    //   this.isLoading = true;
    //   this.auth.login(this.form.value.username ?? '', this.form.value.password ?? '').subscribe({
    //     next: () => {
    //       this.isLoading = false;
    //     },
    //     error: () => console.log('Login failed'),
    //   });
    //   // this.router.navigate(['dashboard']);
  }
}
