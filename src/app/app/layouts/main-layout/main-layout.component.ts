import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideMenuComponent } from '../../../features/side-menu/side-menu.component';
import { TopBarComponent } from '../../../features/top-bar/top-bar.component';
import { BoardService } from '@/entities/board/service/board.service';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, SideMenuComponent, TopBarComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
  standalone: true,
})
export class MainLayoutComponent implements OnInit {
  boardService = inject(BoardService);

  ngOnInit(): void {
    this.boardService.getAll().subscribe();
  }
}
