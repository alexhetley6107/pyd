import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { User } from '../types/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly API_URL = 'http://localhost:5001/api/auth';

  private user: User | null = null;

  constructor(private http: HttpClient) {}

  login(userName: string, password: string) {
    const body = { userName, password };
    return this.http.post<User>(`${this.API_URL}/login`, body).pipe(
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
