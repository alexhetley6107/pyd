import { BoardService } from '@/shared/services/board.service';
import { ToastService } from '@/shared/services/toast.service';
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { BreadcrumbsComponent } from '@/shared/ui/breadcrumbs/breadcrumbs.component';
import { ERoute } from '@/shared/constants/routes';

@Component({
  selector: 'create-board',
  imports: [RouterLink, BreadcrumbsComponent],
  templateUrl: './create-board.component.html',
  styleUrl: './create-board.component.scss',
})
export class CreateBoardComponent {
  router = inject(Router);
  toast = inject(ToastService);
  board = inject(BoardService);

  fb = inject(NonNullableFormBuilder);

  isLoading = signal(false);

  form!: FormGroup<{
    name: FormControl<string>;
    description: FormControl<string>;
  }>;

  ngOnInit(): void {
    this.form = this.fb.group({
      name: this.fb.control('New Board', [Validators.required]),
      description: this.fb.control('Some board description...', [Validators.required]),
    });
  }

  links = [
    {
      text: 'Boards',
      link: '/' + ERoute.BOARDS,
    },
    {
      text: 'Create New',
    },
  ];
}
