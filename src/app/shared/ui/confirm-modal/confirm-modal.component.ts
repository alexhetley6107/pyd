import { booleanAttribute, Component, EventEmitter, Input, Output } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'confirm-modal',
  imports: [ModalComponent, ButtonComponent],
  templateUrl: './confirm-modal.component.html',
  styleUrl: './confirm-modal.component.scss',
})
export class ConfirmModalComponent {
  @Input({ transform: booleanAttribute }) open: boolean = false;
  @Input({ transform: booleanAttribute }) isLoading: boolean = false;

  @Input() title: string = 'Are you sure?';

  @Output() closeModal = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<void>();

  onCloseModal() {
    this.closeModal.emit();
  }

  onConfirm() {
    this.confirm.emit();
  }
}
