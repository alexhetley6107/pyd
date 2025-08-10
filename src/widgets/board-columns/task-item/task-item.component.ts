import { NgClass } from '@angular/common';
import { Task } from './../../../shared/types/board';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'task-item',
  imports: [NgClass],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.scss',
})
export class TaskItemComponent {
  @Input() task: Task | null = null;

  @Output() onClickTask = new EventEmitter<void>();
}
