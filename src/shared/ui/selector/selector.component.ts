import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  forwardRef,
  ElementRef,
  HostListener,
  ViewChild,
  ChangeDetectorRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export interface SelectOption {
  label: string;
  value: string | number;
}

@Component({
  selector: 'ui-selector',
  standalone: true,
  templateUrl: './selector.component.html',
  styleUrl: './selector.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectorComponent),
      multi: true,
    },
  ],
  imports: [CommonModule],
})
export class SelectorComponent implements ControlValueAccessor {
  @Input() placeholder = 'Select...';
  @Input() options: SelectOption[] = [];

  @ViewChild('container', { static: true }) container!: ElementRef<HTMLDivElement>;

  value: string | number | null = null;
  open = false;

  onChange: (value: string | number | null) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(value: string | number | null): void {
    this.value = value;
    this.cd.detectChanges();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  toggleOpen() {
    this.open = !this.open;
  }

  close() {
    this.open = false;
    this.onTouched();
  }

  select(option: SelectOption) {
    if (this.value !== option.value) {
      this.value = option.value;
      this.onChange(this.value);
    }
    this.close();
  }

  get selectedLabel(): string {
    const selected = this.options.find((o) => o.value === this.value);
    return selected ? selected.label : '';
  }

  @HostListener('document:click', ['$event.target'])
  onClickOutside(target: HTMLElement) {
    if (this.open && !this.container.nativeElement.contains(target)) {
      this.close();
    }
  }

  @HostListener('keydown', ['$event'])
  onKeydown(event: KeyboardEvent) {
    if (!this.open) {
      if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        this.open = true;
      }
    }
  }

  constructor(private cd: ChangeDetectorRef) {}
}
