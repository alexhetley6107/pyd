import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SideMenuService {
  isOpen = true;

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }

  openMenu() {
    this.isOpen = true;
  }

  closeMenu() {
    this.isOpen = false;
  }
}
