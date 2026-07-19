import { BoardService } from '@/entities/board/service/board.service';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonComponent } from '@/shared/ui/button/button.component';
import { ERoute } from '@/shared/constants/routes';
import { BoardsListComponent } from '@/features/boards-list/boards-list.component';
import { ToastService } from '@/shared/services/toast.service';
import { Board } from '@/entities/board/model';

@Component({
  selector: 'boards',
  imports: [ButtonComponent, BoardsListComponent],
  templateUrl: './boards.component.html',
  styleUrl: './boards.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardsComponent {
  router = inject(Router);
  toast = inject(ToastService);
  boardService = inject(BoardService);

  get boards(): Board[] {
    return this.boardService.boards();
  }

  navigateToCreateBoard() {
    this.router.navigateByUrl(ERoute.CREATE_BOARD);
  }
}
