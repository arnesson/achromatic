import { Component, ElementRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'loading',
  template: `
    <div class="spinner" style="position:absolute;top:calc(50% - 20px);left:calc(50% - 20px);width:40px;height:40px;"></div>
  `
})
export class LoadingComponent {
    private observer: any;
    private visible: boolean = false;

    constructor(
        private router: Router,
        private elementRef: ElementRef
    ) {
        loadingComponent = this;

        this.router.events.filter(e => e instanceof NavigationEnd).subscribe((e) => {
            this.hide();
        });

        Observable.create((o: any) => {
            this.observer = o;
        }).debounceTime(200).subscribe((changes: any) => {
            if (changes) {
                (<any>Object).assign(this.elementRef.nativeElement.style, changes);
                this.visible = false;
            }
        });
    }

    public show(): void {
        (<any>Object).assign(this.elementRef.nativeElement.style, {
            webkitTransition: 'opacity .2s, visibility .2s',
            transition: 'opacity .2s, visibility .2s',
            opacity: '1', 
            visibility: 'visible'
        });
        this.observer.next(null);
        this.visible = true;
    }

    public hide(): void {
        if (this.visible) {
            this.observer.next({
                opacity: '0',
                visibility: 'hidden'
            });
        }
    }
}

export let loadingComponent: LoadingComponent;
