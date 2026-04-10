import { BreadCrumbItem } from '@/shared/types';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SkeletonComponent } from '../skeleton/skeleton.component';

@Component({
  selector: 'ui-breadcrumbs',
  imports: [RouterLink, SkeletonComponent],
  templateUrl: './breadcrumbs.component.html',
  styleUrl: './breadcrumbs.component.scss',
})
export class BreadcrumbsComponent {
  links = input<BreadCrumbItem[]>([]);
  loading = input(false);
}
