import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { API } from '@/shared/constants/api';
import { delay, tap } from 'rxjs';
import { getHttpParams } from '@/shared/utils/getHttpParams';
import { Task, TaskDto, TaskQueries } from '../model';
import { Nullable } from '@/shared/types';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private http: HttpClient) {}

  isFetching = signal(false);
  loadedBoardId = signal<Nullable<string>>(null);

  tasks = signal<Task[]>([]);

  getAll(queries: TaskQueries = {}) {
    this.isFetching.set(true);

    const params = getHttpParams(queries);

    return this.http.get<Task[]>(API.task, { params }).pipe(
      delay(1000),
      tap((tasks) => {
        this.tasks.set(tasks);
        this.isFetching.set(false);
      })
    );
  }

  create(body: TaskDto) {
    return this.http.post<Task>(API.task, body).pipe(
      tap((task) => {
        this.tasks.update((tasks) => [...tasks, task]);
      })
    );
  }

  update(body: TaskDto) {
    return this.http.patch<Task>(API.task, body).pipe(
      tap((task) => {
        this.tasks.update((tasks) => tasks.map((t) => (t.id === task.id ? task : t)));
      })
    );
  }

  delete(id: string) {
    return this.http.delete(`${API.task}/${id}`).pipe(
      tap(() => {
        this.tasks.update((tasks) => tasks.filter((t) => t.id !== id));
      })
    );
  }
}
