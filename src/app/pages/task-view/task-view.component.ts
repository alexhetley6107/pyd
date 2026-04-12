import { Board } from '@/entities/board/model';
import { BoardService } from '@/entities/board/service/board.service';
import { ToastService } from '@/shared/services/toast.service';
import { BreadCrumbItem, Nullable } from '@/shared/types';
import { Component, computed, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadcrumbsComponent } from '@/shared/ui/breadcrumbs/breadcrumbs.component';
import { ERoute } from '@/shared/constants/routes';
import { Task } from '@/entities/task/model';
import { TaskService } from '@/entities/task/service/task.service';

@Component({
  selector: 'task-view',
  imports: [BreadcrumbsComponent],
  templateUrl: './task-view.component.html',
  styleUrl: './task-view.component.scss',
})
export class TaskViewComponent {
  router = inject(Router);
  route = inject(ActivatedRoute);
  boardService = inject(BoardService);
  taskService = inject(TaskService);
  toast = inject(ToastService);

  private queryParams = toSignal(this.route.queryParams);

  boardId = computed(() => this.queryParams()?.['boardId'] ?? null);
  taskId = computed(() => this.route.snapshot.paramMap.get('taskId') ?? null);

  currentBoard = computed<Nullable<Board>>(() => {
    const id = this.boardId();
    if (!id) return null;

    return this.boardService.boards().find((b) => b.id === id) ?? null;
  });

  currentTask = computed<Nullable<Task>>(() => {
    const id = this.taskId();
    if (!id) return null;

    return this.taskService.tasks().find((b) => b.id === id) ?? null;
  });

  t = effect(() => {
    if (this.taskId()) {
      this.taskService.getAll({ id: this.taskId() ?? '' }).subscribe({
        error: (err) => {
          this.toast.showError(err.error.message);
          this.router.navigateByUrl(this.boardId() ? ERoute.BOARDS : ERoute.BACKLOG);
        },
      });
    }
  });

  isFetching = computed(() => {
    return this.boardService.isFetching() || this.taskService.isFetching();
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
        text: this.currentTask()?.title ?? '',
      },
    ];
  });
}
