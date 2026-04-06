import { BoardColumnsComponent } from '@/features/board-columns/board-columns.component';
import { BoardManagerComponent } from '@/features/board-manager/board-manager.component';
import { BoardService } from '@/shared/services/board.service';

import { Board } from '@/shared/types/board';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-agile-board',
  imports: [BoardManagerComponent, BoardColumnsComponent],
  templateUrl: './agile-board.component.html',
  styleUrl: './agile-board.component.scss',
})
export class AgileBoardComponent {
  boardService = inject(BoardService);

  loadSBoardsInfo() {
    const isBoards = this.boardService.boards.length;

    if (isBoards) return;

    this.boardService.getAll().subscribe();
  }

  ngOnInit() {
    this.loadSBoardsInfo();
  }
  get boards(): Board[] {
    return this.boardService.boards();
  }
}
