import { BoardService } from '@/entities/board/service/board.service';
import { TaskService } from '@/entities/task/service/task.service';
import { SelectOption } from '@/shared/types';
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
import { TaskPriorities, TaskQueries, TaskStatuses } from '@/entities/task/model';

const allOption: SelectOption = { label: 'All variants', value: '' };

@Component({
  selector: 'backlog-filters',
  imports: [SelectorComponent, ReactiveFormsModule, SkeletonComponent, InputComponent],
  templateUrl: './backlog-filters.component.html',
  styleUrl: './backlog-filters.component.scss',
})
export class BacklogFiltersComponent {
  boardService = inject(BoardService);
  taskService = inject(TaskService);

  form!: FormGroup<{
    search: FormControl<string>;
    boardId: FormControl<string>;
    status: FormControl<string>;
    priority: FormControl<string>;
  }>;

  constructor(private fb: NonNullableFormBuilder) {}

  get isFetching() {
    return this.boardService.isFetching();
  }

  get boardOptions(): SelectOption[] {
    const options = this.boardService.boards().map((b) => ({
      label: b.name,
      value: b.id,
    }));

    return [allOption, { label: 'No board', value: 'null' }, ...options];
  }

  get statusOptions(): SelectOption[] {
    const options = TaskStatuses.map((name) => ({
      label: name,
      value: name,
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
      status: this.fb.control(''),
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
      status: this.form.value.status,
      priority: this.form.value.priority,
    };

    this.taskService
      .getAll(queries)
      .subscribe({ next: () => this.taskService.loadedBoardId.set(null) });
  }
}
