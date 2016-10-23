import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'actionsheet',
  template: `
    <div class="spacer" style="position:absolute;bottom:0;left:0;right:0;">
      <button *ngFor="let action of actions" (click)="action.click()" class="btn btn-block btn-lg btn-secondary" [ngClass]="action.class || ''">{{action.title}}</button>
    </div>
  `
})
export class ActionsheetComponent {
    constructor(private elementRef: ElementRef) {}

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
        this.actions = [];

        (<any>Object).assign(this.elementRef.nativeElement.style, {
            opacity: '0',
            visibility: 'hidden'
        });
    }
}
