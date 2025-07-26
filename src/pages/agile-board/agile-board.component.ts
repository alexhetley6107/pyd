import { BoardManagerComponent } from '@/features/board-manager/board-manager.component';
import { BoardService } from '@/shared/services/board.service';
import { StatusService } from '@/shared/services/status.service';
import { Board, Status } from '@/shared/types/board';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-agile-board',
  imports: [BoardManagerComponent],
  templateUrl: './agile-board.component.html',
  styleUrl: './agile-board.component.scss',
})
export class AgileBoardComponent {
  boardService = inject(BoardService);
  statusService = inject(StatusService);

  loadSBoardsInfo() {
    const isStatuses = this.statusService.statuses.length;
    const isBoards = this.boardService.boards.length;

    if (isStatuses && isBoards) return;

    this.boardService.getAll().subscribe();
    this.statusService.getAll().subscribe();
  }

  ngOnInit() {
    this.loadSBoardsInfo();
  }
  get boards(): Board[] {
    return this.boardService.boards;
  }
  get statuses(): Status[] {
    return this.statusService.statuses;
  }
}
