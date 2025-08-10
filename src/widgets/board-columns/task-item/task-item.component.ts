import { Task } from './../../../shared/types/board';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'task-item',
  imports: [],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.scss',
})
export class TaskItemComponent {
  @Input() task: Task | null = null;
}
