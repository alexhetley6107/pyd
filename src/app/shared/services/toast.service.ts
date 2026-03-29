import { Injectable, signal } from '@angular/core';

type ToastType = 'success' | 'error';

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
  isOpen: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private _toasts = signal<Toast[]>([]);

  public readonly toasts = this._toasts;

  add(message: string, options?: { type?: ToastType; isConstant?: boolean }) {
    const toast: Toast = {
      id: (Math.random() * 100).toString(),
      message,
      type: options?.type ?? 'success',
      isOpen: false,
    };
    this._toasts.update((items) => [...items, toast]);

    setTimeout(() => {
      this._toasts.update((items) =>
        items.map((t) => (t.id !== toast.id ? t : { ...t, isOpen: true }))
      );
    }, 0);

    if (options?.isConstant) return;
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
