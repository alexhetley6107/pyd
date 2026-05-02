import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { BreadcrumbsComponent } from '@/shared/ui/breadcrumbs/breadcrumbs.component';
import { ERoute } from '@/shared/constants/routes';
import { ActivatedRoute, Router } from '@angular/router';
import { BoardService } from '@/entities/board/service/board.service';
import { ToastService } from '@/shared/services/toast.service';
import { BreadCrumbItem, Nullable } from '@/shared/types';
import { ButtonComponent } from '@/shared/ui/button/button.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BoardDeleteModalComponent } from '@/features/board-delete-modal/board-delete-modal.component';
import { BoardUpdateFormComponent } from '@/features/board-update-form/board-update-form.component';
import { SkeletonComponent } from '@/shared/ui/skeleton/skeleton.component';
import { Board } from '@/entities/board/model';

@Component({
  selector: 'board-details',
  imports: [
    BreadcrumbsComponent,
    ButtonComponent,
    ReactiveFormsModule,
    BoardDeleteModalComponent,
    BoardUpdateFormComponent,
    SkeletonComponent,
  ],
  templateUrl: './board-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardDetailsComponent {
  router = inject(Router);
  route = inject(ActivatedRoute);
  boardService = inject(BoardService);
  toast = inject(ToastService);

  isModal = signal(false);

  currentBoard = computed<Nullable<Board>>(() => {
    const boardId = this.route.snapshot.paramMap.get('boardId');
    if (!boardId) return null;
    return this.boardService.boards().find((b) => b.id === boardId) ?? null;
  });

  toggleDeleteModal() {
    this.isModal.update((v) => !v);
  }

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
      link: '/' + ERoute.BOARDS + '/' + this.currentBoard()?.id,
    },
    {
      text: 'Details',
    },
  ]);
}
