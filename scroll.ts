import { Directive, ElementRef, NgZone, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';

@Directive({
  selector: '[scroll]'
})
export class ScrollDirective implements OnDestroy {
  private lock: boolean = false;
  private destroy: any;

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

  public scroll: Observable<any> = Observable.create((observer: any) => {
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
    this.elementRef.nativeElement.addEventListener('scroll', fn, {passive: true});
    this.destroy = () => {
      this.elementRef.nativeElement.removeEventListener('scroll', fn, {passive: true});
    };
    return this.destroy;
  }).share();

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
    this.elementRef.nativeElement.scrollLeft = x;
    this.elementRef.nativeElement.scrollTop = y;
  }

  public top() {
    this.elementRef.nativeElement.scrollTop = 0;
  }

  public bottom() {
    this.elementRef.nativeElement.scrollTop = this.max_y();
  }

  ngOnDestroy() {
    if (this.destroy) {
      this.destroy();
    }
  }
}
