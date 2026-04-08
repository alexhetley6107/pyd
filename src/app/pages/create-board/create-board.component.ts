import { BoardService } from '@/shared/services/board.service';
import { ToastService } from '@/shared/services/toast.service';
import { Component, effect, inject, resource, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { BreadcrumbsComponent } from '@/shared/ui/breadcrumbs/breadcrumbs.component';
import { ERoute } from '@/shared/constants/routes';
import { InputComponent } from '@/shared/ui/input/input.component';
import { TextareaComponent } from '@/shared/ui/textarea/textarea.component';
import { ButtonComponent } from '@/shared/ui/button/button.component';
import { getError } from '@/shared/helpers/formErrors';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'create-board',
  imports: [
    BreadcrumbsComponent,
    InputComponent,
    TextareaComponent,
    ButtonComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './create-board.component.html',
})
export class CreateBoardComponent {
  router = inject(Router);
  toast = inject(ToastService);
  boardService = inject(BoardService);
  fb = inject(NonNullableFormBuilder);

  form!: FormGroup<{
    name: FormControl<string>;
    description: FormControl<string>;
  }>;

  submitTrigger = signal<null | { name: string; description: string }>(null);

  createBoardResource = resource({
    request: () => this.submitTrigger(),
    loader: async ({ request }) => {
      if (!request) return null;
      return await firstValueFrom(this.boardService.create(request));
    },
  });

  constructor() {
    effect(() => {
      const value = this.createBoardResource.value();
      const error = this.createBoardResource.error() as any;

      if (value) {
        this.toast.showSuccess('Board successfully created');
        this.router.navigate([ERoute.BOARDS, value.id]);
      }

      if (error) {
        this.toast.showError(error.error.message ?? 'Unknown error');
      }
    });
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: this.fb.control('New Board', [Validators.required]),
      description: this.fb.control('Some board description...'),
    });
  }

  handleSubmit() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload = {
      name: this.form.value.name ?? '',
      description: this.form.value.description ?? '',
    };
    this.submitTrigger.set(payload);
  }

  get nameError(): string | null {
    return getError(this.form.get('name'));
  }

  get isLoading(): boolean {
    return this.createBoardResource.isLoading();
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
