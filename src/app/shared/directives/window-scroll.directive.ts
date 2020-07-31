import { Directive, OnInit, OnDestroy, HostListener } from '@angular/core';

@Directive({
  selector: '[appWindowScroll]'
})
export class WindowScrollDirective implements OnInit, OnDestroy {
  @HostListener('scroll', ['$event.target'])
  public onScroll(elem) {
  }

  constructor() { }

  ngOnInit() {
    // window.addEventListener('scroll', this.scrollEvent, true);
  }

  ngOnDestroy() {
    // window.removeEventListener('scroll', this.scrollEvent, true);
  }

  scrollEvent = (event: any): void => {
    const number = event.srcElement.scrollTop;
    console.log(event)
    console.log('focusing: ', number)
  }

}
