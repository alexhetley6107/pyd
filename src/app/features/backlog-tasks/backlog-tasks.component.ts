import { TaskItemComponent } from '@/features/task-item/task-item.component';
import { TaskService } from '@/shared/services/task.service';
import { Task } from '@/shared/types/board';
import { SkeletonComponent } from '@/shared/ui/skeleton/skeleton.component';
import { Component, inject, Input } from '@angular/core';
import { TaskModalComponent } from '@/features/task-modal/task-modal.component';

@Component({
  selector: 'backlog-tasks',
  imports: [SkeletonComponent, TaskItemComponent, TaskModalComponent],
  templateUrl: './backlog-tasks.component.html',
  styleUrl: './backlog-tasks.component.scss',
})
export class BacklogTasksComponent {
  taskService = inject(TaskService);

  @Input() isBoardsFetching = true;

  isTaskModal = false;

  get isFetching(): boolean {
    return this.isBoardsFetching || this.taskService.isFetching;
  }

  get tasks(): Task[] {
    return this.taskService.tasks;
  }

  toggleTaskModal() {
    this.isTaskModal = !this.isTaskModal;
  }
}
