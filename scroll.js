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
var Observable_1 = require('rxjs/Observable');
var ScrollDirective = (function () {
    function ScrollDirective(elementRef, zone) {
        var _this = this;
        this.elementRef = elementRef;
        this.zone = zone;
        this.lock = false;
        this.scroll = Observable_1.Observable.create(function (observer) {
            var fn = function (emit) {
                if (!_this.lock) {
                    _this.lock = true;
                    _this.zone.run(function () {
                        observer.next({
                            x: _this.x(),
                            y: _this.y(),
                            max_x: _this.max_x(),
                            max_y: _this.max_y()
                        });
                        _this.lock = false;
                    });
                }
            };
            _this.elementRef.nativeElement.addEventListener('scroll', fn, false);
            _this.destroy = function () {
                _this.elementRef.nativeElement.removeEventListener('scroll', fn, false);
            };
            return _this.destroy;
        });
        Object.assign(this.elementRef.nativeElement.style, {
            overflowY: 'auto',
            overflowX: 'hidden',
            webkitOverflowScrolling: 'touch',
            willChange: 'scroll-position',
            contain: 'size style layout'
        });
    }
    ScrollDirective.prototype.x = function () {
        return this.elementRef.nativeElement.scrollLeft;
    };
    ScrollDirective.prototype.y = function () {
        return this.elementRef.nativeElement.scrollTop;
    };
    ScrollDirective.prototype.max_x = function () {
        return this.elementRef.nativeElement.scrollWidth - this.elementRef.nativeElement.clientWidth;
    };
    ScrollDirective.prototype.max_y = function () {
        return this.elementRef.nativeElement.scrollHeight - this.elementRef.nativeElement.clientHeight;
    };
    ScrollDirective.prototype.to = function (x, y) {
        this.elementRef.nativeElement.scrollTo(x, y);
    };
    ScrollDirective.prototype.top = function () {
        this.elementRef.nativeElement.scrollTo(this.x(), 0);
    };
    ScrollDirective.prototype.bottom = function () {
        this.elementRef.nativeElement.scrollTo(this.x(), this.max_y());
    };
    ScrollDirective.prototype.ngOnDestroy = function () {
        if (this.destroy) {
            this.destroy();
        }
    };
    ScrollDirective = __decorate([
        core_1.Directive({
            selector: '[scroll]'
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, core_1.NgZone])
    ], ScrollDirective);
    return ScrollDirective;
}());
exports.ScrollDirective = ScrollDirective;
