import { LogoComponent } from '@/shared/ui/logo/logo.component';
import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'side-menu',
  imports: [RouterLink, LogoComponent, NgClass],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.scss',
})
export class SideMenuComponent {
  isCollapsed = false;

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }

  links = [
    { title: 'Dashboard', path: 'dashboard' },
    { title: 'Agile Board', path: 'agile-board' },
    { title: 'Calendar', path: 'calendar' },
    { title: 'Backlog', path: 'backlog' },
  ];
}
