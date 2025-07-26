import { MOBILE_WIDTH } from '@/shared/constants';
import { AuthService } from '@/shared/services/auth.service';
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

  isCollapsed = true;

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
    const shouldOpen = window.innerWidth > MOBILE_WIDTH;
    if (shouldOpen) this.isCollapsed = false;
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
    this.isCollapsed = true;
  }
}
