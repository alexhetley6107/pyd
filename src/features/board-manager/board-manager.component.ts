import { ButtonComponent } from '@/shared/ui/button/button.component';
import { Component, inject } from '@angular/core';
import { BoardModalComponent } from '../board-modal/board-modal.component';
import { BoardService } from '@/shared/services/board.service';
import { PopoverComponent } from '@/shared/ui/popover/popover.component';
import { BoardDeleteModalComponent } from '../board-delete-modal/board-delete-modal.component';
import { SelectComponent } from '@/shared/ui/select/select.component';
import { ActionOption, SelectOption } from '@/shared/types/ui';

@Component({
  selector: 'board-manager',
  imports: [
    ButtonComponent,
    BoardModalComponent,
    PopoverComponent,
    BoardDeleteModalComponent,
    SelectComponent,
  ],
  templateUrl: './board-manager.component.html',
  styleUrl: './board-manager.component.scss',
})
export class BoardManagerComponent {
  boardService = inject(BoardService);

  isAddModal = false;
  isEditModal = false;
  isDeleteModal = false;
  isTaskModal = false;

  get isBoardSelect(): boolean {
    return this.boardService.boards.length > 0;
  }

  get boardSelectOptions(): SelectOption[] {
    return this.boardService.boards.map((board) => ({
      label: board.name,
      value: board.id,
    }));
  }

  get selectedBoardOption(): SelectOption | null {
    return (
      this.boardSelectOptions.find((o) => o.value === this.boardService?.openedBoard?.id) ?? null
    );
  }

  selectedBoardActions: ActionOption[] = [
    {
      text: 'Rename',
      action: () => this.toggleEditModal(),
    },
    {
      text: 'Delete',
      action: () => this.toggleDeleteModal(),
    },
  ];

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
}
