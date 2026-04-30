import { Component, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '@/entities/user/service/auth.service';
import { ButtonComponent } from '@/shared/ui/button/button.component';
import { ToastService } from '@/shared/services/toast.service';

@Component({
  selector: 'profile-photo',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './profile-photo.component.html',
  styleUrl: './profile-photo.component.scss',
})
export class ProfilePhotoComponent {
  toast = inject(ToastService);

  preview = signal<string | null>(null);
  loading = signal(false);

  private file: File | null = null;

  user = inject(AuthService);

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;

    if (!input.files?.length) return;

    const file = input.files[0];

    if (!file.type.startsWith('image/')) {
      this.toast.error('Only images allowed');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      this.toast.error('Max size is 2MB');
      return;
    }

    this.file = file;

    const reader = new FileReader();
    reader.onload = () => {
      this.preview.set(reader.result as string);
    };
    reader.readAsDataURL(file);
  }

  upload() {
    if (!this.file) return;

    const formData = new FormData();
    formData.append('file', this.file);

    this.loading.set(true);
    this.user.upload(formData).subscribe({
      next: (res) => {
        this.loading.set(false);
        this.toast.success('Upload successful');
      },
      error: () => {
        this.loading.set(false);
        this.toast.error('Upload failed');
      },
    });
  }
}
