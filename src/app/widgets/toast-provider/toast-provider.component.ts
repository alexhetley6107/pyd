import { ToastService } from '@/shared/services/toast.service';
import { Component, inject } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'toast-provider',
  imports: [NgClass],
  templateUrl: './toast-provider.component.html',
  styleUrl: './toast-provider.component.scss',
})
export class ToastProviderComponent {
  toastService = inject(ToastService);
  toasts = this.toastService.toasts;

  closeToast(id: string) {
    this.toastService.remove(id);
  }
}
