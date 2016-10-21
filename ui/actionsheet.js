"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var ActionSheetComponent = (function () {
    function ActionSheetComponent(elementRef) {
        this.elementRef = elementRef;
        this.actions = [];
    }
    ActionSheetComponent.prototype.ngOnInit = function () {
        Object.assign(this.elementRef.nativeElement.style, {
            visibility: 'hidden',
            opacity: '0',
            position: 'absolute',
            top: '0',
            bottom: '0',
            left: '0',
            right: '0',
            zIndex: '100',
            background: 'rgba(0, 0, 0, 0.6)',
            webkitTransition: 'opacity .3s, visibility .3s',
            transition: 'opacity .3s, visibility .3s'
        });
    };
    ActionSheetComponent.prototype.show = function (actions) {
        this.actions = actions;
        Object.assign(this.elementRef.nativeElement.style, {
            opacity: '1',
            visibility: 'visible'
        });
    };
    ActionSheetComponent.prototype.hide = function () {
        this.actions = [];
        Object.assign(this.elementRef.nativeElement.style, {
            opacity: '0',
            visibility: 'hidden'
        });
    };
    ActionSheetComponent = __decorate([
        core_1.Component({
            selector: 'actionsheet',
            template: "\n    <div class=\"spacer\" style=\"position:absolute;bottom:0;left:0;right:0;\">\n      <button *ngFor=\"let action of actions\" (click)=\"action.click()\" class=\"btn btn-block btn-lg btn-secondary\" [ngClass]=\"action.class || ''\">{{action.title}}</button>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], ActionSheetComponent);
    return ActionSheetComponent;
}());
exports.ActionSheetComponent = ActionSheetComponent;
