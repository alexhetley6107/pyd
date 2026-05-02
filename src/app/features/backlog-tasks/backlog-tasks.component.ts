import { TaskItemComponent } from '@/entities/task/ui/task-item/task-item.component';
import { TaskService } from '@/entities/task/service/task.service';
import { SkeletonComponent } from '@/shared/ui/skeleton/skeleton.component';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ListContainerComponent } from '@/shared/ui/list-container/list-container.component';
import { BoardService } from '@/entities/board/service/board.service';
import { Task } from '@/entities/task/model';
import { Router } from '@angular/router';
import { ERoute } from '@/shared/constants/routes';

@Component({
  selector: 'backlog-tasks',
  imports: [SkeletonComponent, TaskItemComponent, ListContainerComponent],
  templateUrl: './backlog-tasks.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BacklogTasksComponent {
  taskService = inject(TaskService);
  boardService = inject(BoardService);
  router = inject(Router);

  get isFetching(): boolean {
    return this.boardService.isFetching() || this.taskService.isFetching();
  }

  get tasks(): Task[] {
    return this.taskService.tasks();
  }

  openTask(taskId: string) {
    this.router.navigate([ERoute.BACKLOG, taskId]);
  }
}
