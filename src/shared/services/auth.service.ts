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

  login(userName: string, password: string) {
    const body = { userName, password };
    return this.http.post<User>(API.login, body).pipe(
      tap((user) => {
        this.user = user;
        localStorage.setItem('token', user.loginInfo.token);
      })
    );
  }

  signup(userName: string, email: string, password: string) {
    const body = { userName, email, password };
    return this.http.post<User>(API.signup, body).pipe(
      tap((user) => {
        this.user = user;
        localStorage.setItem('token', user.loginInfo.token);
      })
    );
  }

  resetPassword(password: string) {
    const body = { password };
    return this.http.post<User>(API.signup, body).pipe(
      tap((user) => {
        this.user = user;
        localStorage.setItem('token', user.loginInfo.token);
      })
    );
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
