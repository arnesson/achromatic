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
var IScroll = require('./iscroll');
var ScrollDirective = (function () {
    function ScrollDirective(elementRef) {
        this.elementRef = elementRef;
    }
    ScrollDirective.prototype.refresh = function () {
        if (this.iscroll) {
            this.iscroll.refresh();
        }
    };
    ScrollDirective.prototype.scrollTo = function (x, y, time) {
        if (this.iscroll) {
            this.iscroll.scrollTo(x, y, time);
        }
    };
    ScrollDirective.prototype.scrollToTop = function (time) {
        if (this.iscroll) {
            this.iscroll.scrollTo(0, 0, time);
        }
    };
    ScrollDirective.prototype.scrollToBottom = function (time) {
        if (this.iscroll) {
            this.iscroll.scrollTo(0, this.iscroll.maxScrollY, time);
        }
    };
    ScrollDirective.prototype.ngOnInit = function () {
        this.iscroll = new IScroll(this.elementRef.nativeElement, this.elementRef.nativeElement.parentNode, {
            scrollX: false,
            scrollY: true,
            freeScroll: false,
            eventPassthrough: 'horizontal',
            momentum: true,
            scrollbars: true,
            mouseWheel: true,
            fadeScrollbars: true
        });
    };
    ScrollDirective.prototype.ngOnDestroy = function () {
        this.iscroll.destroy();
        this.iscroll = null;
    };
    ScrollDirective = __decorate([
        core_1.Directive({
            selector: '[scroll]'
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], ScrollDirective);
    return ScrollDirective;
}());
exports.ScrollDirective = ScrollDirective;
