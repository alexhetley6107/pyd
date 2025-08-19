import { TaskPriorities } from '@/shared/constants';
import { BoardService } from '@/shared/services/board.service';
import { StatusService } from '@/shared/services/status.service';
import { TaskService } from '@/shared/services/task.service';
import { TaskQueries } from '@/shared/types/dto';
import { SelectOption } from '@/shared/types/ui';
import { InputComponent } from '@/shared/ui/input/input.component';
import { SelectorComponent } from '@/shared/ui/selector/selector.component';
import { SkeletonComponent } from '@/shared/ui/skeleton/skeleton.component';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

const allOption: SelectOption = { label: 'All variants', value: '' };

@Component({
  selector: 'backlog-filters',
  imports: [SelectorComponent, ReactiveFormsModule, SkeletonComponent, InputComponent],
  templateUrl: './backlog-filters.component.html',
  styleUrl: './backlog-filters.component.scss',
})
export class BacklogFiltersComponent {
  boardService = inject(BoardService);
  statusService = inject(StatusService);
  taskService = inject(TaskService);

  form!: FormGroup<{
    search: FormControl<string>;
    boardId: FormControl<string>;
    statusId: FormControl<string>;
    priority: FormControl<string>;
  }>;

  constructor(private fb: NonNullableFormBuilder) {}

  get isFetching() {
    return this.boardService.isFetching || this.statusService.isFetching;
  }

  get boardOptions(): SelectOption[] {
    const options = this.boardService.boards.map((b) => ({
      label: b.name,
      value: b.id,
    }));

    return [allOption, { label: 'No board', value: 'null' }, ...options];
  }

  get statusOptions(): SelectOption[] {
    const options = this.statusService.statuses.map((b) => ({
      label: b.name,
      value: b.id,
    }));

    return [allOption, ...options];
  }

  get priorityOptions(): SelectOption[] {
    const options = TaskPriorities.map((b) => ({
      label: b,
      value: b,
    }));

    return [allOption, ...options];
  }

  ngOnInit() {
    this.form = this.fb.group({
      search: this.fb.control(''),
      boardId: this.fb.control(''),
      statusId: this.fb.control(''),
      priority: this.fb.control(''),
    });

    this.form.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(() => this.getTasks());

    this.getTasks();
  }

  getTasks() {
    const queries: TaskQueries = {
      search: this.form.value.search,
      boardId: this.form.value.boardId,
      statusId: this.form.value.statusId,
      priority: this.form.value.priority,
    };

    this.taskService.getAll(queries).subscribe();
  }
}
