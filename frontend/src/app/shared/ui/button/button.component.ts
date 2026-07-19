import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';

type ButtonVariant = 'filled' | 'outlined';
type ButtonType = 'button' | 'submit';
type ButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'ui-button',
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.full_width]': 'fullWidth()',
  },
})
export class ButtonComponent {
  readonly fullWidth = input(false, { transform: booleanAttribute });
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly loading = input(false, { transform: booleanAttribute });

  readonly variant = input<ButtonVariant>('filled');
  readonly type = input<ButtonType>('button');
  readonly size = input<ButtonSize>('md');

  readonly onClick = output<void>();

  handleClick() {
    this.onClick.emit();
  }
}
