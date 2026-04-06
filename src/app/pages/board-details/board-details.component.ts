import { Component, computed, inject, signal } from '@angular/core';
import { BreadcrumbsComponent } from '@/shared/ui/breadcrumbs/breadcrumbs.component';
import { ERoute } from '@/shared/constants/routes';
import { ActivatedRoute, Router } from '@angular/router';
import { BoardService } from '@/shared/services/board.service';
import { ToastService } from '@/shared/services/toast.service';
import { Board } from '@/shared/types/board';
import { BreadCrumbItem } from '@/shared/types/ui';

@Component({
  selector: 'board-details',
  imports: [BreadcrumbsComponent],
  templateUrl: './board-details.component.html',
  styleUrl: './board-details.component.scss',
})
export class BoardDetailsComponent {
  router = inject(Router);
  route = inject(ActivatedRoute);
  boardService = inject(BoardService);
  toast = inject(ToastService);

  currentBoard = signal<Board | null>(null);

  links = computed<BreadCrumbItem[]>(() => [
    {
      text: 'Boards',
      link: '/' + ERoute.BOARDS,
    },
    {
      text: this.currentBoard()?.name ?? '',
      link: '/' + ERoute.BOARDS + '/' + this.currentBoard()?.id,
    },
    {
      text: 'Details',
    },
  ]);

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
