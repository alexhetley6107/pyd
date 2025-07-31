import { Component, Input } from '@angular/core';
import { NgIf, NgStyle } from '@angular/common';

@Component({
  selector: 'ui-skeleton',
  imports: [NgStyle],
  templateUrl: './skeleton.component.html',
  styleUrl: './skeleton.component.scss',
})
export class SkeletonComponent {
  @Input() width = '100%';
  @Input() height = '20px';
  @Input() borderRadius = '4px';
}
