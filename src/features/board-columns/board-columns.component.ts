import { SideMenuService } from '@/shared/services/side-menu.service';
import { StatusService } from '@/shared/services/status.service';
import { Status } from '@/shared/types/board';
import { Component, HostBinding, inject } from '@angular/core';

@Component({
  selector: 'board-columns',
  imports: [],
  templateUrl: './board-columns.component.html',
  styleUrl: './board-columns.component.scss',
})
export class BoardColumnsComponent {
  menu = inject(SideMenuService);
  statusService = inject(StatusService);

  @HostBinding('class.menu-opened')
  get menuOpened(): boolean {
    return this.menu.isOpen;
  }

  get columns(): Status[] {
    return this.statusService.statuses;
  }
}
