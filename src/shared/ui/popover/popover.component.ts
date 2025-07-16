import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, OnDestroy } from '@angular/core';

@Component({
  selector: 'ui-popover',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnDestroy {
  open = false;

  private documentClickListener = this.handleDocumentClick.bind(this);

  constructor(private elRef: ElementRef) {}

  togglePopover() {
    if (this.open) {
      this.open = false;
      return;
    }

    this.open = true;
    document.addEventListener('click', this.documentClickListener);
  }

  private handleDocumentClick(event: MouseEvent) {
    const isClose = !this.elRef.nativeElement.contains(event.target);
    if (isClose) {
      this.closePopover();
    }
  }

  closePopover() {
    this.open = false;
    document.removeEventListener('click', this.documentClickListener);
  }

  @HostListener('document:keydown.escape', ['$event'])
  onEsc() {
    this.closePopover();
  }

  ngOnDestroy(): void {
    this.closePopover();
  }
}
