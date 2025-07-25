import { NgClass } from '@angular/common';
import { booleanAttribute, Component, EventEmitter, Input, Output } from '@angular/core';

type ButtonVariant = 'filled' | 'outlined';
type ButtonType = 'button' | 'submit';
type ButtonSize = 'sm' | 'md' | 'lg';

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
  @Input({ transform: booleanAttribute }) loading: boolean = false;

  @Input() variant: ButtonVariant = 'filled';
  @Input() type: ButtonType = 'button';
  @Input() size: ButtonSize = 'md';

  @Output() onClick = new EventEmitter<void>();

  handleClick() {
    this.onClick.emit();
  }
}
