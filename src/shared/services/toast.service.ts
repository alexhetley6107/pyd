import { Injectable, signal } from '@angular/core';

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error';
  isOpen: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private _toasts = signal<Toast[]>([]);

  public readonly toasts = this._toasts;

  add(message: string) {
    const toast: Toast = {
      id: (Math.random() * 100).toString(),
      message,
      type: 'success',
      isOpen: false,
    };
    this._toasts.update((items) => [...items, toast]);

    setTimeout(() => {
      this._toasts.update((items) =>
        items.map((t) => (t.id !== toast.id ? t : { ...t, isOpen: true }))
      );
    }, 0);
    setTimeout(() => {
      this.remove(toast.id);
    }, 4000);
  }

  remove(id: string) {
    this._toasts.update((items) => items.map((t) => (t.id !== id ? t : { ...t, isOpen: false })));
    setTimeout(() => {
      this._toasts.update((items) => items.filter((t) => t.id !== id));
    }, 350);
  }
}
