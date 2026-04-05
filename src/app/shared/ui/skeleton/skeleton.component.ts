import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'ui-skeleton',
  templateUrl: './skeleton.component.html',
  styleUrl: './skeleton.component.scss',
})
export class SkeletonComponent {
  @Input() @HostBinding('style.border-radius') radius = '5px';
  @Input() @HostBinding('style.width') width = '100%';
  @Input() @HostBinding('style.height') height = '20px';
}
