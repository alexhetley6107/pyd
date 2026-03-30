import { ButtonComponent } from '@/shared/ui/button/button.component';
import { Component, effect, inject } from '@angular/core';
import { BoardModalComponent } from '@/features/board-modal/board-modal.component';
import { BoardDeleteModalComponent } from '@/features/board-delete-modal/board-delete-modal.component';
import { TaskModalComponent } from '@/features/task-modal/task-modal.component';
import { BoardService } from '@/shared/services/board.service';
import { PopoverComponent } from '@/shared/ui/popover/popover.component';
import { ActionOption, SelectOption } from '@/shared/types/ui';
import { SkeletonComponent } from '@/shared/ui/skeleton/skeleton.component';
import { SelectorComponent } from '@/shared/ui/selector/selector.component';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'board-manager',
  imports: [
    ButtonComponent,
    BoardModalComponent,
    PopoverComponent,
    BoardDeleteModalComponent,
    SkeletonComponent,
    TaskModalComponent,
    SelectorComponent,
    ReactiveFormsModule,
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

  form!: FormGroup<{
    boardId: FormControl<string>;
  }>;

  constructor(private fb: NonNullableFormBuilder) {
    effect(() => {
      const boardId = this.boardService.openedBoard()?.id;
      if (!boardId) return;
      this.form.patchValue({ boardId });
    });
  }

  ngOnInit() {
    this.form = this.fb.group({
      boardId: this.fb.control(''),
    });

    this.form.valueChanges.subscribe((value) => {
      if (value?.boardId) {
        this.boardService.openBoard(value.boardId);
      }
    });
  }

  get isBoardSelect(): boolean {
    return this.boardService.boards.length > 0;
  }

  get isFetching(): boolean {
    return this.boardService.isFetching;
  }

  get boardSelectOptions(): SelectOption[] {
    return this.boardService.boards.map((board) => ({
      label: board.name,
      value: board.id,
    }));
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
