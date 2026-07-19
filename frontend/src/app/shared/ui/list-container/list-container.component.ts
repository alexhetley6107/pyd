import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ui-list-container',
  imports: [],
  templateUrl: './list-container.component.html',
  styleUrl: './list-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListContainerComponent {}
