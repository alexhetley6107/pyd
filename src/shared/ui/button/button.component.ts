import { NgClass } from '@angular/common';
import { booleanAttribute, Component, Input } from '@angular/core';

type ButtonVariant = 'filled' | 'outlined';
@Component({
  selector: 'ui-button',
  imports: [NgClass],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  standalone: true,
})
export class ButtonComponent {
  @Input({ transform: booleanAttribute }) fullWidth: boolean = false;
  @Input({ transform: booleanAttribute }) disabled: boolean = false;
  @Input() onClick!: () => void;
  @Input() type: ButtonVariant = 'filled';
}
