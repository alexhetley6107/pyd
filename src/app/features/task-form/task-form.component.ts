import { Component, computed, effect, inject, input, output } from '@angular/core';
import { InputComponent } from '@/shared/ui/input/input.component';
import { TextareaComponent } from '@/shared/ui/textarea/textarea.component';
import { ButtonComponent } from '@/shared/ui/button/button.component';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  mediumPriority,
  TaskDto,
  TaskPriorities,
  TaskStatuses,
  toDoStatus,
} from '@/entities/task/model';
import { Nullable, SelectOption } from '@/shared/types';
import { getError } from '@/shared/helpers/formErrors';
import { BoardService } from '@/entities/board/service/board.service';
import { SelectorComponent } from '@/shared/ui/selector/selector.component';

@Component({
  selector: 'task-form',
  imports: [
    InputComponent,
    TextareaComponent,
    SelectorComponent,
    ButtonComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss',
})
export class TaskFormComponent {
  fb = inject(NonNullableFormBuilder);
  boardService = inject(BoardService);

  isFetching = input(false);
  isLoading = input(false);
  onSubmit = output<any>();

  title = input<string>('');
  description = input<string>('');
  boardId = input<string>('');
  status = input<string>(toDoStatus);
  priority = input<string>(mediumPriority);

  form = this.fb.group({
    title: this.fb.control('', [Validators.required]),
    description: this.fb.control(''),
    boardId: this.fb.control(''),
    status: this.fb.control(''),
    priority: this.fb.control(''),
  });

  syncFormEffect = effect(() => {
    this.form.patchValue({
      title: this.title(),
      description: this.description(),
      boardId: this.boardId(),
      status: this.status(),
      priority: this.priority(),
    });
  });

  boardOptions = computed<SelectOption[]>(() => {
    const options = this.boardService.boards().map((b) => ({
      label: b.name,
      value: b.id,
    }));

    return [{ label: 'No board', value: '' }, ...options];
  });

  get columnOptions(): SelectOption[] {
    return TaskStatuses.map((b) => ({
      label: b,
      value: b,
    }));
  }

  get priorityOptions(): SelectOption[] {
    return TaskPriorities.map((b) => ({
      label: b,
      value: b,
    }));
  }

  handleSubmit() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    const dto = this.form.value as TaskDto;

    this.onSubmit.emit(dto);
  }

  handleCancel() {}

  get titleError(): Nullable<string> {
    return getError(this.form.get('title'), 'Title');
  }
}
