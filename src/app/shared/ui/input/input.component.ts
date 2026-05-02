import { Nullable } from '@/shared/types';
import { CommonModule } from '@angular/common';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  HostBinding,
  Input,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IconComponent } from '../icon/icon.component';

type InputTypeUnion = 'text' | 'email' | 'password';
type InputSize = 'sm' | 'lg';
type InputVariant = 'outlined' | 'underlined';

@Component({
  selector: 'ui-input',
  imports: [CommonModule, IconComponent],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor {
  @Input() type: InputTypeUnion = 'text';
  @Input() placeholder: string = '';
  @Input() error: Nullable<string> = null;
  @Input() size: InputSize = 'lg';
  @Input({ transform: booleanAttribute }) @HostBinding('class.full_width') fullWidth: boolean =
    false;
  @Input() variant: InputVariant = 'outlined';

  isPasswordVisible = false;
  value: string = '';

  togglePassword(event: MouseEvent) {
    event.preventDefault();
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  onChange: (value: string) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(value: string): void {
    this.value = value || '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  handleInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    this.onChange(this.value);
  }

  handleBlur(): void {
    this.value = this.value.trim();
    this.onChange(this.value);
    this.onTouched();
  }
}
