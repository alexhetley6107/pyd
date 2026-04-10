import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Board } from '../../model';

@Component({
  selector: 'board-item',
  imports: [RouterLink],
  templateUrl: './board-item.component.html',
  styleUrl: './board-item.component.scss',
})
export class BoardItemComponent {
  board = input<Board>();
}
