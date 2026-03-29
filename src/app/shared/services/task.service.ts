import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { API } from '../constants/api';
import { Task } from '../types/board';
import { tap } from 'rxjs';
import { TaskDto, TaskQueries } from '../types/dto';
import { getHttpParams } from '../utils/getHttpParams';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private http: HttpClient) {}

  isFetching = false;
  tasks: Task[] = [];

  openedTask = signal<Task | null>(null);

  openTask(taskId: string) {
    this.openedTask.set(this.tasks.find((t) => t.id === taskId) ?? null);
  }

  getAll(queries: TaskQueries = {}) {
    this.isFetching = true;

    const params = getHttpParams(queries);

    return this.http.get<Task[]>(API.task, { params }).pipe(
      tap((tasks) => {
        this.tasks = tasks;
        this.isFetching = false;
      })
    );
  }

  create(body: TaskDto) {
    return this.http.post<Task>(API.task, body).pipe(
      tap((task) => {
        this.tasks = [...this.tasks, task];
      })
    );
  }

  update(body: TaskDto) {
    return this.http.patch<Task>(API.task, body).pipe(
      tap((task) => {
        this.openedTask.set(null);
        this.tasks = this.tasks.map((t) => (t.id === task.id ? task : t));
      })
    );
  }

  delete(id: string) {
    return this.http.delete(`${API.task}/${id}`).pipe(
      tap(() => {
        this.tasks = this.tasks.filter((t) => t.id !== id);
        this.openedTask.set(null);
      })
    );
  }
}
