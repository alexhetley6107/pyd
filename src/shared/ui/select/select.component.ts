import { SelectOption } from '@/shared/types/ui';
import { booleanAttribute, Component, Input } from '@angular/core';
import { PopoverComponent } from '../popover/popover.component';
import { NgClass } from '@angular/common';

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

  @Input({ transform: booleanAttribute }) withSearch: boolean = false;

  open = false;
  search = '';

  toggleSelect() {
    this.open = !this.open;
  }

  changeSearch(value: string) {
    this.search = value;
  }

  ngOnChanges() {
    console.log(this.options);
  }
}
