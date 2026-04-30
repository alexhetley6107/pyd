import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { tap, finalize, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { User } from '../model';
import { API } from '@/shared/constants/api';
import { Nullable } from '@/shared/types';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);

  readonly isGettingMe = signal(true);
  readonly user = signal<Nullable<User>>(null);
  readonly isLoggedIn = computed(() => this.user() !== null);

  getMe() {
    return this.http.get<Nullable<User>>(API.me).pipe(
      tap((user) => this.user.set(user)),
      catchError(() => {
        this.user.set(null);
        return of(null);
      }),
      finalize(() => this.isGettingMe.set(false))
    );
  }

  login(body: { login: string; password: string }) {
    return this.http.post<User>(API.login, body).pipe(tap((user) => this.user.set(user)));
  }

  signup(nickname: string, email: string, password: string) {
    return this.http
      .post<User>(API.signup, { nickname, email, password })
      .pipe(tap((user) => this.user.set(user)));
  }

  forgotPassword(email: string) {
    return this.http.post(API.forgotPassword, { email });
  }

  resetPassword(token: string, newPassword: string) {
    return this.http.post<{ message: string }>(API.resetPassword, { token, newPassword });
  }

  refresh() {
    return this.http.post(API.refresh, {});
  }

  logout() {
    return this.http.post(API.logout, {}).pipe(tap(() => this.user.set(null)));
  }

  upload(formData: FormData) {
    return this.http.post(API.upload, formData).pipe(
      tap((res) => {
        console.log({ res });
      })
    );
  }
}
