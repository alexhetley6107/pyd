import { TaskModalComponent } from '@/features/task-modal/task-modal.component';
import { ButtonComponent } from '@/shared/ui/button/button.component';
import { BacklogFiltersComponent } from '@/widgets/backlog-filters/backlog-filters.component';
import { Component } from '@angular/core';

@Component({
  selector: 'page-backlog',
  imports: [ButtonComponent, TaskModalComponent, BacklogFiltersComponent],
  templateUrl: './backlog.component.html',
  styleUrl: './backlog.component.scss',
})
export class BacklogComponent {
  isNewTaskModal = false;

  toggleNewTaskModal() {
    this.isNewTaskModal = !this.isNewTaskModal;
  }
}
