import { Component, inject } from '@angular/core';
import { ButtonComponent } from '../../shared/ui/button/button.component';
import { Router, RouterLink } from '@angular/router';
import { InputComponent } from '../../shared/ui/input/input.component';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'page-login',
  imports: [ButtonComponent, RouterLink, InputComponent, ReactiveFormsModule],
  templateUrl: './login.component.html',
  standalone: true,
})
export class LoginComponent {
  router = inject(Router);

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
    const control = this.form.get('username');
    if (control?.touched && control.invalid) {
      if (control.errors?.['required']) return 'Username is required.';
    }
    return null;
  }

  get passwordError(): string | null {
    const control = this.form.get('password');
    if (control?.touched && control.invalid) {
      if (control.errors?.['required']) return 'Password is required.';
    }
    return null;
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
