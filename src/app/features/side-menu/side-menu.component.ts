import { MOBILE_WIDTH } from '@/shared/constants';
import { ERoute } from '@/shared/constants/routes';
import { AuthService } from '@/entities/user/service/auth.service';
import { SideMenuService } from '@/shared/services/side-menu.service';
import { LogoComponent } from '@/shared/ui/logo/logo.component';
import { NgClass, TitleCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { tap } from 'rxjs';
import { IconComponent } from '@/shared/ui/icon/icon.component';

@Component({
  selector: 'side-menu',
  imports: [RouterLink, LogoComponent, NgClass, RouterLinkActive, IconComponent, TitleCasePipe],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideMenuComponent {
  auth = inject(AuthService);
  menu = inject(SideMenuService);
  router = inject(Router);

  get isCollapsed() {
    return !this.menu.isOpen();
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
    return active ? 'var(--prime-color)' : 'var(--text-color)';
  }

  links = [
    { title: 'dashboard', path: ERoute.DASHBOARD, icon: 'dashboard' },
    { title: 'boards', path: ERoute.BOARDS, icon: 'agile' },
    { title: 'backlog', path: ERoute.BACKLOG, icon: 'backlog' },
    { title: 'profile', path: ERoute.PROFILE, icon: 'agile', onlyMobile: true },
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
