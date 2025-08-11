import { TaskService } from '@/shared/services/task.service';
import { Task } from '@/shared/types/board';
import { NgClass } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';

@Component({
  selector: 'task-item',
  imports: [NgClass],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.scss',
})
export class TaskItemComponent {
  taskService = inject(TaskService);

  @Input() task: Task | null = null;

  @Output() onClickTask = new EventEmitter<void>();

  handleClick() {
    if (this.task) {
      this.taskService.openTask(this.task.id);
    }
    this.onClickTask.emit();
  }
}
