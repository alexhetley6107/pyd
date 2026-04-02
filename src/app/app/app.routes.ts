import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { LoginComponent } from '../pages/login/login.component';
import { SignupComponent } from '../pages/signup/signup.component';
import { ForgotPasswordComponent } from '../pages/forgot-password/forgot-password.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { AgileBoardComponent } from '@/pages/agile-board/agile-board.component';
import { BacklogComponent } from '@/pages/backlog/backlog.component';
import { NotFoundComponent } from '@/pages/not-found/not-found.component';
import { PrivateGuard } from '@/shared/guards/private.guard';
import { SettingComponent } from '@/pages/setting/setting.component';
import { ResetPasswordComponent } from '@/pages/reset-password/reset-password.component';
import { BoardsComponent } from '@/pages/boards/boards.component';
import { CreateBoardComponent } from '@/pages/create-board/create-board.component';
import { CreateTaskComponent } from '@/pages/create-task/create-task.component';
import { AuthCheckComponent } from '@/pages/auth-check/auth-check.component';
import { PublicGuard } from '@/shared/guards/public.guard';

export const routes: Routes = [
  {
    path: 'me',
    component: AuthCheckComponent,
  },
  {
    path: '',
    component: AuthLayoutComponent,
    canActivate: [PublicGuard],
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent },
      { path: 'reset-password', component: ResetPasswordComponent },
    ],
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [PrivateGuard],
    children: [
      { path: 'boards', component: BoardsComponent },
      { path: 'create-board', component: CreateBoardComponent },
      { path: 'create-task', component: CreateTaskComponent },

      // { path: 'agile-board', component: AgileBoardComponent },
      // { path: 'backlog', component: BacklogComponent },
      // { path: 'setting', component: SettingComponent },
    ],
  },
  { path: '**', component: NotFoundComponent },
];
