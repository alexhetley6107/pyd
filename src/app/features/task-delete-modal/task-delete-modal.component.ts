import { TaskService } from '@/entities/task/service/task.service';
import { ERoute } from '@/shared/constants/routes';
import { ToastService } from '@/shared/services/toast.service';
import { Component, computed, inject, input, output, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmModalComponent } from '@/shared/ui/confirm-modal/confirm-modal.component';
import { Nullable } from '@/shared/types';
import { Task } from '@/entities/task/model';

@Component({
  selector: 'task-delete-modal',
  imports: [ConfirmModalComponent],
  templateUrl: './task-delete-modal.component.html',
})
export class TaskDeleteModalComponent {
  taskService = inject(TaskService);
  toast = inject(ToastService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  task = input.required<Nullable<Task>>();

  open = input<boolean>(false);
  closeModal = output();

  isBacklogTask = computed<boolean>(() => this.router.url.includes(ERoute.BACKLOG));

  isLoading = signal(false);

  onCloseModal() {
    this.closeModal.emit();
  }

  onDeleteTask() {
    this.isLoading.set(true);

    const taskId = this.task()?.id ?? '';

    this.taskService.delete(taskId).subscribe({
      next: () => {
        this.toast.success(`Task successfully deleted.`);
        const backUrl = this.isBacklogTask()
          ? ERoute.BACKLOG
          : `/${ERoute.BOARDS}/${this.task()?.boardId ?? ''}`;

        this.router.navigate([backUrl]);
      },
      error: (err: any) => {
        this.toast.error(err.error.message);
        this.isLoading.set(false);
      },
      complete: () => {
        this.isLoading.set(false);
        this.onCloseModal();
      },
    });
  }
}
