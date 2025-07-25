import { ButtonComponent } from '@/shared/ui/button/button.component';
import { InputComponent } from '@/shared/ui/input/input.component';
import { ModalComponent } from '@/shared/ui/modal/modal.component';
import { Component } from '@angular/core';

@Component({
  selector: 'boards-selector',
  imports: [ButtonComponent, InputComponent, ModalComponent],
  templateUrl: './boards-selector.component.html',
  styleUrl: './boards-selector.component.scss',
})
export class BoardsSelectorComponent {
  isAddModal = false;

  toggleAddModal() {
    this.isAddModal = !this.isAddModal;
  }
}
