import { Directive, ElementRef, NgZone } from '@angular/core';

import { Observable } from 'rxjs/Observable';

@Directive({
  selector: '[scroll]'
})
export class ScrollDirective {
  private lock: boolean = false;

  constructor(
    private elementRef: ElementRef,
    private zone: NgZone
  ) {
    (<any>Object).assign(this.elementRef.nativeElement.style, {
        overflowY: 'auto',
        overflowX: 'hidden',
        webkitOverflowScrolling: 'touch',
        willChange: 'scroll-position',
        contain: 'size style layout'
    });
  }

  scroll: Observable<any> = Observable.create((observer: any) => {
    let fn = (emit: any) => {
      if (!this.lock) {
        this.lock = true;
        this.zone.run(() => {
          observer.next({
            x: this.x(),
            y: this.y(),
            max_x: this.max_x(),
            max_y: this.max_y()
          });
          this.lock = false;
        });
      }
    };
    this.elementRef.nativeElement.addEventListener('scroll', fn, false);
    return () => {
      this.elementRef.nativeElement.removeEventListener('scroll', fn, false);
    };
  });

  public x(): number {
    return this.elementRef.nativeElement.scrollLeft;
  }
  public y(): number {
    return this.elementRef.nativeElement.scrollTop;
  }
  public max_x(): number {
    return this.elementRef.nativeElement.scrollWidth - this.elementRef.nativeElement.clientWidth;
  }
  public max_y(): number {
    return this.elementRef.nativeElement.scrollHeight - this.elementRef.nativeElement.clientHeight;
  }

  public to(x: number, y: number) {
    this.elementRef.nativeElement.scrollTo(x, y);
  }

  public top() {
    this.elementRef.nativeElement.scrollTo(this.x(), 0);
  }

  public bottom() {
    this.elementRef.nativeElement.scrollTo(this.x(), this.max_y());
  }
}
