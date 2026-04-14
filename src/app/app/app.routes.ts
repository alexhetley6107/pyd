import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { LoginComponent } from '../pages/login/login.component';
import { SignupComponent } from '../pages/signup/signup.component';
import { ForgotPasswordComponent } from '../pages/forgot-password/forgot-password.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { BacklogComponent } from '@/pages/backlog/backlog.component';
import { NotFoundComponent } from '@/pages/not-found/not-found.component';
import { PrivateGuard } from '@/app/guards/private.guard';
import { SettingComponent } from '@/pages/setting/setting.component';
import { ResetPasswordComponent } from '@/pages/reset-password/reset-password.component';
import { BoardsComponent } from '@/pages/boards/boards.component';
import { CreateBoardComponent } from '@/pages/create-board/create-board.component';
import { CreateTaskComponent } from '@/pages/create-task/create-task.component';
import { AuthCheckComponent } from '@/pages/auth-check/auth-check.component';
import { PublicGuard } from '@/app/guards/public.guard';
import { ERoute } from '@/shared/constants/routes';
import { DashboardComponent } from '@/pages/dashboard/dashboard.component';
import { BoardViewComponent } from '@/pages/board-view/board-view.component';
import { BoardDetailsComponent } from '@/pages/board-details/board-details.component';
import { TaskViewComponent } from '@/pages/task-view/task-view.component';

export const routes: Routes = [
  {
    path: ERoute.ME,
    component: AuthCheckComponent,
  },
  {
    path: '',
    component: AuthLayoutComponent,
    canActivate: [PublicGuard],
    children: [
      { path: '', redirectTo: ERoute.LOGIN, pathMatch: 'full' },
      { path: ERoute.LOGIN, component: LoginComponent },
      { path: ERoute.SIGNUP, component: SignupComponent },
      { path: ERoute.FORGOT_PASSWORD, component: ForgotPasswordComponent },
      { path: ERoute.RESET_PASSWORD, component: ResetPasswordComponent },
    ],
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [PrivateGuard],
    children: [
      { path: ERoute.DASHBOARD, component: DashboardComponent },
      { path: ERoute.BOARDS, component: BoardsComponent },
      { path: ERoute.BOARD_VIEW, component: BoardViewComponent },
      { path: ERoute.BOARD_DETAILS, component: BoardDetailsComponent },
      { path: ERoute.CREATE_BOARD, component: CreateBoardComponent },
      { path: ERoute.CREATE_TASK, component: CreateTaskComponent },
      { path: ERoute.TASK_VIEW, component: TaskViewComponent },
      { path: ERoute.BACKLOG, component: BacklogComponent },
      { path: ERoute.SETTING, component: SettingComponent },
    ],
  },
  { path: '**', component: NotFoundComponent },
];
