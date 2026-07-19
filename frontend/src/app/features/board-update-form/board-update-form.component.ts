import { ERoute } from '@/shared/constants/routes';
import { getError } from '@/shared/helpers/formErrors';
import { BoardService } from '@/entities/board/service/board.service';
import { ToastService } from '@/shared/services/toast.service';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
  resource,
  signal,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { InputComponent } from '@/shared/ui/input/input.component';
import { TextareaComponent } from '@/shared/ui/textarea/textarea.component';
import { ButtonComponent } from '@/shared/ui/button/button.component';
import { Board } from '@/entities/board/model';
import { Nullable } from '@/shared/types';

@Component({
  selector: 'board-update-form',
  imports: [InputComponent, TextareaComponent, ButtonComponent, ReactiveFormsModule],
  templateUrl: './board-update-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardUpdateFormComponent {
  router = inject(Router);
  boardService = inject(BoardService);
  toast = inject(ToastService);
  fb = inject(NonNullableFormBuilder);

  currentBoard = input<Nullable<Board>>();

  form!: FormGroup<{
    name: FormControl<string>;
    description: FormControl<string>;
  }>;

  submitTrigger = signal<null | { id: string; name: string; description: string }>(null);

  updateBoardResource = resource({
    request: () => this.submitTrigger(),
    loader: async ({ request }) => {
      if (!request) return null;
      return await firstValueFrom(this.boardService.update(request));
    },
  });

  constructor() {
    effect(() => {
      this.form = this.fb.group({
        name: this.fb.control(this.currentBoard()?.name ?? '', [Validators.required]),
        description: this.fb.control(this.currentBoard()?.description ?? ''),
      });
    });
    effect(() => {
      const value = this.updateBoardResource.value();
      const error = this.updateBoardResource.error() as any;

      if (value) {
        this.toast.success('Board successfully updated');
        this.router.navigate([ERoute.BOARDS, value.id]);
      }

      if (error) {
        this.toast.error(error.error.message ?? 'Unknown error');
      }
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

  get nameError(): Nullable<string> {
    return getError(this.form.get('name'));
  }

  get isLoading(): boolean {
    return this.updateBoardResource.isLoading();
  }
}
