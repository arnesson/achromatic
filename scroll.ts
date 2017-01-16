import { Directive, ElementRef, OnDestroy } from '@angular/core';

import { IScroll } from './iscroll';

@Directive({
  selector: '[scroll]'
})
export class ScrollDirective implements OnDestroy {
  private iscroll: IScroll;

  constructor(private elementRef: ElementRef) {
    this.iscroll = new IScroll(this.elementRef.nativeElement, this.elementRef.nativeElement.parentNode, {
      scrollX: false,
      scrollY: true,
      freeScroll: false,
      eventPassthrough: 'horizontal',
      momentum: true,
      scrollbars: true,
      mouseWheel: true,
      fadeScrollbars: true
    });
  }

  public x(): number {
    return this.iscroll && this.iscroll.x;
  }
  public y(): number {
    return this.iscroll && this.iscroll.y;
  }
  public maxScrollX(): number {
    return this.iscroll && this.iscroll.maxScrollX;
  }
  public maxScrollY(): number {
    return this.iscroll && this.iscroll.maxScrollY;
  }

  public refresh() {
    if (this.iscroll) {
      (<any>window).setTimeout(() => {
        if (this.iscroll) {
          this.iscroll.refresh();
        }
      }, 1);
    }
  }

  public scrollTo(x: number, y: number, time?: number) {
    if (this.iscroll) {
      (<any>window).setTimeout(() => {
        if (this.iscroll) {
          this.iscroll.scrollTo(x, y, time);
        }
      }, 1);
    }
  }

  public scrollToTop(time?: number) {
    if (this.iscroll) {
      (<any>window).setTimeout(() => {
        if (this.iscroll) {
          this.iscroll.scrollTo(0, 0, time);
        }
      }, 1);
    }
  }

  public scrollToBottom(time?: number) {
    if (this.iscroll) {
      (<any>window).setTimeout(() => {
        if (this.iscroll) {
          this.iscroll.scrollTo(0, this.iscroll.maxScrollY, time);
        }
      }, 1);
    }
  }

  public on(event: string, fn: (scroller: IScroll) => void) {
    if (this.iscroll) {
      if (this.iscroll) {
        this.iscroll.on(event, function() {
          fn(this);
        });
      }
    }
  }

  ngOnDestroy() {
    if (this.iscroll) {
      this.iscroll.destroy();
    }
    this.iscroll = null;
  }
}
