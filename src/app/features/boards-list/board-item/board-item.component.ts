import { ERoute } from '@/shared/constants/routes';
import { Board } from '@/shared/types/board';
import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'board-item',
  imports: [],
  templateUrl: './board-item.component.html',
  styleUrl: './board-item.component.scss',
})
export class BoardItemComponent {
  router = inject(Router);

  board = input<Board>();

  navigateToBoard() {
    this.router.navigate([ERoute.BOARDS, this.board()?.id]);
  }
}
