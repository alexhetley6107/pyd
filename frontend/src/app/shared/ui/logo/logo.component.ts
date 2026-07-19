import { ChangeDetectionStrategy, Component, input } from '@angular/core';

type SizeUnion = 'sm' | 'md' | 'lg';

@Component({
  selector: 'ui-logo',
  imports: [],
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogoComponent {
  readonly size = input<SizeUnion>('md');
}
