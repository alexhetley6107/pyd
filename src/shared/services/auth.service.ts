import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { User } from '../types/user';
import { API } from '../constants/api';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user: User | null = null;

  constructor(private http: HttpClient) {}

  login(body: { login: string; password: string }) {
    return this.http.post<User>(API.login, body).pipe(
      tap((user) => {
        this.user = user;
        localStorage.setItem('token', user.loginInfo.token);
      })
    );
  }

  signup(nickname: string, email: string, password: string) {
    const body = { nickname, email, password };
    return this.http.post<User>(API.signup, body).pipe(
      tap((user) => {
        this.user = user;
        localStorage.setItem('token', user.loginInfo.token);
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

  logout() {
    localStorage.removeItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getUser(): User | null {
    return this.user;
  }
}
