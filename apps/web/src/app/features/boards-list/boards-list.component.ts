import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { SkeletonComponent } from '@/shared/ui/skeleton/skeleton.component';
import { ListContainerComponent } from '@/shared/ui/list-container/list-container.component';
import { BoardService } from '@/entities/board/service/board.service';
import { BoardItemComponent } from '../../entities/board/ui/board-item/board-item.component';
import { Board } from '@/entities/board/model';
import { InputComponent } from '@/shared/ui/input/input.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'boards-list',
  imports: [
    SkeletonComponent,
    ListContainerComponent,
    BoardItemComponent,
    InputComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './boards-list.component.html',
  styleUrl: './boards-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardsListComponent {
  boardService = inject(BoardService);

  searchControl = new FormControl('');

  search = toSignal(this.searchControl.valueChanges.pipe(debounceTime(300)), {
    initialValue: '',
  });

  get isFetching(): boolean {
    return this.boardService.isFetching();
  }

  boards = computed<Board[]>(() => {
    const search = this.search()?.toLowerCase() || '';

    return this.boardService
      .boards()
      .filter(
        (board) =>
          board.name.toLowerCase().includes(search) ||
          board.description.toLowerCase().includes(search)
      );
  });
}
