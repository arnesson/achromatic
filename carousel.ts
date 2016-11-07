import { Component, ElementRef, OnInit, OnDestroy } from '@angular/core';

import { IScroll } from './iscroll';

@Component({
  selector: 'carousel',
  template: `
    <ng-content class="scroller"></ng-content>
    <div class="pagination"></div>
  `
})
export class CarouselComponent implements OnInit, OnDestroy {
  private iscroll: IScroll;

  constructor(private elementRef: ElementRef) {}

  pagination(create?: boolean) {
      let el = this.elementRef.nativeElement.querySelector(".pagination");
      let i = 0;

      if (create) {
          el.style.position = 'absolute';
          el.style.width = '100%';
          el.style.bottom = '10px';
          el.style.textAlign = 'center';

          for (i = 0; i < this.iscroll.pages.length; i++) {
              var span = document.createElement("span");
              span.style.width = '8px';
              span.style.height = '8px';
              span.style.display = 'inline-block';
              span.style.margin = '5px';
              span.style.borderRadius = '100%';
              span.style.background = "#000";
              span.style.opacity = "0.2";

              el.appendChild(span);
          }
      }

      for (i = 0; i < el.childNodes.length; i++) {
          if (this.iscroll.currentPage.pageX === i) {
              el.childNodes[i].style.opacity = 1;
              el.childNodes[i].style.background = "#fff";
          } else if (el.childNodes[i].style.opacity !== 0.2) {
              el.childNodes[i].style.opacity = 0.2;
              el.childNodes[i].style.background = "#000";
          }
      }
  };

  ngOnInit() {
    let el = this.elementRef.nativeElement.querySelector(".scroller");

    (<any>Object).assign(this.elementRef.nativeElement.style, {
      height: '100%',
      width: '100%',
      display: 'block'
    });

    let width: number = 0;

    for (let i = 0; i < el.childNodes.length; i++) {
        el.childNodes[i].style.float = "left";
        width += el.childNodes[i].offsetWidth;
    }

    (<any>Object).assign(el.style, {
      position: 'absolute',
      height: '100%',
      width: `${width}px`
    });

    this.iscroll = new IScroll(el, this.elementRef.nativeElement, {
      scrollX: true,
      scrollY: false,
      freeScroll: false,
      momentum: false,
      snap: true,
      snapSpeed: 500,
      bounce: false
    });

    this.iscroll.on('scrollEnd', this.pagination);
    this.pagination(true);
  }

  ngOnDestroy() {
    this.iscroll.destroy();
    this.iscroll = null;
  }
}
