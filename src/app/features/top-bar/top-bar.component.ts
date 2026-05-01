import { ERoute } from '@/shared/constants/routes';
import { AuthService } from '@/entities/user/service/auth.service';
import { SideMenuService } from '@/shared/services/side-menu.service';
import { ActionOption } from '@/shared/types';
import { PopoverComponent } from '@/shared/ui/popover/popover.component';
import { Component, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { IconComponent } from '@/shared/ui/icon/icon.component';
import { ThemeService } from '@/shared/services/theme.service';
import { TitleCasePipe } from '@angular/common';
import { UserService } from '@/entities/user/service/user.service';

@Component({
  selector: 'top-bar',
  imports: [PopoverComponent, IconComponent, TitleCasePipe],
  standalone: true,
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss',
})
export class TopBarComponent {
  router = inject(Router);
  auth = inject(AuthService);
  menu = inject(SideMenuService);
  theme = inject(ThemeService);
  user = inject(UserService);

  letters = computed(() => {
    return this.user
      .user()
      ?.nickname.split(' ')
      .map((name) => name[0].toLocaleUpperCase())
      .join('');
  });

  avatar = computed(() => {
    const path = this.user.user()?.photo || '';
    return path;
  });

  menuItems = computed<ActionOption[]>(() => [
    {
      text: 'profile',
      action: () => this.router.navigateByUrl(ERoute.PROFILE),
    },
    {
      text: this.theme.theme() + ' theme',
      action: () => this.theme.toggleTheme(),
    },
    {
      text: 'log out',
      action: () =>
        this.auth
          .logout()
          .pipe(
            tap(() => {
              this.router.navigateByUrl(ERoute.LOGIN);
            })
          )
          .subscribe(),
    },
  ]);

  toggleMenu() {
    this.menu.toggleMenu();
  }
}
