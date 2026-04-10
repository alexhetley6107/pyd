import { ERoute } from '@/shared/constants/routes';
import { BoardService } from '@/entities/board/service/board.service';
import { ToastService } from '@/shared/services/toast.service';
import { ConfirmModalComponent } from '@/shared/ui/confirm-modal/confirm-modal.component';
import {
  booleanAttribute,
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  signal,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'board-delete-modal',
  imports: [ConfirmModalComponent],
  templateUrl: './board-delete-modal.component.html',
})
export class BoardDeleteModalComponent {
  boardService = inject(BoardService);
  toast = inject(ToastService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  @Input({ transform: booleanAttribute }) open: boolean = false;

  @Output() closeModal = new EventEmitter<void>();

  onCloseModal() {
    this.closeModal.emit();
  }

  isLoading = signal(false);

  onDeleteBoard() {
    this.isLoading.set(true);

    const boardId = this.route.snapshot.paramMap.get('boardId') ?? '';

    this.boardService.delete(boardId).subscribe({
      next: () => {
        this.toast.showSuccess(`Board successfully deleted.`);
        this.router.navigateByUrl(ERoute.BOARDS);
      },
      error: (err: any) => {
        this.toast.showError(err.error.message);
        this.isLoading.set(false);
      },
      complete: () => {
        this.isLoading.set(false);
        this.onCloseModal();
      },
    });
  }
}
