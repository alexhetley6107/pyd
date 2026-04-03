import { TaskModalComponent } from '@/features/task-modal/task-modal.component';
import { BoardService } from '@/shared/services/board.service';
import { ButtonComponent } from '@/shared/ui/button/button.component';
import { BacklogFiltersComponent } from '@/features/backlog-filters/backlog-filters.component';
import { BacklogTasksComponent } from '@/features/backlog-tasks/backlog-tasks.component';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'page-backlog',
  imports: [ButtonComponent, TaskModalComponent, BacklogFiltersComponent, BacklogTasksComponent],
  templateUrl: './backlog.component.html',
  styleUrl: './backlog.component.scss',
})
export class BacklogComponent {
  boardService = inject(BoardService);

  isNewTaskModal = false;

  get isFetching(): boolean {
    return this.boardService.isFetching;
  }

  loadSBoardsInfo() {
    const isBoards = this.boardService.boards.length;

    if (isBoards) return;

    this.boardService.getAll().subscribe();
  }

  ngOnInit() {
    this.loadSBoardsInfo();
  }

  toggleNewTaskModal() {
    this.isNewTaskModal = !this.isNewTaskModal;
  }
}
