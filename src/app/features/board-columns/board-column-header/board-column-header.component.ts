import { ERoute } from '@/shared/constants/routes';
import { Component, inject, input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'board-column-header',
  imports: [],
  templateUrl: './board-column-header.component.html',
  styleUrl: './board-column-header.component.scss',
})
export class BoardColumnHeaderComponent {
  route = inject(ActivatedRoute);
  router = inject(Router);

  name = input('');

  createTask(status: string) {
    const boardId = this.route.snapshot.paramMap.get('boardId');

    this.router.navigate([ERoute.CREATE_TASK], {
      queryParams: { boardId, status },
    });
  }
}
