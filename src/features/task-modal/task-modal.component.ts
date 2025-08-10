import { getError } from '@/shared/helpers/formErrors';
import { TaskPriorities } from './../../shared/constants/index';
import { BoardService } from '@/shared/services/board.service';
import { StatusService } from '@/shared/services/status.service';
import { ToastService } from '@/shared/services/toast.service';
import { SelectOption } from '@/shared/types/ui';
import { ButtonComponent } from '@/shared/ui/button/button.component';
import { InputComponent } from '@/shared/ui/input/input.component';
import { ModalComponent } from '@/shared/ui/modal/modal.component';
import {
  booleanAttribute,
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TaskService } from '@/shared/services/task.service';
import { TaskDto } from '@/shared/types/dto';
import { SelectorComponent } from '@/shared/ui/selector/selector.component';
import { TextareaComponent } from '@/shared/ui/textarea/textarea.component';

type ModatType = 'create' | 'edit';

@Component({
  selector: 'task-modal',
  imports: [
    ModalComponent,
    InputComponent,
    ButtonComponent,
    ReactiveFormsModule,
    SelectorComponent,
    TextareaComponent,
  ],
  templateUrl: './task-modal.component.html',
  styleUrl: './task-modal.component.scss',
})
export class TaskModalComponent {
  toast = inject(ToastService);
  boardService = inject(BoardService);
  statusService = inject(StatusService);
  taskService = inject(TaskService);

  @Input({ transform: booleanAttribute }) open: boolean = false;
  @Output() closeModal = new EventEmitter<void>();

  isLoading = false;

  form!: FormGroup<{
    title: FormControl<string>;
    description: FormControl<string>;
    boardId: FormControl<string>;
    statusId: FormControl<string>;
    priority: FormControl<string>;
  }>;

  constructor(private fb: NonNullableFormBuilder) {}

  ngOnInit(): void {
    this.setInitialValues();
  }
  ngOnChanges(changes: SimpleChanges) {
    const modalOpened = Boolean(changes['open'].currentValue);

    if (modalOpened) {
      this.setInitialValues();
    }
  }

  onCloseModal() {
    if (this.isLoading) return;
    this.form.reset();
    this.closeModal.emit();
  }

  get boardOptions(): SelectOption[] {
    const options = this.boardService.boards.map((b) => ({
      label: b.name,
      value: b.id,
    }));

    return [{ label: 'None', value: '' }, ...options];
  }

  get columnOptions(): SelectOption[] {
    const options = this.statusService.statuses.map((b) => ({
      label: b.name,
      value: b.id,
    }));

    return [{ label: 'None', value: '' }, ...options];
  }

  get priorityOptions(): SelectOption[] {
    const options = TaskPriorities.map((b) => ({
      label: b,
      value: b,
    }));

    return [{ label: 'None', value: '' }, ...options];
  }

  get titleError(): string | null {
    return getError(this.form.get('title'), 'Title');
  }

  handleSubmit() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    const body: TaskDto = {
      title: this.form.value.title || '',
      description: this.form.value.description || '',
      boardId: this.form.value.boardId || null,
      statusId: this.form.value.statusId || null,
      priority: this.form.value.priority || '',
      date: null,
    };

    this.taskService.create(body).subscribe({
      next: () => {
        this.toast.add(`Task successfully created`);
        this.onCloseModal();
      },
      error: (err) => {
        this.toast.add(err.error.message, { type: 'error' });
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  setInitialValues() {
    const openedBoardId = this.boardService.openedBoard()?.id ?? '';
    const firstStatusId = this.statusService.statuses[0]?.id ?? '';
    this.form = this.fb.group({
      title: this.fb.control('', [Validators.required]),
      description: this.fb.control(''),
      boardId: this.fb.control(''),
      statusId: this.fb.control(''),
      priority: this.fb.control(''),
    });
  }
}
