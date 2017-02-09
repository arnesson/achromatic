import { Directive, ElementRef, OnDestroy } from '@angular/core';

@Directive({
  selector: '[scroll]'
})
export class ScrollDirective implements OnDestroy {
  constructor(private elementRef: ElementRef) {
    (<any>Object).assign(this.elementRef.nativeElement.style, {
        overflowY: 'auto',
        overflowX: 'hidden',
        webkitOverflowScrolling: 'touch',
        willChange: 'scroll-position',
        contain: 'size style layout'
    });
  }

  ngOnDestroy() {
    
  }
}
