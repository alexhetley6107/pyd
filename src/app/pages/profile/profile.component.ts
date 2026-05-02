import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProfilePhotoComponent } from '@/features/profile-photo/profile-photo.component';

@Component({
  selector: 'profile',
  imports: [ProfilePhotoComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent {}
