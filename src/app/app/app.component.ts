import { ToastProviderComponent } from '@/widgets/toast-provider/toast-provider.component';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, ReactiveFormsModule, ToastProviderComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {}
