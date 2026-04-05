import { BoardService } from '@/shared/services/board.service';
import { Board } from '@/shared/types/board';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ButtonComponent } from '@/shared/ui/button/button.component';
import { ERoute } from '@/shared/constants/routes';
import { BoardsListComponent } from '@/features/boards-list/boards-list.component';
import { BoardsSearchComponent } from '@/features/boards-search/boards-search.component';

@Component({
  selector: 'boards',
  imports: [ButtonComponent, BoardsListComponent, BoardsSearchComponent],
  templateUrl: './boards.component.html',
  styleUrl: './boards.component.scss',
})
export class BoardsComponent {
  router = inject(Router);
  boardService = inject(BoardService);

  loadSBoardsInfo() {
    // const isBoards = this.boardService.boards.length;

    // if (isBoards) return;

    this.boardService.getAll().subscribe();
  }

  ngOnInit() {
    this.loadSBoardsInfo();
  }
  get boards(): Board[] {
    return this.boardService.boards;
  }

  navigateToCreateBoard() {
    this.router.navigateByUrl(ERoute.CREATE_BOARD);
  }
}
