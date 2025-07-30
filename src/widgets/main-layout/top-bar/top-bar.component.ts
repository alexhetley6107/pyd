import { AuthService } from '@/shared/services/auth.service';
import { ActionOption } from '@/shared/types/ui';
import { PopoverComponent } from '@/shared/ui/popover/popover.component';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'top-bar',
  imports: [PopoverComponent],
  standalone: true,
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss',
})
export class TopBarComponent {
  router = inject(Router);
  auth = inject(AuthService);

  get letters() {
    const user = this.auth.getUser();

    if (!user) return 'U';

    return user?.nickname
      .split(' ')
      .map((name) => name[0].toLocaleUpperCase())
      .join('');
  }

  menuItems: ActionOption[] = [
    {
      text: 'Setting',
      action: () => this.router.navigate(['setting']),
    },
    {
      text: 'Log out',
      action: () => this.auth.logout(),
    },
  ];
}
