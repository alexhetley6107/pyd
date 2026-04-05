import { Component, inject } from '@angular/core';
import { SkeletonComponent } from '@/shared/ui/skeleton/skeleton.component';
import { ListContainerComponent } from '@/shared/ui/list-container/list-container.component';
import { BoardService } from '@/shared/services/board.service';
import { Board } from '@/shared/types/board';
import { BoardItemComponent } from './board-item/board-item.component';

@Component({
  selector: 'boards-list',
  imports: [SkeletonComponent, ListContainerComponent, BoardItemComponent],
  templateUrl: './boards-list.component.html',
  styleUrl: './boards-list.component.scss',
})
export class BoardsListComponent {
  boardService = inject(BoardService);

  get isFetching(): boolean {
    return this.boardService.isFetching;
  }

  get boards(): Board[] {
    return this.boardService.boards;
  }
}
