import { NgClass } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Task } from '../../model';
import { Nullable } from '@/shared/types';

@Component({
  selector: 'task-item',
  imports: [NgClass],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.scss',
})
export class TaskItemComponent {
  @Input() task: Nullable<Task> = null;

  @Output() onClickTask = new EventEmitter<void>();

  handleClick() {
    this.onClickTask.emit();
  }
}
