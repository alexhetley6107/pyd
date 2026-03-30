import { Routes } from '@angular/router';
import { AuthLayoutComponent } from '../widgets/auth-layout/auth-layout.component';
import { LoginComponent } from '../pages/login/login.component';
import { SignupComponent } from '../pages/signup/signup.component';
import { ForgotPasswordComponent } from '../pages/forgot-password/forgot-password.component';
import { MainLayoutComponent } from '../widgets/main-layout/main-layout.component';
import { AgileBoardComponent } from '@/pages/agile-board/agile-board.component';
import { BacklogComponent } from '@/pages/backlog/backlog.component';
import { NotFoundComponent } from '@/pages/not-found/not-found.component';
import { authGuard, publicGuard } from '@/shared/guards/auth.guard';
import { SettingComponent } from '@/pages/setting/setting.component';
import { ResetPasswordComponent } from '@/pages/reset-password/reset-password.component';
import { BoardsComponent } from '@/pages/boards/boards.component';
import { CreateBoardComponent } from '@/pages/create-board/create-board.component';
import { CreateTaskComponent } from '@/pages/create-task/create-task.component';
import { CheckAuthLayoutComponent } from './layouts/check-auth-layout/check-auth-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: CheckAuthLayoutComponent,
    children: [
      {
        path: '',
        component: AuthLayoutComponent,
        canActivate: [publicGuard],
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
        canActivate: [authGuard],
        children: [
          { path: 'boards', component: BoardsComponent },
          { path: 'create-board', component: CreateBoardComponent },
          { path: 'create-task', component: CreateTaskComponent },

          // { path: 'agile-board', component: AgileBoardComponent },
          // { path: 'backlog', component: BacklogComponent },
          // { path: 'setting', component: SettingComponent },
        ],
      },
    ],
  },
  { path: '**', component: NotFoundComponent },
];
