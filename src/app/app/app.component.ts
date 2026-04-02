import { ToastProviderComponent } from '@/features/toast-provider/toast-provider.component';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [FormsModule, ReactiveFormsModule, ToastProviderComponent, RouterOutlet],
  templateUrl: './app.component.html',
})
export class AppComponent {}
