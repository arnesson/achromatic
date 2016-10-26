import { Directive, ElementRef, OnInit, OnDestroy } from '@angular/core';

import IScroll = require('./iscroll');

@Directive({
  selector: '[scroll]'
})
export class ScrollDirective implements OnInit, OnDestroy {
  private iscroll: IScroll;

  constructor(private elementRef: ElementRef) {}

  public refresh() {
    if (this.iscroll) {
      this.iscroll.refresh();
    }
  }

  public scrollTo(x: number, y: number, time?: number) {
    if (this.iscroll) {
      this.iscroll.scrollTo(x, y, time);
    }
  }

  public scrollToTop(time?: number) {
    if (this.iscroll) {
      this.iscroll.scrollTo(0, 0, time);
    }
  }

  public scrollToBottom(time?: number) {
    if (this.iscroll) {
      this.iscroll.scrollTo(0, this.iscroll.maxScrollY, time);
    }
  }

  ngOnInit() {
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

  ngOnDestroy() {
    if (this.iscroll) {
      this.iscroll.destroy();
    }
    this.iscroll = null;
  }
}
