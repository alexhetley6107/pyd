import { Board } from '@/shared/types/board';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'board-item',
  imports: [RouterLink],
  templateUrl: './board-item.component.html',
  styleUrl: './board-item.component.scss',
})
export class BoardItemComponent {
  board = input<Board>();
}
