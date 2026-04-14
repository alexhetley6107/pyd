import { Board } from '@/entities/board/model';
import { BoardService } from '@/entities/board/service/board.service';
import { ToastService } from '@/shared/services/toast.service';
import { BreadCrumbItem, Nullable } from '@/shared/types';
import { Component, computed, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadcrumbsComponent } from '@/shared/ui/breadcrumbs/breadcrumbs.component';
import { ERoute } from '@/shared/constants/routes';
import { Task, TaskDto } from '@/entities/task/model';
import { TaskService } from '@/entities/task/service/task.service';
import { TaskFormComponent } from '@/features/task-form/task-form.component';
import { TaskDeleteModalComponent } from '@/features/task-delete-modal/task-delete-modal.component';
import { ButtonComponent } from '@/shared/ui/button/button.component';

@Component({
  selector: 'task-view',
  imports: [BreadcrumbsComponent, TaskFormComponent, TaskDeleteModalComponent, ButtonComponent],
  templateUrl: './task-view.component.html',
})
export class TaskViewComponent {
  router = inject(Router);
  route = inject(ActivatedRoute);
  boardService = inject(BoardService);
  taskService = inject(TaskService);
  toast = inject(ToastService);

  taskId = computed(() => this.route.snapshot.paramMap.get('taskId') ?? null);

  currentTask = computed<Nullable<Task>>(() => {
    const id = this.taskId();
    if (!id) return null;

    return this.taskService.tasks().find((b) => b.id === id) ?? null;
  });

  currentBoard = computed<Nullable<Board>>(() => {
    if (!this.currentTask()) return null;

    const boardId = this.currentTask()?.boardId;

    return this.boardService.boards().find((b) => b.id === boardId) ?? null;
  });

  isBacklogTask = computed<boolean>(() => this.router.url.includes(ERoute.BACKLOG));

  loadTaskEffect = effect(() => {
    if (this.currentTask()) return;

    this.taskService.getAll({ id: this.taskId() ?? '' }).subscribe({
      error: (err) => {
        this.toast.error(err.error.message);
        const backUrl = this.isBacklogTask() ? ERoute.BACKLOG : ERoute.BOARDS;
        this.router.navigate([backUrl]);
      },
    });
  });

  isFetching = computed(() => {
    return this.boardService.isFetching() || this.taskService.isFetching();
  });

  links = computed<BreadCrumbItem[]>(() => {
    const base = this.isBacklogTask()
      ? [
          {
            text: 'Backlog',
            link: '/' + ERoute.BACKLOG,
          },
        ]
      : [
          {
            text: 'Boards',
            link: '/' + ERoute.BOARDS,
          },
          {
            text: this.currentBoard()?.name ?? '',
            link: `/${ERoute.BOARDS}/${this.currentBoard()?.id ?? ''}`,
          },
        ];

    return [
      ...base,
      {
        text: this.currentTask()?.title ?? '',
      },
    ];
  });

  isModal = signal(false);

  toggleDeleteModal() {
    this.isModal.update((v) => !v);
  }

  isLoading = signal(false);

  handleUpdate(task: TaskDto) {
    if (!this.taskId()) return;

    this.isLoading.set(true);

    const dto = { ...task, id: this.taskId() ?? '' };

    this.taskService.update(dto).subscribe({
      next: () => {
        this.toast.success('Task updated successfully');
        const backUrl = this.isBacklogTask()
          ? ERoute.BACKLOG
          : `/${ERoute.BOARDS}/${this.currentBoard()?.id ?? ''}`;
        this.router.navigate([backUrl]);
      },
      error: () => {
        this.toast.error('Failed to update task');
        this.isLoading.set(false);
      },
    });
  }

  handleCancel() {
    const backUrl = this.isBacklogTask()
      ? ERoute.BACKLOG
      : `/${ERoute.BOARDS}/${this.currentBoard()?.id ?? ''}`;
    this.router.navigate([backUrl]);
  }
}
