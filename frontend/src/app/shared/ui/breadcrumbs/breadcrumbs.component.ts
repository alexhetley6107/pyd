import { BreadCrumbItem } from '@/shared/types';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SkeletonComponent } from '../skeleton/skeleton.component';

@Component({
  selector: 'ui-breadcrumbs',
  imports: [RouterLink, SkeletonComponent],
  templateUrl: './breadcrumbs.component.html',
  styleUrl: './breadcrumbs.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbsComponent {
  readonly links = input<BreadCrumbItem[]>([]);
  readonly loading = input(false);
}
