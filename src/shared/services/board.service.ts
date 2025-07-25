import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '../constants/api';
import { Board } from '../types/board';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  constructor(private http: HttpClient) {}

  boards: Board[] = [];

  getAll() {
    return this.http.get<Board[]>(API.board).pipe(
      tap((boards) => {
        this.boards = boards;
      })
    );
  }
}
