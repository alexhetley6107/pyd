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

  isFetching = false;

  statuses: Status[] = [];

  getAll() {
    this.isFetching = true;

    return this.http.get<Status[]>(API.status).pipe(
      tap((statuses) => {
        // this.statuses = statuses;
        this.statuses = [{ id: 'backlog', name: 'Backlog', order: 0, userId: '' }, ...statuses];

        this.isFetching = false;
      })
    );
  }

  create(body: { name: string }) {
    return this.http.post<Status>(API.status, body).pipe(
      tap((s) => {
        this.statuses = [...this.statuses, s];
      })
    );
  }

  change(body: { id: string; order: number }) {
    return this.http.patch<Status>(API.status, body).pipe(
      tap((status) => {
        this.statuses = this.statuses.map((s) => (s.id === status.id ? status : s));
      })
    );
  }

  delete(id: string) {
    return this.http.delete(`${API.status}/${id}`).pipe(
      tap(() => {
        this.statuses = this.statuses.filter((b) => b.id !== id);
      })
    );
  }
}
