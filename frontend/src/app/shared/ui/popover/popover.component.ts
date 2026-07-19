import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  inject,
  input,
  OnDestroy,
  signal,
} from '@angular/core';

type PopoverType = 'popover' | 'select' | 'tooltip';

@Component({
  selector: 'ui-popover',
  standalone: true,
  imports: [],
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopoverComponent implements OnDestroy {
  readonly type = input<PopoverType>('popover');

  protected readonly open = signal(false);

  private readonly elRef = inject(ElementRef);
  private documentClickListener = this.handleDocumentClick.bind(this);

  togglePopover() {
    if (this.open()) {
      this.open.set(false);
      return;
    }

    this.open.set(true);
    document.addEventListener('click', this.documentClickListener);
  }

  private handleDocumentClick(event: MouseEvent) {
    const isClose = !this.elRef.nativeElement.contains(event.target);
    if (isClose) {
      this.closePopover();
    }
  }

  closePopover() {
    this.open.set(false);
    document.removeEventListener('click', this.documentClickListener);
  }

  @HostListener('document:keydown.escape')
  onEsc() {
    this.closePopover();
  }

  ngOnDestroy(): void {
    this.closePopover();
  }
}
