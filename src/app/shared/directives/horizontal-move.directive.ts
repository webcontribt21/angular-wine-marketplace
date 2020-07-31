import {
  Directive,
  ElementRef,
  Input,
  HostListener,
  Output,
  EventEmitter
} from '@angular/core';

@Directive({
  selector: "[appHorizontalMove]"
})
export class HorizontalMoveDirective {
  @Input() visible: boolean;
  @Input() throttleTime = 50;
  @Output() move  = new EventEmitter<boolean>();

  private isMoveable: boolean;
  private isEnableCall: boolean;
  private isEmitMoveEvent: boolean;
  private firstX: number;
  private lastX: number;
  private element: HTMLElement;

  @HostListener('document:mouseup', [])
  onMouseup() {
    this.move.emit(false);
    this.isMoveable = false;
    this.isEmitMoveEvent = false;
  }

  @HostListener('mousedown', ['$event'])
  onMousedown(event: MouseEvent) {
    if (this.visible) {
      this.isMoveable = true;
      this.firstX = event.clientX;
    }

    return false; // Call preventDefault() on the event
  }

  @HostListener('document:mousemove', ['$event'])
  onMousemove(event: MouseEvent) {
    if (this.isMoveable) {
      if (!this.isEnableCall && this.throttleTime > 0) return;


      if (!this.isEmitMoveEvent) {
        this.move.emit(true);
        this.isEmitMoveEvent = true;
      }

      this.isEnableCall = false;
      this.lastX = event.clientX;
      this.moveElement();
      if (this.throttleTime > 0) {
        setTimeout(() => this.isEnableCall = true, this.throttleTime);
      }
    }
    return false;
  }

  constructor( elementRef: ElementRef ) {
    this.element = elementRef.nativeElement;
    this.isMoveable = false;
    this.isEnableCall = true;
    this.isEmitMoveEvent = false;
    this.firstX = 0;
    this.lastX = 0;
  }

  private moveElement() {
    const deltaX = this.firstX - this.lastX;

    if ((deltaX < 0 && this.element.scrollLeft > 0) ||
      (deltaX > 0) && (this.element.scrollLeft < (this.element.scrollWidth - this.element.clientWidth))
    ) {
      event.stopPropagation();
      event.preventDefault();
      this.element.scrollLeft += deltaX;
    }

    this.firstX = this.lastX;
  }
}
