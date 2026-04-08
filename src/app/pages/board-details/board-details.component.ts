import { Component, computed, effect, inject, resource, signal } from '@angular/core';
import { BreadcrumbsComponent } from '@/shared/ui/breadcrumbs/breadcrumbs.component';
import { ERoute } from '@/shared/constants/routes';
import { ActivatedRoute, Router } from '@angular/router';
import { BoardService } from '@/shared/services/board.service';
import { ToastService } from '@/shared/services/toast.service';
import { Board } from '@/shared/types/board';
import { BreadCrumbItem } from '@/shared/types/ui';
import { InputComponent } from '@/shared/ui/input/input.component';
import { TextareaComponent } from '@/shared/ui/textarea/textarea.component';
import { ButtonComponent } from '@/shared/ui/button/button.component';
import { firstValueFrom } from 'rxjs';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { getError } from '@/shared/helpers/formErrors';
import { BoardDeleteModalComponent } from '@/features/board-delete-modal/board-delete-modal.component';

@Component({
  selector: 'board-details',
  imports: [
    BreadcrumbsComponent,
    InputComponent,
    TextareaComponent,
    ButtonComponent,
    ReactiveFormsModule,
    BoardDeleteModalComponent,
  ],
  templateUrl: './board-details.component.html',
})
export class BoardDetailsComponent {
  router = inject(Router);
  route = inject(ActivatedRoute);
  boardService = inject(BoardService);
  toast = inject(ToastService);
  fb = inject(NonNullableFormBuilder);

  form!: FormGroup<{
    name: FormControl<string>;
    description: FormControl<string>;
  }>;

  currentBoard = signal<Board | null>(null);

  submitTrigger = signal<null | { id: string; name: string; description: string }>(null);

  isModal = signal(false);

  updateBoardResource = resource({
    request: () => this.submitTrigger(),
    loader: async ({ request }) => {
      if (!request) return null;
      return await firstValueFrom(this.boardService.update(request));
    },
  });

  constructor() {
    effect(() => {
      const value = this.updateBoardResource.value();
      const error = this.updateBoardResource.error() as any;

      if (value) {
        this.toast.showSuccess('Board successfully updated');
        this.router.navigate([ERoute.BOARDS, value.id]);
      }

      if (error) {
        this.toast.showError(error.error.message ?? 'Unknown error');
      }
    });
  }

  ngOnInit() {
    this.form = this.fb.group({
      name: this.fb.control(this.currentBoard()?.name ?? '', [Validators.required]),
      description: this.fb.control(this.currentBoard()?.description ?? ''),
    });

    const boardId = this.route.snapshot.paramMap.get('id');
    if (!boardId) {
      this.router.navigateByUrl(ERoute.BOARDS);
      return;
    }

    const b = this.boardService.boards().find((b) => b.id === boardId);
    if (b) {
      this.currentBoard.set(b);
      this.form.patchValue({
        name: b.name,
        description: b.description,
      });
      return;
    }

    this.boardService.getOne(boardId).subscribe({
      next: (b) => {
        this.currentBoard.set(b);
        this.form.patchValue({
          name: b.name,
          description: b.description,
        });
      },
      error: (err) => {
        this.toast.showError(err.error.message);
        // this.isLoading.set(false);
      },
    });
  }

  handleSubmit() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload = {
      id: this.currentBoard()?.id ?? '',
      name: this.form.value.name ?? '',
      description: this.form.value.description ?? '',
    };
    this.submitTrigger.set(payload);
  }

  handleCancel() {
    this.router.navigate([ERoute.BOARDS, this.currentBoard()?.id ?? '']);
  }

  get nameError(): string | null {
    return getError(this.form.get('name'));
  }

  get isLoading(): boolean {
    return this.updateBoardResource.isLoading();
  }

  toggleDeleteModal() {
    this.isModal.update((v) => !v);
  }

  links = computed<BreadCrumbItem[]>(() => [
    {
      text: 'Boards',
      link: '/' + ERoute.BOARDS,
    },
    {
      text: this.currentBoard()?.name ?? '',
      link: '/' + ERoute.BOARDS + '/' + this.currentBoard()?.id,
    },
    {
      text: 'Details',
    },
  ]);
}
