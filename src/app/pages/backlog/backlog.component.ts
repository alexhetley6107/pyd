import { TaskModalComponent } from '@/features/task-modal/task-modal.component';
import { BoardService } from '@/shared/services/board.service';
import { StatusService } from '@/shared/services/status.service';
import { ButtonComponent } from '@/shared/ui/button/button.component';
import { BacklogFiltersComponent } from '@/widgets/backlog-filters/backlog-filters.component';
import { BacklogTasksComponent } from '@/widgets/backlog-tasks/backlog-tasks.component';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'page-backlog',
  imports: [ButtonComponent, TaskModalComponent, BacklogFiltersComponent, BacklogTasksComponent],
  templateUrl: './backlog.component.html',
  styleUrl: './backlog.component.scss',
})
export class BacklogComponent {
  boardService = inject(BoardService);
  statusService = inject(StatusService);

  isNewTaskModal = false;

  get isFetching(): boolean {
    return this.statusService.isFetching || this.boardService.isFetching;
  }

  loadSBoardsInfo() {
    const isBoards = this.boardService.boards.length;
    const isStatuses = this.statusService.statuses.length;

    if (isStatuses && isBoards) return;

    this.boardService.getAll().subscribe();
    this.statusService.getAll().subscribe();
  }

  ngOnInit() {
    this.loadSBoardsInfo();
  }

  toggleNewTaskModal() {
    this.isNewTaskModal = !this.isNewTaskModal;
  }
}
