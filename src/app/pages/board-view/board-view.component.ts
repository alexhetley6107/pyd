import { ERoute } from '@/shared/constants/routes';
import { BoardService } from '@/entities/board/service/board.service';
import { ToastService } from '@/shared/services/toast.service';
import { Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BreadcrumbsComponent } from '@/shared/ui/breadcrumbs/breadcrumbs.component';
import { BreadCrumbItem, Nullable } from '@/shared/types';
import { ButtonComponent } from '@/shared/ui/button/button.component';
import { BoardColumnsComponent } from '@/features/board-columns/board-columns.component';
import { InputComponent } from '@/shared/ui/input/input.component';
import { TaskService } from '@/entities/task/service/task.service';
import { Board } from '@/entities/board/model';
import { Task } from '@/entities/task/model';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'board-view',
  imports: [
    BreadcrumbsComponent,
    ButtonComponent,
    RouterLink,
    BoardColumnsComponent,
    InputComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './board-view.component.html',
  styleUrl: './board-view.component.scss',
})
export class BoardViewComponent {
  router = inject(Router);
  route = inject(ActivatedRoute);
  boardService = inject(BoardService);
  taskService = inject(TaskService);
  toast = inject(ToastService);

  boardId = computed(() => this.route.snapshot.paramMap.get('boardId') ?? null);

  searchControl = new FormControl('');

  search = toSignal(this.searchControl.valueChanges.pipe(debounceTime(300)), {
    initialValue: '',
  });

  loadTasksEffect = effect(() => {
    if (!this.boardId()) return;
    if (this.taskService.loadedBoardId() === this.boardId()) return;

    this.taskService.getAll({ boardId: this.boardId() }).subscribe({
      next: () => this.taskService.loadedBoardId.set(this.boardId()),
    });
  });

  currentBoard = computed<Nullable<Board>>(() => {
    if (!this.boardId()) return null;
    return this.boardService.boards().find((b) => b.id === this.boardId()) ?? null;
  });

  tasks = computed<Task[]>(() => {
    const search = this.search()?.toLowerCase() || '';

    return this.taskService
      .tasks()
      .filter(
        (board) =>
          board.title.toLowerCase().includes(search) ||
          board.description.toLowerCase().includes(search)
      );
  });

  isFetching = computed(() => {
    return this.boardService.isFetching() || this.taskService.isFetching();
  });

  links = computed<BreadCrumbItem[]>(() => [
    {
      text: 'Boards',
      link: '/' + ERoute.BOARDS,
    },
    {
      text: this.currentBoard()?.name ?? '',
    },
  ]);
}
