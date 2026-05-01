import { Nullable } from '@/shared/types';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { User } from '../model';
import { API } from '@/shared/constants/api';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly http = inject(HttpClient);

  user = signal<Nullable<User>>(null);

  uploadPhoto(formData: FormData) {
    return this.http.post<User>(API.upload, formData).pipe(tap((user) => this.user.set(user)));
  }
}
