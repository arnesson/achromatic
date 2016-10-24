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
var LoadingComponent = (function () {
    function LoadingComponent(elementRef) {
        this.elementRef = elementRef;
        exports.loadingComponent = this;
    }
    LoadingComponent.prototype.ngOnInit = function () {
        Object.assign(this.elementRef.nativeElement.style, {
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
    };
    LoadingComponent.prototype.show = function () {
        Object.assign(this.elementRef.nativeElement.style, {
            webkitTransition: 'opacity .3s, visibility .3s',
            transition: 'opacity .3s, visibility .3s',
            opacity: '1',
            visibility: 'visible'
        });
    };
    LoadingComponent.prototype.hide = function () {
        Object.assign(this.elementRef.nativeElement.style, {
            opacity: '0',
            visibility: 'hidden'
        });
    };
    LoadingComponent = __decorate([
        core_1.Component({
            selector: 'loading',
            template: "\n    <div class=\"spinner\" style=\"position:absolute;top:calc(50% - 20px);left:calc(50% - 20px);width:40px;height:40px;\"></div>\n  "
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], LoadingComponent);
    return LoadingComponent;
}());
exports.LoadingComponent = LoadingComponent;
