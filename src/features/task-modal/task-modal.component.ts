import { BoardService } from '@/shared/services/board.service';
import { ToastService } from '@/shared/services/toast.service';
import { InputComponent } from '@/shared/ui/input/input.component';
import { ModalComponent } from '@/shared/ui/modal/modal.component';
import { booleanAttribute, Component, EventEmitter, inject, Input, Output } from '@angular/core';

@Component({
  selector: 'task-modal',
  imports: [ModalComponent, InputComponent],
  templateUrl: './task-modal.component.html',
  styleUrl: './task-modal.component.scss',
})
export class TaskModalComponent {
  toast = inject(ToastService);
  boardService = inject(BoardService);

  @Input({ transform: booleanAttribute }) open: boolean = false;

  @Output() closeModal = new EventEmitter<void>();

  onCloseModal() {
    // if (this.isLoading) return;

    // this.form.reset();
    this.closeModal.emit();
  }
}
