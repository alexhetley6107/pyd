import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '../constants/api';
import { Task } from '../types/board';
import { tap } from 'rxjs';

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
}
