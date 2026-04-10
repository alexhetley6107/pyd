import { TaskModalComponent } from '@/features/task-modal/task-modal.component';
import { BoardService } from '@/shared/services/board.service';
import { ButtonComponent } from '@/shared/ui/button/button.component';
import { BacklogFiltersComponent } from '@/features/backlog-filters/backlog-filters.component';
import { BacklogTasksComponent } from '@/features/backlog-tasks/backlog-tasks.component';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'page-backlog',
  imports: [
    ButtonComponent,
    TaskModalComponent,
    BacklogFiltersComponent,
    BacklogTasksComponent,
    RouterLink,
  ],
  templateUrl: './backlog.component.html',
  styleUrl: './backlog.component.scss',
})
export class BacklogComponent {
  boardService = inject(BoardService);

  isNewTaskModal = false;

  toggleNewTaskModal() {
    this.isNewTaskModal = !this.isNewTaskModal;
  }
}
