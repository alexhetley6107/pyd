import { TaskPriorities } from './../../shared/constants/index';
import { BoardService } from '@/shared/services/board.service';
import { StatusService } from '@/shared/services/status.service';
import { ToastService } from '@/shared/services/toast.service';
import { SelectOption } from '@/shared/types/ui';
import { ButtonComponent } from '@/shared/ui/button/button.component';
import { InputComponent } from '@/shared/ui/input/input.component';
import { ModalComponent } from '@/shared/ui/modal/modal.component';
import { SelectComponent } from '@/shared/ui/select/select.component';
import { booleanAttribute, Component, EventEmitter, inject, Input, Output } from '@angular/core';

@Component({
  selector: 'task-modal',
  imports: [ModalComponent, InputComponent, ButtonComponent, SelectComponent],
  templateUrl: './task-modal.component.html',
  styleUrl: './task-modal.component.scss',
})
export class TaskModalComponent {
  toast = inject(ToastService);
  boardService = inject(BoardService);
  statusService = inject(StatusService);

  @Input({ transform: booleanAttribute }) open: boolean = false;

  @Output() closeModal = new EventEmitter<void>();

  onCloseModal() {
    // if (this.isLoading) return;

    // this.form.reset();
    this.closeModal.emit();
  }

  get columnOptions(): SelectOption[] {
    return this.statusService.statuses.map((s) => ({
      label: s.name,
      value: s.id,
    }));
  }

  get boardOptions(): SelectOption[] {
    return this.boardService.boards.map((b) => ({
      label: b.name,
      value: b.id,
    }));
  }

  get priorityOptions(): SelectOption[] {
    return TaskPriorities.map((p) => ({
      label: p,
      value: p,
    }));
  }
}
