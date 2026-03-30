import { ToastProviderComponent } from '@/widgets/toast-provider/toast-provider.component';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckAuthLayoutComponent } from './layouts/check-auth-layout/check-auth-layout.component';

@Component({
  selector: 'app-root',
  imports: [FormsModule, ReactiveFormsModule, ToastProviderComponent, CheckAuthLayoutComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {}
