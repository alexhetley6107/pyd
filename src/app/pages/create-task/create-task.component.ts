import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { BreadcrumbsComponent } from '@/shared/ui/breadcrumbs/breadcrumbs.component';
import { ERoute } from '@/shared/constants/routes';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadCrumbItem, Nullable } from '@/shared/types';
import { BoardService } from '@/entities/board/service/board.service';
import { ToastService } from '@/shared/services/toast.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Board } from '@/entities/board/model';
import { TaskFormComponent } from '@/features/task-form/task-form.component';
import { TaskService } from '@/entities/task/service/task.service';
import { EStatus, TaskDto } from '@/entities/task/model';

@Component({
  selector: 'create-task',
  imports: [BreadcrumbsComponent, TaskFormComponent],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateTaskComponent {
  router = inject(Router);
  route = inject(ActivatedRoute);
  boardService = inject(BoardService);
  taskService = inject(TaskService);

  toast = inject(ToastService);

  isLoading = signal(false);

  private queryParams = toSignal(this.route.queryParams);

  boardId = computed(() => this.queryParams()?.['boardId'] ?? null);
  status = computed(() => this.queryParams()?.['status'] ?? EStatus.TODO);

  currentBoard = computed<Nullable<Board>>(() => {
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

  handleCreate(dto: TaskDto) {
    this.isLoading.set(true);

    this.taskService.create(dto).subscribe({
      next: () => {
        this.toast.success('Task created successfully');
        const backUrl = this.boardId() ? `/${ERoute.BOARDS}/${this.boardId()}` : ERoute.BACKLOG;
        this.router.navigate([backUrl]);
        this.isLoading.set(false);
      },
      error: () => {
        this.toast.error('Failed to create task');
        this.isLoading.set(false);
      },
    });
  }

  handleCancel() {
    const backUrl = this.boardId() ? `/${ERoute.BOARDS}/${this.boardId()}` : ERoute.BACKLOG;
    this.router.navigate([backUrl]);
  }
}
