import { Component, ElementRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import 'rxjs/add/operator/filter';

@Component({
  selector: 'loading',
  template: `
    <div class="spinner" style="position:absolute;top:calc(50% - 20px);left:calc(50% - 20px);width:40px;height:40px;"></div>
  `
})
export class LoadingComponent {
    constructor(
        private router: Router,
        private elementRef: ElementRef
    ) {
        loadingComponent = this;

        this.router.events.filter(e => e instanceof NavigationEnd).subscribe((e) => {
            this.hide();
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
