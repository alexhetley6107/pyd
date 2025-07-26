import { ButtonComponent } from '@/shared/ui/button/button.component';
import { Component } from '@angular/core';
import { BoardModalComponent } from '../board-modal/board-modal.component';

@Component({
  selector: 'board-manager',
  imports: [ButtonComponent, BoardModalComponent],
  templateUrl: './board-manager.component.html',
  styleUrl: './board-manager.component.scss',
})
export class BoardManagerComponent {
  isAddModal = false;

  toggleAddModal() {
    this.isAddModal = !this.isAddModal;
  }
}
