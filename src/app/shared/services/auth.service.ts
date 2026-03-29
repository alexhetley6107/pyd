import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { User } from '../types/user';
import { API } from '../constants/api';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user: User | null = null;

  router = inject(Router);

  constructor(private http: HttpClient) {}

  login(body: { login: string; password: string }) {
    return this.http.post<User>(API.login, body).pipe(
      tap((user) => {
        this.user = user;
      })
    );
  }

  signup(nickname: string, email: string, password: string) {
    const body = { nickname, email, password };
    return this.http.post<User>(API.signup, body).pipe(
      tap((user) => {
        this.user = user;
      })
    );
  }

  forgotPassword(email: string) {
    return this.http.post<User>(API.forgotPassword, { email });
  }

  resetPassword(token: string, newPassword: string) {
    const body = { token, newPassword };
    return this.http.post<{ message: string }>(API.resetPassword, body);
  }

  refresh() {
    return this.http.post(API.refresh, {});
  }

  logout() {
    this.http.post(API.logout, {}).subscribe();
    this.router.navigate(['/login']);
  }

  getMe() {
    return this.http.get(API.me);
  }

  isAuthenticated(): boolean {
    return !!this.user;
  }

  getUser() {
    return this.user;
  }
}
