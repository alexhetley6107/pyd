import { ButtonComponent } from '@/shared/ui/button/button.component';
import { InputComponent } from '@/shared/ui/input/input.component';
import { ModalComponent } from '@/shared/ui/modal/modal.component';
import { booleanAttribute, Component, EventEmitter, Input, Output } from '@angular/core';

type BoardModalVariant = 'create' | 'edit';

@Component({
  selector: 'board-modal',
  imports: [ModalComponent, InputComponent, ButtonComponent],
  templateUrl: './board-modal.component.html',
  styleUrl: './board-modal.component.scss',
})
export class BoardModalComponent {
  @Input({ transform: booleanAttribute }) open: boolean = false;
  @Input() variant: BoardModalVariant = 'create';

  @Output() closeModal = new EventEmitter<void>();

  onCloseModal() {
    this.closeModal.emit();
  }

  get title(): string {
    return this.variant === 'create' ? 'Create board' : 'Edit board';
  }
}
