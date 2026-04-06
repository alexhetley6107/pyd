import { ERoute } from '@/shared/constants/routes';
import { BoardService } from '@/shared/services/board.service';
import { ToastService } from '@/shared/services/toast.service';
import { Board } from '@/shared/types/board';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BreadcrumbsComponent } from '@/shared/ui/breadcrumbs/breadcrumbs.component';
import { BreadCrumbItem } from '@/shared/types/ui';
import { ButtonComponent } from '@/shared/ui/button/button.component';

@Component({
  selector: 'board-view',
  imports: [BreadcrumbsComponent, ButtonComponent, RouterLink],
  templateUrl: './board-view.component.html',
  styleUrl: './board-view.component.scss',
})
export class BoardViewComponent implements OnInit {
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
