import { ConfirmModalComponent } from './../../shared/ui/confirm-modal/confirm-modal.component';
import { ButtonComponent } from '@/shared/ui/button/button.component';
import { Component, inject } from '@angular/core';
import { BoardModalComponent } from '../board-modal/board-modal.component';
import { BoardService } from '@/shared/services/board.service';
import { PopoverComponent } from '@/shared/ui/popover/popover.component';
import { BoardDeleteModalComponent } from '../board-delete-modal/board-delete-modal.component';

@Component({
  selector: 'board-manager',
  imports: [ButtonComponent, BoardModalComponent, PopoverComponent, BoardDeleteModalComponent],
  templateUrl: './board-manager.component.html',
  styleUrl: './board-manager.component.scss',
})
export class BoardManagerComponent {
  boardService = inject(BoardService);

  isAddModal = false;
  isEditModal = false;
  isDeleteModal = false;
  isTaskModal = false;

  get boardName() {
    return this.boardService.openedBoard?.name;
  }
  toggleAddModal() {
    this.isAddModal = !this.isAddModal;
  }
  toggleEditModal() {
    this.isEditModal = !this.isEditModal;
  }
  toggleDeleteModal() {
    this.isDeleteModal = !this.isDeleteModal;
  }
  toggleTaskModal() {
    this.isTaskModal = !this.isTaskModal;
  }

  moreMenuItems = [
    {
      label: 'Rename',
      action: () => this.toggleEditModal(),
    },
    {
      label: 'Delete',
      action: () => this.toggleDeleteModal(),
    },
  ];
}
