import { Routes } from '@angular/router';
import { AuthLayoutComponent } from '../shared/ui/auth-layout/auth-layout.component';
import { LoginComponent } from '../pages/login/login.component';
import { SignupComponent } from '../pages/signup/signup.component';
import { ForgotPasswordComponent } from '../pages/forgot-password/forgot-password.component';

export const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      // { path: '', redirectTo: 'profile/me', pathMatch: 'full' },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent },
    ],
  },
];
