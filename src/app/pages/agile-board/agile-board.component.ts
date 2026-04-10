import { BoardColumnsComponent } from '@/features/board-columns/board-columns.component';
import { BoardManagerComponent } from '@/features/board-manager/board-manager.component';
import { BoardService } from '@/entities/board/service/board.service';
import { Component, inject } from '@angular/core';
import { Board } from '@/entities/board/model';

@Component({
  selector: 'app-agile-board',
  imports: [BoardManagerComponent, BoardColumnsComponent],
  templateUrl: './agile-board.component.html',
  styleUrl: './agile-board.component.scss',
})
export class AgileBoardComponent {
  boardService = inject(BoardService);

  get boards(): Board[] {
    return this.boardService.boards();
  }
}
