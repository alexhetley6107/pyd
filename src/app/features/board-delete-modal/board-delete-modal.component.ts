import { BoardService } from '@/shared/services/board.service';
import { ToastService } from '@/shared/services/toast.service';
import { ConfirmModalComponent } from '@/shared/ui/confirm-modal/confirm-modal.component';
import { booleanAttribute, Component, EventEmitter, inject, Input, Output } from '@angular/core';

@Component({
  selector: 'board-delete-modal',
  imports: [ConfirmModalComponent],
  templateUrl: './board-delete-modal.component.html',
  styleUrl: './board-delete-modal.component.scss',
})
export class BoardDeleteModalComponent {
  boardService = inject(BoardService);
  toast = inject(ToastService);

  @Input({ transform: booleanAttribute }) open: boolean = false;

  @Output() closeModal = new EventEmitter<void>();

  onCloseModal() {
    this.closeModal.emit();
  }

  isLoading = false;

  onDeleteBoard() {
    this.isLoading = true;

    const id = this.boardService?.openedBoard()?.id ?? '';

    this.boardService.delete(id).subscribe({
      next: () => {
        this.toast.add(`Board successfully deleted.`);
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
