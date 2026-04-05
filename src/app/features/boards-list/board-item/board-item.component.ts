import { Board } from '@/shared/types/board';
import { Component, input } from '@angular/core';

@Component({
  selector: 'board-item',
  imports: [],
  templateUrl: './board-item.component.html',
  styleUrl: './board-item.component.scss',
})
export class BoardItemComponent {
  board = input<Board>();
}
