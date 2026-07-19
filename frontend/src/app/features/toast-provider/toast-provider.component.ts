import { ToastService } from '@/shared/services/toast.service';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NgClass } from '@angular/common';
import { IconComponent } from '@/shared/ui/icon/icon.component';

@Component({
  selector: 'toast-provider',
  imports: [NgClass, IconComponent],
  templateUrl: './toast-provider.component.html',
  styleUrl: './toast-provider.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastProviderComponent {
  toastService = inject(ToastService);
  toasts = this.toastService.toasts;

  closeToast(id: string) {
    this.toastService.remove(id);
  }
}
