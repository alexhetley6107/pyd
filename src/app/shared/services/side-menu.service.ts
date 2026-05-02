import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SideMenuService {
  isOpen = signal(false);

  toggleMenu() {
    this.isOpen.update((isOpen) => !isOpen);
  }

  openMenu() {
    this.isOpen.set(true);
  }

  closeMenu() {
    this.isOpen.set(false);
  }
}
