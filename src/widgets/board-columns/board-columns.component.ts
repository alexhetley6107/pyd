import { BoardService } from '@/shared/services/board.service';
import { SideMenuService } from '@/shared/services/side-menu.service';
import { StatusService } from '@/shared/services/status.service';
import { TaskService } from '@/shared/services/task.service';
import { Status, Task } from '@/shared/types/board';
import { SkeletonComponent } from '@/shared/ui/skeleton/skeleton.component';
import { Component, effect, HostBinding, inject } from '@angular/core';
import { TaskItemComponent } from './task-item/task-item.component';
import { TaskModalComponent } from '@/features/task-modal/task-modal.component';

type Column = Status & { taskIds: string[] };
type TaskMap = Record<string, Task>;

@Component({
  selector: 'board-columns',
  imports: [SkeletonComponent, TaskItemComponent, TaskModalComponent],
  templateUrl: './board-columns.component.html',
  styleUrl: './board-columns.component.scss',
})
export class BoardColumnsComponent {
  menu = inject(SideMenuService);
  statusService = inject(StatusService);
  boardService = inject(BoardService);
  taskService = inject(TaskService);

  isTaskModal = false;

  constructor() {
    effect(() => {
      const boardId = this.boardService.openedBoard()?.id;
      if (!boardId) return;

      this.taskService.getAll({ boardId }).subscribe();
    });
  }

  @HostBinding('class.menu-opened')
  get menuOpened(): boolean {
    return this.menu.isOpen;
  }

  @HostBinding('class.loaded')
  get isLoaded(): boolean {
    return !(
      this.taskService.isFetching ||
      this.statusService.isFetching ||
      this.boardService.isFetching
    );
  }

  get columns(): Column[] {
    return this.statusService.statuses.map((s) => ({
      ...s,
      taskIds: this.taskService.tasks.filter((t) => t.statusId === s.id).map((t) => t.id),
    }));
  }

  get taskMap(): TaskMap {
    return this.taskService.tasks.reduce((acc, task) => {
      acc[task.id] = task;
      return acc;
    }, {} as TaskMap);
  }

  openTask(taskId: string) {
    this.taskService.openTask(taskId);
    this.toggleTaskModal();
  }

  toggleTaskModal() {
    this.isTaskModal = !this.isTaskModal;
  }
}
