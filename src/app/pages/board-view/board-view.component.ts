import { ERoute } from '@/shared/constants/routes';
import { BoardService } from '@/shared/services/board.service';
import { ToastService } from '@/shared/services/toast.service';
import { Board } from '@/shared/types/board';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'board-view',
  imports: [],
  templateUrl: './board-view.component.html',
  styleUrl: './board-view.component.scss',
})
export class BoardViewComponent implements OnInit {
  router = inject(Router);
  route = inject(ActivatedRoute);
  boardService = inject(BoardService);
  toast = inject(ToastService);

  currentBoard = signal<Board | null>(null);

  ngOnInit() {
    const boardId = this.route.snapshot.paramMap.get('id');
    if (!boardId) {
      this.router.navigateByUrl(ERoute.BOARDS);
      return;
    }

    const board = this.boardService.boards().find((b) => b.id === boardId);
    if (board) {
      this.currentBoard.set(board);
      return;
    }

    this.boardService.getOne(boardId).subscribe({
      next: (b) => {
        this.currentBoard.set(b);
      },
      error: (err) => {
        this.toast.showError(err.error.message);
        // this.isLoading.set(false);
      },
    });
  }
}
