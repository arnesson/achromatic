import { Component, ElementRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import 'rxjs/add/operator/filter';

@Component({
  selector: 'actionsheet',
  template: `
    <div class="spacer" style="position:absolute;bottom:0;left:0;right:0;">
      <button *ngFor="let action of actions" (click)="action.click()" class="btn btn-block btn-lg btn-secondary" [ngClass]="action.class || ''">{{action.title}}</button>
    </div>
  `
})
export class ActionsheetComponent {
    constructor(
        private router: Router,
        private elementRef: ElementRef
    ) {
        actionsheetComponent = this;

        this.router.events.filter(e => e instanceof NavigationEnd).subscribe((e) => {
            this.hide();
        });
    }

    public actions: any[] = [];

    public show(actions: any[]): void {
        this.actions = actions;

        (<any>Object).assign(this.elementRef.nativeElement.style, {
            webkitTransition: 'opacity .3s, visibility .3s',
            transition: 'opacity .3s, visibility .3s',
            opacity: '1', 
            visibility: 'visible'
        });
    }

    public hide(): void {
        if (this.actions.length) {
            this.actions = [];

            (<any>Object).assign(this.elementRef.nativeElement.style, {
                opacity: '0',
                visibility: 'hidden'
            });
        }
    }
}

export let actionsheetComponent: ActionsheetComponent;
