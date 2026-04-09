import { Component, computed, inject, signal } from '@angular/core';
import { BreadcrumbsComponent } from '@/shared/ui/breadcrumbs/breadcrumbs.component';
import { ERoute } from '@/shared/constants/routes';
import { ActivatedRoute, Router } from '@angular/router';
import { BoardService } from '@/shared/services/board.service';
import { ToastService } from '@/shared/services/toast.service';
import { Board } from '@/shared/types/board';
import { BreadCrumbItem } from '@/shared/types/ui';
import { ButtonComponent } from '@/shared/ui/button/button.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BoardDeleteModalComponent } from '@/features/board-delete-modal/board-delete-modal.component';
import { BoardUpdateFormComponent } from '@/features/board-update-form/board-update-form.component';
import { SkeletonComponent } from '@/shared/ui/skeleton/skeleton.component';

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
})
export class BoardDetailsComponent {
  router = inject(Router);
  route = inject(ActivatedRoute);
  boardService = inject(BoardService);
  toast = inject(ToastService);

  currentBoard = signal<Board | null>(null);

  isModal = signal(false);
  isLoading = signal(false);

  ngOnInit() {
    const boardId = this.route.snapshot.paramMap.get('boardId');
    if (!boardId) {
      this.router.navigateByUrl(ERoute.BOARDS);
      return;
    }

    const b = this.boardService.boards().find((b) => b.id === boardId);
    if (b) {
      this.currentBoard.set(b);
      return;
    }

    this.isLoading.set(true);
    this.boardService.getOne(boardId).subscribe({
      next: (b) => {
        this.currentBoard.set(b);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.toast.showError(err.error.message);
        this.isLoading.set(false);
      },
    });
  }

  toggleDeleteModal() {
    this.isModal.update((v) => !v);
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
