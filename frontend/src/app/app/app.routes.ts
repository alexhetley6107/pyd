import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { PrivateGuard } from '@/app/guards/private.guard';
import { PublicGuard } from '@/app/guards/public.guard';
import { ERoute } from '@/shared/constants/routes';

export const routes: Routes = [
  {
    path: ERoute.ME,
    loadComponent: () =>
      import('@/pages/auth-check/auth-check.component').then((m) => m.AuthCheckComponent),
  },
  {
    path: '',
    component: AuthLayoutComponent,
    canActivate: [PublicGuard],
    children: [
      { path: '', redirectTo: ERoute.LOGIN, pathMatch: 'full' },
      {
        path: ERoute.LOGIN,
        loadComponent: () => import('@/pages/login/login.component').then((m) => m.LoginComponent),
      },
      {
        path: ERoute.SIGNUP,
        loadComponent: () =>
          import('@/pages/signup/signup.component').then((m) => m.SignupComponent),
      },
      {
        path: ERoute.FORGOT_PASSWORD,
        loadComponent: () =>
          import('@/pages/forgot-password/forgot-password.component').then(
            (m) => m.ForgotPasswordComponent
          ),
      },
      {
        path: ERoute.RESET_PASSWORD,
        loadComponent: () =>
          import('@/pages/reset-password/reset-password.component').then(
            (m) => m.ResetPasswordComponent
          ),
      },
    ],
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [PrivateGuard],
    children: [
      {
        path: ERoute.DASHBOARD,
        loadComponent: () =>
          import('@/pages/dashboard/dashboard.component').then((m) => m.DashboardComponent),
      },
      {
        path: ERoute.BOARDS,
        loadComponent: () =>
          import('@/pages/boards/boards.component').then((m) => m.BoardsComponent),
      },
      {
        path: ERoute.BOARD_VIEW,
        loadComponent: () =>
          import('@/pages/board-view/board-view.component').then((m) => m.BoardViewComponent),
      },
      {
        path: ERoute.BOARD_DETAILS,
        loadComponent: () =>
          import('@/pages/board-details/board-details.component').then(
            (m) => m.BoardDetailsComponent
          ),
      },
      {
        path: ERoute.CREATE_BOARD,
        loadComponent: () =>
          import('@/pages/create-board/create-board.component').then((m) => m.CreateBoardComponent),
      },
      {
        path: ERoute.CREATE_TASK,
        loadComponent: () =>
          import('@/pages/create-task/create-task.component').then((m) => m.CreateTaskComponent),
      },
      {
        path: ERoute.TASK_VIEW,
        loadComponent: () =>
          import('@/pages/task-view/task-view.component').then((m) => m.TaskViewComponent),
      },
      {
        path: ERoute.BACKLOG,
        loadComponent: () =>
          import('@/pages/backlog/backlog.component').then((m) => m.BacklogComponent),
      },
      {
        path: ERoute.BACKLOG_TASK_VIEW,
        loadComponent: () =>
          import('@/pages/task-view/task-view.component').then((m) => m.TaskViewComponent),
      },
      {
        path: ERoute.PROFILE,
        loadComponent: () =>
          import('@/pages/profile/profile.component').then((m) => m.ProfileComponent),
      },
    ],
  },
  {
    path: '**',
    loadComponent: () =>
      import('@/pages/not-found/not-found.component').then((m) => m.NotFoundComponent),
  },
];
