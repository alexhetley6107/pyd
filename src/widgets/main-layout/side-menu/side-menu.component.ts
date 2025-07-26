import { LogoComponent } from '@/shared/ui/logo/logo.component';
import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

const MOBILE_WIDTH = 768;

@Component({
  selector: 'side-menu',
  imports: [RouterLink, LogoComponent, NgClass, RouterLinkActive],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.scss',
  standalone: true,
})
export class SideMenuComponent {
  isCollapsed = false;

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }

  onLinkClick() {
    const shouldClose = window.innerWidth <= MOBILE_WIDTH;
    if (shouldClose) {
      this.toggleCollapse();
    }
  }

  ngOnInit() {
    this.onLinkClick();
  }

  links = [
    { title: 'Dashboard', path: ['/dashboard'], icon: 'dashboard_' },
    { title: 'Calendar', path: ['/calendar'], icon: 'calendar_' },
    { title: 'Agile Board', path: ['/agile-board'], icon: 'agile_' },
    { title: 'Backlog', path: ['/backlog'], icon: 'backlog_' },
  ];
}
