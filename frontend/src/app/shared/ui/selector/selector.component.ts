import { Nullable, SelectOption } from '@/shared/types';
import {
  Component,
  forwardRef,
  ElementRef,
  HostListener,
  booleanAttribute,
  ChangeDetectionStrategy,
  input,
  signal,
  computed,
  viewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IconComponent } from '../icon/icon.component';

type SelectorSize = 'sm' | 'lg';

@Component({
  selector: 'ui-selector',
  standalone: true,
  templateUrl: './selector.component.html',
  styleUrl: './selector.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.full_width]': 'fullWidth()',
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectorComponent),
      multi: true,
    },
  ],
  imports: [IconComponent],
})
export class SelectorComponent implements ControlValueAccessor {
  readonly placeholder = input('Select...');
  readonly options = input<SelectOption[]>([]);
  readonly size = input<SelectorSize>('lg');
  readonly fullWidth = input(false, { transform: booleanAttribute });

  readonly container = viewChild.required<ElementRef<HTMLDivElement>>('container');

  protected readonly value = signal<Nullable<string>>(null);
  protected readonly open = signal(false);

  protected readonly selectedLabel = computed(() => {
    const selected = this.options().find((o) => o.value === this.value());
    return selected?.value ? selected.label : this.placeholder();
  });

  private onChange: (value: Nullable<string>) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: Nullable<string>): void {
    this.value.set(value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  toggleOpen() {
    this.open.update((v) => !v);
  }

  close() {
    this.open.set(false);
    this.onTouched();
  }

  select(option: SelectOption) {
    if (this.value() !== option.value) {
      this.value.set(option.value);
      this.onChange(option.value);
    }
    this.close();
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (this.open() && !this.container().nativeElement.contains(target)) {
      this.close();
    }
  }

  @HostListener('keydown', ['$event'])
  onKeydown(event: KeyboardEvent) {
    if (!this.open()) {
      if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        this.open.set(true);
      }
    }
  }
}
