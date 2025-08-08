import { BoardService } from '@/shared/services/board.service';
import { SideMenuService } from '@/shared/services/side-menu.service';
import { StatusService } from '@/shared/services/status.service';
import { TaskService } from '@/shared/services/task.service';
import { Status } from '@/shared/types/board';
import { SkeletonComponent } from '@/shared/ui/skeleton/skeleton.component';
import { Component, HostBinding, inject } from '@angular/core';

@Component({
  selector: 'board-columns',
  imports: [SkeletonComponent],
  templateUrl: './board-columns.component.html',
  styleUrl: './board-columns.component.scss',
})
export class BoardColumnsComponent {
  menu = inject(SideMenuService);
  statusService = inject(StatusService);
  boardService = inject(BoardService);
  taskService = inject(TaskService);

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

  get columns(): Status[] {
    return this.statusService.statuses;
  }
}
