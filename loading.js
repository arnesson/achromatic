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
var router_1 = require('@angular/router');
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/operator/filter');
require('rxjs/add/operator/debounceTime');
var LoadingComponent = (function () {
    function LoadingComponent(router, elementRef) {
        var _this = this;
        this.router = router;
        this.elementRef = elementRef;
        this.visible = false;
        exports.loadingComponent = this;
        this.router.events.filter(function (e) { return e instanceof router_1.NavigationEnd; }).subscribe(function (e) {
            _this.hide();
        });
        Observable_1.Observable.create(function (o) {
            _this.observer = o;
        }).debounceTime(200).subscribe(function (changes) {
            if (changes) {
                Object.assign(_this.elementRef.nativeElement.style, changes);
                _this.visible = false;
            }
        });
    }
    LoadingComponent.prototype.show = function (background) {
        Object.assign(this.elementRef.nativeElement.style, {
            opacity: '1',
            visibility: 'visible',
            background: background || 'rgba(0, 0, 0, 0.6)'
        });
        this.observer.next(null);
        this.visible = true;
    };
    LoadingComponent.prototype.hide = function () {
        if (this.visible) {
            this.observer.next({
                opacity: '0',
                visibility: 'hidden'
            });
        }
    };
    LoadingComponent = __decorate([
        core_1.Component({
            selector: 'loading',
            template: "\n    <div class=\"spinner\" style=\"position:absolute;top:calc(50% - 20px);left:calc(50% - 20px);width:40px;height:40px;\"></div>\n  "
        }), 
        __metadata('design:paramtypes', [router_1.Router, core_1.ElementRef])
    ], LoadingComponent);
    return LoadingComponent;
}());
exports.LoadingComponent = LoadingComponent;
