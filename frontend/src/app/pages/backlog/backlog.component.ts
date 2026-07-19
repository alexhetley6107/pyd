import { ButtonComponent } from '@/shared/ui/button/button.component';
import { BacklogFiltersComponent } from '@/features/backlog-filters/backlog-filters.component';
import { BacklogTasksComponent } from '@/features/backlog-tasks/backlog-tasks.component';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'page-backlog',
  imports: [ButtonComponent, BacklogFiltersComponent, BacklogTasksComponent, RouterLink],
  templateUrl: './backlog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BacklogComponent {}
