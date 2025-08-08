import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '../constants/api';
import { Task } from '../types/board';
import { tap } from 'rxjs';
import { TaskDto } from '../types/dto';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private http: HttpClient) {}

  isFetching = false;

  tasks: Task[] = [];

  getAll() {
    this.isFetching = true;

    return this.http.get<Task[]>(API.task).pipe(
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
}
