import {
  Directive,
  ElementRef,
  NgZone,
  OnInit,
  OnDestroy,
  Input
} from '@angular/core';

@Directive({
  selector: "[appHorizontalScroll]"
})
export class HorizontalScrollDirective implements OnInit, OnDestroy {
  @Input() appHorizontalScroll: boolean;

  private element: HTMLElement;
  private zone: NgZone;

  // I initialize the trap-scroll directive.
  constructor( elementRef: ElementRef, zone: NgZone ) {
    this.element = elementRef.nativeElement;
    this.zone = zone;
  }

  // I get called once when the directive is being unmounted.
  public ngOnDestroy() : void {
    if (this.appHorizontalScroll) {
      this.element.removeEventListener( "wheel", this.handleEvent, false );
    }
  }

  // I get called once after the inputs have been bound for the first time.
  public ngOnInit() : void {
    // Normally, we would add event handlers like this in the host bindings. However,
    // if we use the Angular event bindings, they will be run inside of the Angular
    // Zone.js instance. Which means that Angular will trigger a change-detection
    // digest FOR EVERY WHEEL EVENT (even if we try to detach this directive's change
    // detection reference). As such, we need to fall back to the DOM-native event
    // binding AND run them OUTSIDE OF THE ANGULAR ZONE. This way, Angular won't try
    // to trigger any change detection when our event-handlers are called.
    this.zone.runOutsideAngular(
      () : void => {
        // NOTE: All modern browsers support "wheel". As such, we'll apply this
        // as a progressive enhancement and not worry about older browsers.
        if (this.appHorizontalScroll) {
          this.element.addEventListener( "wheel", this.handleEvent, false );
        }
      }
    );
  }

  private handleEvent = ( event: WheelEvent ) : void => {
    if ((event.deltaY < 0 && this.element.scrollLeft > 0) ||
      (event.deltaY > 0) && (this.element.scrollLeft < (this.element.scrollWidth - this.element.clientWidth))
    ) {
      event.stopPropagation();
      event.preventDefault();
      this.element.scrollLeft += event.deltaY;
    }
  }
}
