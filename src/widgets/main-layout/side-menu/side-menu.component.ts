import { MOBILE_WIDTH } from '@/shared/constants';
import { AuthService } from '@/shared/services/auth.service';
import { SideMenuService } from '@/shared/services/side-menu.service';
import { LogoComponent } from '@/shared/ui/logo/logo.component';
import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'side-menu',
  imports: [RouterLink, LogoComponent, NgClass, RouterLinkActive],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.scss',
  standalone: true,
})
export class SideMenuComponent {
  auth = inject(AuthService);
  menu = inject(SideMenuService);

  get isCollapsed() {
    return !this.menu.isOpen;
  }

  toggleMenu() {
    this.menu.toggleMenu();
  }

  onLinkClick() {
    const shouldClose = window.innerWidth <= MOBILE_WIDTH;
    if (shouldClose) {
      this.toggleMenu();
    }
  }

  ngOnInit() {
    const shouldOpen = window.innerWidth < MOBILE_WIDTH;
    if (shouldOpen) this.menu.closeMenu();
  }

  links = [
    { title: 'Dashboard', path: ['/dashboard'], icon: 'dashboard_' },
    { title: 'Calendar', path: ['/calendar'], icon: 'calendar_' },
    { title: 'Agile Board', path: ['/agile-board'], icon: 'agile_' },
    { title: 'Backlog', path: ['/backlog'], icon: 'backlog_' },
    { title: 'Setting', path: ['/setting'], icon: 'dashboard_', onlyMobile: true },
  ];

  logout() {
    this.auth.logout();
    this.menu.openMenu();
  }
}
