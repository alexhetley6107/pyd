import { booleanAttribute, ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'confirm-modal',
  imports: [ModalComponent, ButtonComponent],
  templateUrl: './confirm-modal.component.html',
  styleUrl: './confirm-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmModalComponent {
  readonly open = input(false, { transform: booleanAttribute });
  readonly isLoading = input(false, { transform: booleanAttribute });

  readonly title = input('Are you sure?');

  readonly closeModal = output<void>();
  readonly confirm = output<void>();

  onCloseModal() {
    this.closeModal.emit();
  }

  onConfirm() {
    this.confirm.emit();
  }
}
