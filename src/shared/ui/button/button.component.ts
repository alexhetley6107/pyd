import { NgClass } from '@angular/common';
import { booleanAttribute, Component, Input } from '@angular/core';

@Component({
  selector: 'ui-button',
  imports: [NgClass],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  @Input({ transform: booleanAttribute }) fullWidth: boolean = false;
  @Input({ transform: booleanAttribute }) disabled: boolean = false;

  toggle() {
    console.log(this.fullWidth);
  }
}
