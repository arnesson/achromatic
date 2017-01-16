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
var iscroll_1 = require('./iscroll');
var ScrollDirective = (function () {
    function ScrollDirective(elementRef) {
        this.elementRef = elementRef;
        this.iscroll = new iscroll_1.IScroll(this.elementRef.nativeElement, this.elementRef.nativeElement.parentNode, {
            scrollX: false,
            scrollY: true,
            freeScroll: false,
            eventPassthrough: 'horizontal',
            momentum: true,
            scrollbars: true,
            mouseWheel: true,
            fadeScrollbars: true
        });
    }
    ScrollDirective.prototype.x = function () {
        return this.iscroll && this.iscroll.x;
    };
    ScrollDirective.prototype.y = function () {
        return this.iscroll && this.iscroll.y;
    };
    ScrollDirective.prototype.maxScrollX = function () {
        return this.iscroll && this.iscroll.maxScrollX;
    };
    ScrollDirective.prototype.maxScrollY = function () {
        return this.iscroll && this.iscroll.maxScrollY;
    };
    ScrollDirective.prototype.refresh = function () {
        var _this = this;
        if (this.iscroll) {
            window.setTimeout(function () {
                if (_this.iscroll) {
                    _this.iscroll.refresh();
                }
            }, 1);
        }
    };
    ScrollDirective.prototype.scrollTo = function (x, y, time) {
        var _this = this;
        if (this.iscroll) {
            window.setTimeout(function () {
                if (_this.iscroll) {
                    _this.iscroll.scrollTo(x, y, time);
                }
            }, 1);
        }
    };
    ScrollDirective.prototype.scrollToTop = function (time) {
        var _this = this;
        if (this.iscroll) {
            window.setTimeout(function () {
                if (_this.iscroll) {
                    _this.iscroll.scrollTo(0, 0, time);
                }
            }, 1);
        }
    };
    ScrollDirective.prototype.scrollToBottom = function (time) {
        var _this = this;
        if (this.iscroll) {
            window.setTimeout(function () {
                if (_this.iscroll) {
                    _this.iscroll.scrollTo(0, _this.iscroll.maxScrollY, time);
                }
            }, 1);
        }
    };
    ScrollDirective.prototype.on = function (event, fn) {
        if (this.iscroll) {
            if (this.iscroll) {
                this.iscroll.on(event, function () {
                    fn(this);
                });
            }
        }
    };
    ScrollDirective.prototype.ngOnDestroy = function () {
        if (this.iscroll) {
            this.iscroll.destroy();
        }
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
