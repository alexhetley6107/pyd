import { StatusService } from '@/shared/services/status.service';
import { Status } from '@/shared/types/board';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-agile-board',
  imports: [],
  templateUrl: './agile-board.component.html',
  styleUrl: './agile-board.component.scss',
})
export class AgileBoardComponent {
  statusService = inject(StatusService);

  loadStatuses() {
    const isLoaded = this.statusService.statuses.length;
    if (isLoaded) return;

    this.statusService.getAll().subscribe();
  }

  ngOnInit() {
    this.loadStatuses();
  }

  get statuses(): Status[] {
    return this.statusService.statuses;
  }
}
