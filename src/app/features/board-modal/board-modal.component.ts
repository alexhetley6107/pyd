import { getError } from '@/shared/helpers/formErrors';
import { BoardService } from '@/shared/services/board.service';
import { ToastService } from '@/shared/services/toast.service';
import { ButtonComponent } from '@/shared/ui/button/button.component';
import { InputComponent } from '@/shared/ui/input/input.component';
import { ModalComponent } from '@/shared/ui/modal/modal.component';
import {
  booleanAttribute,
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
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

type BoardModalAction = 'create' | 'update';

@Component({
  selector: 'board-modal',
  imports: [ModalComponent, InputComponent, ButtonComponent, ReactiveFormsModule],
  templateUrl: './board-modal.component.html',
  styleUrl: './board-modal.component.scss',
})
export class BoardModalComponent implements OnChanges {
  toast = inject(ToastService);
  boardService = inject(BoardService);

  @Input({ transform: booleanAttribute }) open: boolean = false;
  @Input() action: BoardModalAction = 'create';

  @Output() closeModal = new EventEmitter<void>();

  isLoading = false;
  form!: FormGroup<{
    name: FormControl<string>;
  }>;

  constructor(private fb: NonNullableFormBuilder) {}
  get title(): string {
    return this.action === 'create' ? 'Create board' : 'Edit board';
  }
  get nameError(): string | null {
    return getError(this.form.get('name'), 'Name');
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: this.fb.control('', [Validators.required]),
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const modalOpened = Boolean(changes['open'].currentValue);

    if (modalOpened) {
      const initialName = this.action === 'create' ? '' : this.boardService?.openedBoard()?.name;

      this.form = this.fb.group({
        name: this.fb.control(initialName ?? '', [Validators.required]),
      });
    }
  }

  onCloseModal() {
    if (this.isLoading) return;

    this.form.reset();
    this.closeModal.emit();
  }

  handleSubmit() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }
    this.isLoading = true;

    const payload: any = {
      name: this.form.value.name ?? '',
      ...(this.action === 'create' ? {} : { id: this.boardService?.openedBoard()?.id ?? '' }),
    };

    this.boardService[this.action](payload).subscribe({
      next: () => {
        this.toast.add(`Board successfully ${this.action}d`);
      },
      error: (err: any) => {
        this.toast.add(err.error.message, { type: 'error' });
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
        this.onCloseModal();
      },
    });
  }
}
