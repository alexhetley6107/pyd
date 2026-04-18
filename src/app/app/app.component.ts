import { ToastProviderComponent } from '@/features/toast-provider/toast-provider.component';
import { ThemeService } from '@/shared/services/theme.service';
import { registerIcons } from '@/shared/ui/icon/model/registerIcons';
import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [FormsModule, ReactiveFormsModule, ToastProviderComponent, RouterOutlet],
  templateUrl: './app.component.html',
})
export class AppComponent {
  theme = inject(ThemeService);

  constructor() {
    registerIcons();
    this.theme.initTheme();
  }
}
