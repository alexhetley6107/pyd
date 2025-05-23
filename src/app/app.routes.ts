import { Routes } from '@angular/router';
import { AuthLayoutComponent } from '../widgets/auth-layout/auth-layout.component';
import { LoginComponent } from '../pages/login/login.component';
import { SignupComponent } from '../pages/signup/signup.component';
import { ForgotPasswordComponent } from '../pages/forgot-password/forgot-password.component';
import { MainLayoutComponent } from '../widgets/main-layout/main-layout.component';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { CalendarComponent } from '@/pages/calendar/calendar.component';
import { AgileBoardComponent } from '@/pages/agile-board/agile-board.component';
import { BacklogComponent } from '@/pages/backlog/backlog.component';
import { NotFoundComponent } from '@/pages/not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent },
    ],
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'agile-board', component: AgileBoardComponent },
      { path: 'calendar', component: CalendarComponent },
      { path: 'backlog', component: BacklogComponent },
    ],
  },
  { path: '**', component: NotFoundComponent },
];
