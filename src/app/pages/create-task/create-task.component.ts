import { Component, computed, inject, signal } from '@angular/core';
import { BreadcrumbsComponent } from '@/shared/ui/breadcrumbs/breadcrumbs.component';
import { ERoute } from '@/shared/constants/routes';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadCrumbItem } from '@/shared/types/ui';
import { Board } from '@/shared/types/board';
import { BoardService } from '@/shared/services/board.service';
import { ToastService } from '@/shared/services/toast.service';
import { SkeletonComponent } from '@/shared/ui/skeleton/skeleton.component';
import { toSignal } from '@angular/core/rxjs-interop';

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

  isModal = signal(false);
  isLoading = signal(false);

  private queryParams = toSignal(this.route.queryParams);

  boardId = computed(() => this.queryParams()?.['boardId'] ?? null);

  currentBoard = computed<Board | null>(() => {
    const id = this.boardId();
    if (!id) return null;

    return this.boardService.boards().find((b) => b.id === id) ?? null;
  });

  isFetching = computed(() => {
    return this.boardId() ? this.boardService.isFetching() : false;
  });

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
