import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'ui-icon',
  imports: [MatIconModule],
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss',
})
export class IconComponent {
  name = input.required<string>();
  size = input(20);
  color = input('var(--text-color)');
}
