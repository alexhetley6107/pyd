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
import { ConfirmModalComponent } from '@/shared/ui/confirm-modal/confirm-modal.component';

type ModalAction = 'create-for-backlog' | 'create-for-board' | 'edit-task';

@Component({
  selector: 'task-modal',
  imports: [
    ModalComponent,
    InputComponent,
    ButtonComponent,
    ReactiveFormsModule,
    SelectorComponent,
    TextareaComponent,
    ConfirmModalComponent,
  ],
  templateUrl: './task-modal.component.html',
  styleUrl: './task-modal.component.scss',
})
export class TaskModalComponent {
  toast = inject(ToastService);
  boardService = inject(BoardService);
  statusService = inject(StatusService);
  taskService = inject(TaskService);

  @Input() action: ModalAction = 'create-for-backlog';

  @Input({ transform: booleanAttribute }) open: boolean = false;
  @Output() closeModal = new EventEmitter<void>();

  isLoading = false;
  isDeleting = false;
  isDeleteModalOpen = false;

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
    if (!modalOpened) return;

    this.setInitialValues();
  }

  onCloseModal() {
    if (this.isLoading) return;
    this.form.reset();
    this.closeModal.emit();
  }

  toggleDeleteModal() {
    if (this.isDeleting) return;
    this.isDeleteModalOpen = !this.isDeleteModalOpen;
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

  get isDeleteIcon(): boolean {
    return this.action === 'edit-task';
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
    let titleValue = '';
    let descValue = '';

    let boardValue = '';
    let statusValue = '';
    let priorityValue = '';

    if (this.action === 'create-for-board') {
      boardValue = this.boardService.openedBoard()?.id ?? '';
      statusValue = this.statusService.statuses[0]?.id ?? '';
    }

    if (this.action === 'edit-task') {
      const task = this.taskService.openedTask();

      titleValue = task?.title ?? '';
      descValue = task?.description ?? '';
      boardValue = task?.boardId ?? '';
      statusValue = task?.statusId ?? '';
      priorityValue = task?.priority ?? '';
    }

    this.form = this.fb.group({
      title: this.fb.control(titleValue, [Validators.required]),
      description: this.fb.control(descValue),
      boardId: this.fb.control(boardValue),
      statusId: this.fb.control(statusValue),
      priority: this.fb.control(priorityValue),
    });
  }

  onDeleteTask() {
    this.isDeleting = true;

    const id = this.taskService?.openedTask()?.id ?? '';

    this.taskService.delete(id).subscribe({
      next: () => {
        this.toast.add(`Task successfully deleted.`);
      },
      error: (err: any) => {
        this.toast.add(err.error.message, { type: 'error' });
        this.isDeleting = false;
      },
      complete: () => {
        this.isDeleting = false;
        this.onCloseModal();
        this.toggleDeleteModal();
      },
    });
  }
}
