import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { API } from '../constants/api';
import { Board } from '../types/board';
import { tap, catchError, of, finalize, delay } from 'rxjs';
import { getHttpParams } from '../utils/getHttpParams';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  http = inject(HttpClient);

  isFetching = signal<boolean>(false);

  boards = signal<Board[]>([]);

  getAll(search?: string) {
    const params = getHttpParams({ search });

    this.isFetching.set(true);

    return this.http.get<Board[]>(API.board, { params }).pipe(
      delay(1000),
      tap((boards) => this.boards.set(boards)),
      finalize(() => this.isFetching.set(false))
    );
  }

  create(body: { name: string }) {
    return this.http.post<Board>(API.board, body).pipe(
      delay(1000),
      tap((board) => {
        this.boards.update((p) => [...p, board]);
      })
    );
  }

  update(body: { id: string; name: string; description: string }) {
    return this.http.patch<Board>(API.board, body).pipe(
      tap((board) => {
        this.boards.update((boards) => boards.map((b) => (b.id === board.id ? board : b)));
      })
    );
  }

  delete(id: string) {
    return this.http.delete(`${API.board}/${id}`).pipe(
      tap(() => {
        this.boards.update((boards) => boards.filter((b) => b.id !== id));
      })
    );
  }
}
