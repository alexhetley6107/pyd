import { Component, HostBinding, Input } from '@angular/core';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'ui-skeleton',
  imports: [NgStyle],
  templateUrl: './skeleton.component.html',
  styleUrl: './skeleton.component.scss',
})
export class SkeletonComponent {
  @Input() borderRadius = '4px';
  @Input() @HostBinding('style.width') width = '100%';
  @Input() @HostBinding('style.height') height = '20px';
}
