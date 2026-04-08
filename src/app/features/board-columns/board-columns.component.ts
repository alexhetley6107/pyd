import { BoardService } from '@/shared/services/board.service';
import { SideMenuService } from '@/shared/services/side-menu.service';
import { TaskService } from '@/shared/services/task.service';
import { Task } from '@/shared/types/board';
import { SkeletonComponent } from '@/shared/ui/skeleton/skeleton.component';
import { Component, effect, HostBinding, inject } from '@angular/core';
import { TaskItemComponent } from '@/features/task-item/task-item.component';
import { TaskModalComponent } from '@/features/task-modal/task-modal.component';
import { TaskStatuses } from '@/shared/constants';

type Column = { name: string; taskIds: string[] };
type TaskMap = Record<string, Task>;

@Component({
  selector: 'board-columns',
  imports: [SkeletonComponent, TaskItemComponent],
  templateUrl: './board-columns.component.html',
  styleUrl: './board-columns.component.scss',
})
export class BoardColumnsComponent {
  menu = inject(SideMenuService);
  boardService = inject(BoardService);
  taskService = inject(TaskService);

  // constructor() {
  //   effect(() => {
  //     const boardId = this.boardService.openedBoard()?.id;
  //     if (!boardId) return;

  //     this.taskService.getAll({ boardId }).subscribe();
  //   });
  // }

  @HostBinding('class.menu-opened')
  get menuOpened(): boolean {
    return this.menu.isOpen;
  }

  @HostBinding('class.loaded')
  get isLoaded(): boolean {
    return !(this.taskService.isFetching || this.boardService.isFetching);
  }

  get columns(): Column[] {
    return TaskStatuses.map((name) => ({
      name,
      taskIds: this.taskService.tasks.filter((t) => t.statusId === name).map((t) => t.id),
    }));
  }

  get taskMap(): TaskMap {
    return this.taskService.tasks
      .filter((t) => t.boardId)
      .filter((t) => t.statusId)
      .reduce((acc, task) => {
        acc[task.id] = task;
        return acc;
      }, {} as TaskMap);
  }
}
