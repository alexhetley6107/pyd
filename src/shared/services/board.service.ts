import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { API } from '../constants/api';
import { Board } from '../types/board';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  constructor(private http: HttpClient) {}

  isFetching = false;

  boards: Board[] = [];

  openedBoard = signal<Board | null>(null);

  openBoard(boardId: string | null) {
    const board = this.boards.find((b) => b.id === boardId) ?? null;
    this.openedBoard.set(board);
  }

  getAll() {
    this.isFetching = true;
    return this.http.get<Board[]>(API.board).pipe(
      tap((boards) => {
        this.boards = boards;
        this.openedBoard.set(boards?.[0] ?? null);
        this.isFetching = false;
      })
    );
  }

  create(body: { name: string }) {
    return this.http.post<Board>(API.board, body).pipe(
      tap((board) => {
        this.openedBoard.set(board);
        this.boards = [...this.boards, board];
      })
    );
  }

  update(body: { id: string; name: string }) {
    return this.http.patch<Board>(API.board, body).pipe(
      tap((board) => {
        this.openedBoard.set(board);
        this.boards = this.boards.map((b) => (b.id === board.id ? board : b));
      })
    );
  }

  delete(id: string) {
    return this.http.delete(`${API.board}/${id}`).pipe(
      tap(() => {
        this.boards = this.boards.filter((b) => b.id !== id);
        this.openedBoard.set(this.boards?.[0] ?? null);
      })
    );
  }
}
