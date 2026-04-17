import { ERoute } from '@/shared/constants/routes';
import { AuthService } from '@/entities/auth/service/auth.service';
import { SideMenuService } from '@/shared/services/side-menu.service';
import { ActionOption } from '@/shared/types';
import { PopoverComponent } from '@/shared/ui/popover/popover.component';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { IconComponent } from '@/shared/ui/icon/icon.component';

@Component({
  selector: 'top-bar',
  imports: [PopoverComponent, IconComponent],
  standalone: true,
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss',
})
export class TopBarComponent {
  router = inject(Router);
  auth = inject(AuthService);
  menu = inject(SideMenuService);

  get letters() {
    const user = this.auth.user();

    if (!user) return 'U';

    return user?.nickname
      .split(' ')
      .map((name) => name[0].toLocaleUpperCase())
      .join('');
  }

  menuItems: ActionOption[] = [
    {
      text: 'Setting',
      action: () => this.router.navigateByUrl(ERoute.SETTING),
    },
    {
      text: 'Log out',
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
  ];

  toggleMenu() {
    this.menu.toggleMenu();
  }
}
