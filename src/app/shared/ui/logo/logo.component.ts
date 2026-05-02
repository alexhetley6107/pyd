import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

type SizeUnion = 'sm' | 'md' | 'lg';

@Component({
  selector: 'ui-logo',
  imports: [NgClass],
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogoComponent {
  @Input() size: SizeUnion = 'md';
}
