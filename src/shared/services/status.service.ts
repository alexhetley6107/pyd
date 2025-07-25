import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '../constants/api';
import { Status } from '../types/board';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StatusService {
  constructor(private http: HttpClient) {}

  statuses: Status[] = [];

  getAll() {
    return this.http.get<Status[]>(API.status).pipe(
      tap((statuses) => {
        this.statuses = statuses;
      })
    );
  }
}
