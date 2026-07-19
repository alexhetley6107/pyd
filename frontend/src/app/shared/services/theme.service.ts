import { computed, Injectable, signal } from '@angular/core';

type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  theme = signal<Theme>('light');

  initTheme() {
    const theme = localStorage.getItem('theme') ?? 'light';
    this.setTheme(theme as Theme);
  }

  setTheme(theme: Theme) {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
    this.theme.set(theme);
  }

  toggleTheme() {
    const newTheme: Theme = this.theme() === 'dark' ? 'light' : 'dark';
    this.setTheme(newTheme);
  }
}
