import { BoardService } from '@/shared/services/board.service';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'board-view',
  imports: [],
  templateUrl: './board-view.component.html',
  styleUrl: './board-view.component.scss',
})
export class BoardViewComponent implements OnInit {
  route = inject(ActivatedRoute);
  boardService = inject(BoardService);

  ngOnInit() {
    const boardId = this.route.snapshot.paramMap.get('id');
    console.log(boardId);
  }
}
