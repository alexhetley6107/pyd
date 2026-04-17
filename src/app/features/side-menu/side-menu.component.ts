import { MOBILE_WIDTH } from '@/shared/constants';
import { ERoute } from '@/shared/constants/routes';
import { AuthService } from '@/entities/auth/service/auth.service';
import { SideMenuService } from '@/shared/services/side-menu.service';
import { LogoComponent } from '@/shared/ui/logo/logo.component';
import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { tap } from 'rxjs';
import { IconComponent } from '@/shared/ui/icon/icon.component';

@Component({
  selector: 'side-menu',
  imports: [RouterLink, LogoComponent, NgClass, RouterLinkActive, IconComponent],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.scss',
  standalone: true,
})
export class SideMenuComponent {
  auth = inject(AuthService);
  menu = inject(SideMenuService);
  router = inject(Router);

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

  getIconColor(active: boolean) {
    return active ? 'var(--prime-color)' : 'var(--blue-color)';
  }

  links = [
    { title: 'Dashboard', path: ERoute.DASHBOARD, icon: 'agile' },
    { title: 'Boards', path: ERoute.BOARDS, icon: 'backlog' },
    { title: 'Backlog', path: ERoute.BACKLOG, icon: 'backlog' },
    { title: 'Setting', path: ERoute.SETTING, icon: 'dashboard', onlyMobile: true },
  ];

  logout() {
    this.auth
      .logout()
      .pipe(
        tap(() => {
          this.router.navigateByUrl(ERoute.LOGIN);
        })
      )
      .subscribe();
    this.menu.openMenu();
  }
}
