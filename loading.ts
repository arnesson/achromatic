import { Component, ElementRef } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/auditTime';

@Component({
  selector: 'loading',
  template: `
    <div class="inner" style="position:absolute;top:calc(50% - 40px);left:calc(50% - 40px);width:80px;height:80px;">
        <div class="spinner" style="margin:20px; width:40px;height:40px;"></div>
    </div>
  `
})
export class LoadingComponent {
    private observer: any;

    public visible: boolean = false;

    constructor(
        private router: Router,
        private elementRef: ElementRef
    ) {
        loadingComponent = this;

        this.router.events.filter(e => e instanceof NavigationStart).subscribe((e) => {
            this.hide();
        });

        Observable.create((o: any) => {
            this.observer = o;
        }).auditTime(50).subscribe((changes: any) => {
            if (changes) {
                (<any>Object).assign(this.elementRef.nativeElement.style, changes);
                this.visible = false;
            }
        });
    }

    public show(className?: string): void {
        (<any>Object).assign(this.elementRef.nativeElement.style, {
            opacity: '1', 
            visibility: 'visible'
        });
        this.elementRef.nativeElement.className = className || 'loading-light';
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
