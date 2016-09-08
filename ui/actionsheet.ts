import { Component } from '@angular/core';

@Component({
  selector: 'actionsheet',
  template: `
    <div [ngStyle]="actions.length && {opacity:1, visibility: 'visible'} || {opacity:0, visibility: 'hidden'}" style="visibility:hidden;opacity:0;position:absolute;top:0;bottom:0;left:0;right:0;z-index:100;background:rgba(0, 0, 0, 0.6);-webkit-transition:opacity .3s, visibility .3s;transition:opacity .3s, visibility .3s">
        <div class="spacer" style="position:absolute;bottom:0;left:0;right:0;">
            <button *ngFor="let action of actions" (click)="action.click()" class="btn btn-block btn-lg btn-secondary" [ngClass]="[action.class]">{{action.title}}</button>
        </div>
    </div>
  `
})
export class ActionSheetComponent {
    public actions: any[] = [];

    public show(actions: any[]): void {
        this.actions = actions;
    }
    public hide(): void {
        this.actions = [];
    }
}
