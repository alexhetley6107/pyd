import { TaskService } from '@/entities/task/service/task.service';
import { ERoute } from '@/shared/constants/routes';
import { ToastService } from '@/shared/services/toast.service';
import { Component, computed, inject, input, output, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmModalComponent } from '@/shared/ui/confirm-modal/confirm-modal.component';

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

  boardId = computed(() => this.route.snapshot.queryParamMap.get('boardId') ?? null);
  taskId = computed(() => this.route.snapshot.paramMap.get('taskId') ?? null);

  open = input<boolean>(false);
  closeModal = output();

  onCloseModal() {
    this.closeModal.emit();
  }

  isLoading = signal(false);

  onDeleteTask() {
    this.isLoading.set(true);

    const taskId = this.taskId() ?? '';

    this.taskService.delete(taskId).subscribe({
      next: () => {
        this.toast.showSuccess(`Task successfully deleted.`);
        this.router.navigate([ERoute.BOARDS, this.boardId() ?? '']);
      },
      error: (err: any) => {
        this.toast.showError(err.error.message);
        this.isLoading.set(false);
      },
      complete: () => {
        this.isLoading.set(false);
        this.onCloseModal();
      },
    });
  }
}
