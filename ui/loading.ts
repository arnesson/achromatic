import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'loading',
  template: `
    <div class="spinner" style="position:absolute;top:calc(50% - 20px);left:calc(50% - 20px);width:40px;height:40px;"></div>
  `
})
export class LoadingComponent {
    constructor(private elementRef: ElementRef) {
        loadingComponent = this;
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
