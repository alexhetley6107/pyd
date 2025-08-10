import { SelectOption } from '@/shared/types/ui';
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

  value: string | null = null;
  open = false;

  onChange: (value: string | null) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(value: string | null): void {
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
    return selected?.value ? selected.label : this.placeholder;
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
