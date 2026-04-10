import { TaskItemComponent } from '@/entities/task/ui/task-item/task-item.component';
import { TaskService } from '@/entities/task/service/task.service';
import { SkeletonComponent } from '@/shared/ui/skeleton/skeleton.component';
import { Component, inject } from '@angular/core';
import { TaskModalComponent } from '@/features/task-modal/task-modal.component';
import { ListContainerComponent } from '@/shared/ui/list-container/list-container.component';
import { BoardService } from '@/entities/board/service/board.service';
import { Task } from '@/entities/task/model';

@Component({
  selector: 'backlog-tasks',
  imports: [SkeletonComponent, TaskItemComponent, TaskModalComponent, ListContainerComponent],
  templateUrl: './backlog-tasks.component.html',
  styleUrl: './backlog-tasks.component.scss',
})
export class BacklogTasksComponent {
  taskService = inject(TaskService);
  boardService = inject(BoardService);

  isTaskModal = false;

  get isFetching(): boolean {
    return this.boardService.isFetching() || this.taskService.isFetching();
  }

  get tasks(): Task[] {
    return this.taskService.tasks;
  }

  toggleTaskModal() {
    this.isTaskModal = !this.isTaskModal;
  }
}
