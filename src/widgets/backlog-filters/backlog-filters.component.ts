import { SelectorComponent } from '@/shared/ui/selector/selector.component';
import { Component } from '@angular/core';

@Component({
  selector: 'backlog-filters',
  imports: [SelectorComponent],
  templateUrl: './backlog-filters.component.html',
  styleUrl: './backlog-filters.component.scss',
})
export class BacklogFiltersComponent {}
