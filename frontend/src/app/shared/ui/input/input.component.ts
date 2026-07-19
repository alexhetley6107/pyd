import { Nullable } from '@/shared/types';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  input,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IconComponent } from '../icon/icon.component';

type InputTypeUnion = 'text' | 'email' | 'password';
type InputSize = 'sm' | 'lg';
type InputVariant = 'outlined' | 'underlined';

@Component({
  selector: 'ui-input',
  imports: [IconComponent],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.full_width]': 'fullWidth()',
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor {
  readonly type = input<InputTypeUnion>('text');
  readonly placeholder = input('');
  readonly error = input<Nullable<string>>(null);
  readonly size = input<InputSize>('lg');
  readonly fullWidth = input(false, { transform: booleanAttribute });
  readonly variant = input<InputVariant>('outlined');

  protected readonly isPasswordVisible = signal(false);
  protected readonly value = signal('');

  togglePassword(event: MouseEvent) {
    event.preventDefault();
    this.isPasswordVisible.update((v) => !v);
  }

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: string): void {
    this.value.set(value || '');
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  handleInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.value.set(input.value);
    this.onChange(input.value);
  }

  handleBlur(): void {
    const trimmed = this.value().trim();
    this.value.set(trimmed);
    this.onChange(trimmed);
    this.onTouched();
  }
}
