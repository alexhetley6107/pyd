import { BoardService } from '@/shared/services/board.service';
import { SideMenuService } from '@/shared/services/side-menu.service';
import { TaskService } from '@/shared/services/task.service';
import { Task } from '@/shared/types/board';
import { SkeletonComponent } from '@/shared/ui/skeleton/skeleton.component';
import { Component, computed, effect, HostBinding, inject, signal } from '@angular/core';
import { TaskItemComponent } from '@/shared/ui/task-item/task-item.component';
import { TaskModalComponent } from '@/features/task-modal/task-modal.component';
import { TaskStatuses } from '@/shared/constants';
import { ActivatedRoute, Router } from '@angular/router';
import { ERoute } from '@/shared/constants/routes';
import { toSignal } from '@angular/core/rxjs-interop';

type Column = { name: string; taskIds: string[] };
type TaskMap = Record<string, Task>;

@Component({
  selector: 'board-columns',
  imports: [TaskItemComponent, SkeletonComponent],
  templateUrl: './board-columns.component.html',
  styleUrl: './board-columns.component.scss',
})
export class BoardColumnsComponent {
  menu = inject(SideMenuService);
  boardService = inject(BoardService);
  taskService = inject(TaskService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  @HostBinding('class.menu-opened')
  get menuOpened(): boolean {
    return this.menu.isOpen;
  }

  get isFetching(): boolean {
    return this.taskService.isFetching();
  }

  @HostBinding('class.loaded')
  get isLoaded(): boolean {
    return !(this.taskService.isFetching() || this.boardService.isFetching());
  }

  get columns(): Column[] {
    return TaskStatuses.map((name) => ({
      name,
      taskIds: this.taskService.tasks.filter((t) => t.status === name).map((t) => t.id),
    }));
  }

  get taskMap(): TaskMap {
    return this.taskService.tasks
      .filter((t) => t.boardId)
      .filter((t) => t.status)
      .reduce((acc, task) => {
        acc[task.id] = task;
        return acc;
      }, {} as TaskMap);
  }

  createTask(status: string) {
    const boardId = this.route.snapshot.paramMap.get('boardId');

    this.router.navigate([ERoute.CREATE_TASK], {
      queryParams: { boardId, status },
    });
  }

  openTask(taskId: string) {
    this.router.navigate([`task/${taskId}`], {
      queryParams: { boardId: this.route.snapshot.paramMap.get('boardId') },
    });
  }
}
