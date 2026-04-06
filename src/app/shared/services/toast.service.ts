import { Injectable, signal } from '@angular/core';
import { Subject, timer } from 'rxjs';
import { throttleTime } from 'rxjs/operators';

export type ToastType = 'success' | 'error';

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
  isOpen: boolean;
  delay: number;
  isConstant: boolean;
}

type ToastInput = {
  message: string;
  options?: {
    type?: ToastType;
    delay?: number;
    isConstant?: boolean;
  };
};

@Injectable({ providedIn: 'root' })
export class ToastService {
  private readonly _toasts = signal<Toast[]>([]);
  readonly toasts = this._toasts.asReadonly();

  private readonly add$ = new Subject<ToastInput>();

  constructor() {
    this.initAddPipeline();
  }

  add(message: string, options?: ToastInput['options']) {
    this.add$.next({ message, options });
  }

  showSuccess(message: string) {
    this.add(message, { type: 'success' });
  }

  showError(message: string) {
    this.add(message, { type: 'error', delay: 10000 });
  }

  remove(id: string) {
    this.patch(id, { isOpen: false });
    timer(400).subscribe(() => {
      this._toasts.update((list) => list.filter((t) => t.id !== id));
    });
  }

  private initAddPipeline() {
    this.add$
      .pipe(
        throttleTime(500, undefined, {
          leading: true,
          trailing: true,
        })
      )
      .subscribe(({ message, options }) => {
        this.createToast(message, options);
      });
  }

  private createToast(message: string, options?: ToastInput['options']) {
    const toast: Toast = {
      id: crypto.randomUUID(),
      message,
      type: options?.type ?? 'success',
      isOpen: false,
      delay: options?.delay ?? 4000,
      isConstant: options?.isConstant ?? false,
    };

    this._toasts.update((list) => [...list, toast]);

    timer(10).subscribe(() => {
      this.patch(toast.id, { isOpen: true });
    });

    if (!toast.isConstant) {
      timer(toast.delay).subscribe(() => {
        this.remove(toast.id);
      });
    }
  }

  private patch(id: string, patch: Partial<Toast>) {
    this._toasts.update((list) => list.map((t) => (t.id === id ? { ...t, ...patch } : t)));
  }
}
