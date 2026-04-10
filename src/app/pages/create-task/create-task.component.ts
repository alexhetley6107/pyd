import { Component, computed, inject, signal } from '@angular/core';
import { BreadcrumbsComponent } from '@/shared/ui/breadcrumbs/breadcrumbs.component';
import { ERoute } from '@/shared/constants/routes';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadCrumbItem } from '@/shared/types/ui';
import { Board } from '@/shared/types/board';
import { BoardService } from '@/shared/services/board.service';
import { ToastService } from '@/shared/services/toast.service';

@Component({
  selector: 'create-task',
  imports: [BreadcrumbsComponent],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.scss',
})
export class CreateTaskComponent {
  router = inject(Router);
  route = inject(ActivatedRoute);
  boardService = inject(BoardService);
  toast = inject(ToastService);

  currentBoard = signal<Board | null>(null);

  isModal = signal(false);
  isLoading = signal(false);

  ngOnInit() {
    const boardId = this.route.snapshot.queryParamMap.get('boardId');

    if (!boardId) return;

    const b = this.boardService.boards().find((b) => b.id === boardId);
    if (b) {
      this.currentBoard.set(b);
      return;
    }

    this.isLoading.set(true);
    this.boardService.getOne(boardId).subscribe({
      next: (b) => {
        this.currentBoard.set(b);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.toast.showError(err.error.message);
        this.isLoading.set(false);
      },
    });
  }

  links = computed<BreadCrumbItem[]>(() => {
    const board = this.currentBoard();

    const base = board
      ? [
          {
            text: 'Boards',
            link: '/' + ERoute.BOARDS,
          },
          {
            text: board.name,
            link: `/${ERoute.BOARDS}/${board.id}`,
          },
        ]
      : [
          {
            text: 'Backlog',
            link: '/' + ERoute.BACKLOG,
          },
        ];

    return [
      ...base,
      {
        text: 'Create New Task',
      },
    ];
  });
}
