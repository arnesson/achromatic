import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'loading',
  template: `
    <div class="spacer" style="position:absolute;bottom:0;left:0;right:0;">
      <div class="icon"></div>
    </div>
  `
})
export class LoadingComponent {
    constructor(private elementRef: ElementRef) {
        loadingComponent = this;
    }

    ngOnInit() {
        (<any>Object).assign(this.elementRef.nativeElement.style, {
            visibility: 'hidden',
            opacity: '0',
            position: 'absolute',
            top: '0',
            bottom: '0',
            left: '0',
            right: '0',
            zIndex: '100',
            background: 'rgba(0, 0, 0, 0.6)'
        });
    }

    public show(): void {
        (<any>Object).assign(this.elementRef.nativeElement.style, {
            webkitTransition: 'opacity .3s, visibility .3s',
            transition: 'opacity .3s, visibility .3s',
            opacity: '1', 
            visibility: 'visible'
        });
    }
    public hide(): void {
        (<any>Object).assign(this.elementRef.nativeElement.style, {
            opacity: '0',
            visibility: 'hidden'
        });
    }
}

export let loadingComponent: LoadingComponent;
