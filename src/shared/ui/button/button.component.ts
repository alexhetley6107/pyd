import { NgClass } from '@angular/common';
import { booleanAttribute, Component, EventEmitter, Input, Output } from '@angular/core';

type ButtonVariant = 'filled' | 'outlined';
type ButtonType = 'button' | 'submit';

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
  @Input() loading: boolean = false;

  @Input() variant: ButtonVariant = 'filled';
  @Input() type: ButtonType = 'button';

  @Output() onClick = new EventEmitter<void>();

  handleClick() {
    this.onClick.emit();
  }
}
