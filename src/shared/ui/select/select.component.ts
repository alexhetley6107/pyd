import { SelectOption } from '@/shared/types/ui';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PopoverComponent } from '../popover/popover.component';
import { NgClass } from '@angular/common';

type ArrowPlacement = 'left' | 'right';

@Component({
  selector: 'ui-select',
  imports: [PopoverComponent, NgClass],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
})
export class SelectComponent {
  @Input() options: SelectOption[] = [];
  @Input() selected: SelectOption | null = null;
  @Input() placeholder: string = '';
  @Input() arrowPlacement: ArrowPlacement = 'right';

  @Output() onSelect = new EventEmitter<string | null>();

  handleSelect(id: string | null) {
    this.onSelect.emit(id);
  }
}
