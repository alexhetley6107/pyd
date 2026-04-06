import { Component, DestroyRef, inject } from '@angular/core';
import { InputComponent } from '@/shared/ui/input/input.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { BoardService } from '@/shared/services/board.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'boards-search',
  imports: [InputComponent, ReactiveFormsModule],
  templateUrl: './boards-search.component.html',
  styleUrl: './boards-search.component.scss',
})
export class BoardsSearchComponent {
  boardService = inject(BoardService);
  private destroyRef = inject(DestroyRef);

  searchControl = new FormControl('');

  ngOnInit() {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((query) => this.boardService.getAll(query ?? '')),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }
}
