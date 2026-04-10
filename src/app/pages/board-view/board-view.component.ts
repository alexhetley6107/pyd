import { ERoute } from '@/shared/constants/routes';
import { BoardService } from '@/shared/services/board.service';
import { ToastService } from '@/shared/services/toast.service';
import { Board } from '@/shared/types/board';
import { Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BreadcrumbsComponent } from '@/shared/ui/breadcrumbs/breadcrumbs.component';
import { BreadCrumbItem } from '@/shared/types/ui';
import { ButtonComponent } from '@/shared/ui/button/button.component';
import { BoardColumnsComponent } from '@/features/board-columns/board-columns.component';
import { InputComponent } from '@/shared/ui/input/input.component';
import { SkeletonComponent } from '@/shared/ui/skeleton/skeleton.component';
import { TaskService } from '@/shared/services/task.service';

@Component({
  selector: 'board-view',
  imports: [
    BreadcrumbsComponent,
    ButtonComponent,
    RouterLink,
    BoardColumnsComponent,
    InputComponent,
    SkeletonComponent,
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

  isLoading = signal(false);

  loadTasksEffect = effect(() => {
    if (!this.boardId()) return;
    this.taskService.getAll({ boardId: this.boardId() }).subscribe();
  });

  currentBoard = computed<Board | null>(() => {
    if (!this.boardId()) return null;
    return this.boardService.boards().find((b) => b.id === this.boardId()) ?? null;
  });

  get isFetching(): boolean {
    return this.boardService.isFetching();
  }

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
