import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { ButtonComponent } from '@/shared/ui/button/button.component';
import { ToastService } from '@/shared/services/toast.service';
import { UserService } from '@/entities/user/service/user.service';
import { Nullable } from '@/shared/types';

@Component({
  selector: 'profile-photo',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './profile-photo.component.html',
  styleUrl: './profile-photo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfilePhotoComponent {
  toast = inject(ToastService);
  user = inject(UserService);

  preview = signal<Nullable<string>>(null);
  loading = signal(false);

  private file: Nullable<File> = null;

  fileInput = viewChild<ElementRef<HTMLInputElement>>('fileInput');

  constructor() {
    effect(() => {
      this.preview.set(this.user.user()?.photo ?? null);
    });
  }

  isOriginalImage = computed(() => this.preview() === this.user.user()?.photo);

  openFilePicker() {
    this.fileInput()?.nativeElement.click();
  }

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
    this.user.uploadPhoto(formData).subscribe({
      next: () => {
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
