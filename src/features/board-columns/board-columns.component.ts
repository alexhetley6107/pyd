import { SideMenuService } from '@/shared/services/side-menu.service';
import { Component, HostBinding, inject } from '@angular/core';

@Component({
  selector: 'board-columns',
  imports: [],
  templateUrl: './board-columns.component.html',
  styleUrl: './board-columns.component.scss',
})
export class BoardColumnsComponent {
  menu = inject(SideMenuService);

  @HostBinding('class.menu-opened')
  get someClass(): boolean {
    return this.menu.isOpen;
  }
}
