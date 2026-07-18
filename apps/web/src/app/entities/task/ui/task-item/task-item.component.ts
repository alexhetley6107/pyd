import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { EStatus, Task } from '../../model';
import { Nullable } from '@/shared/types';

@Component({
  selector: 'task-item',
  imports: [NgClass],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskItemComponent {
  @Input() task: Nullable<Task> = null;

  @Output() onClickTask = new EventEmitter<void>();

  handleClick() {
    this.onClickTask.emit();
  }

  get isDone() {
    return this.task?.status === EStatus.DONE;
  }
}
