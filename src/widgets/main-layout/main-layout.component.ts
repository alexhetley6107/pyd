import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { TopBarComponent } from './top-bar/top-bar.component';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, SideMenuComponent, TopBarComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
  standalone: true,
})
export class MainLayoutComponent {}
