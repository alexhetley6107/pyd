import { LogoComponent } from '@/shared/ui/logo/logo.component';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'side-menu',
  imports: [RouterLink, LogoComponent],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.scss',
})
export class SideMenuComponent {}
