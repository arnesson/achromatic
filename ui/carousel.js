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
var CarouselComponent = (function () {
    function CarouselComponent(elementRef) {
        this.elementRef = elementRef;
    }
    CarouselComponent.prototype.pagination = function (create) {
        var el = this.elementRef.nativeElement.querySelector(".pagination");
        var i = 0;
        if (create) {
            el.style.position = 'absolute';
            el.style.width = '100%';
            el.style.bottom = '10px';
            el.style.textAlign = 'center';
            for (i = 0; i < this.iscroll.pages.length; i++) {
                var span = document.createElement("span");
                span.style.width = '8px';
                span.style.height = '8px';
                span.style.display = 'inline-block';
                span.style.margin = '5px';
                span.style.borderRadius = '100%';
                span.style.background = "#000";
                span.style.opacity = "0.2";
                el.appendChild(span);
            }
        }
        for (i = 0; i < el.childNodes.length; i++) {
            if (this.iscroll.currentPage.pageX === i) {
                el.childNodes[i].style.opacity = 1;
                el.childNodes[i].style.background = "#fff";
            }
            else if (el.childNodes[i].style.opacity !== 0.2) {
                el.childNodes[i].style.opacity = 0.2;
                el.childNodes[i].style.background = "#000";
            }
        }
    };
    ;
    CarouselComponent.prototype.ngOnInit = function () {
        var el = this.elementRef.nativeElement.querySelector(".scroller");
        Object.assign(this.elementRef.nativeElement.style, {
            height: '100%',
            width: '100%',
            display: 'block'
        });
        var width = 0;
        for (var i = 0; i < el.childNodes.length; i++) {
            el.childNodes[i].style.float = "left";
            width += el.childNodes[i].offsetWidth;
        }
        Object.assign(el.style, {
            position: 'absolute',
            height: '100%',
            width: width + "px"
        });
        this.iscroll = new IScroll(el, this.elementRef.nativeElement, {
            scrollX: true,
            scrollY: false,
            freeScroll: false,
            momentum: false,
            snap: true,
            snapSpeed: 500,
            bounce: false
        });
        this.iscroll.on('scrollEnd', this.pagination);
        this.pagination(true);
    };
    CarouselComponent.prototype.ngOnDestroy = function () {
        this.iscroll.destroy();
        this.iscroll = null;
    };
    CarouselComponent = __decorate([
        core_1.Component({
            selector: 'carousel',
            template: "\n    <ng-content class=\"scroller\"></ng-content>\n    <div class=\"pagination\"></div>\n  "
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], CarouselComponent);
    return CarouselComponent;
}());
exports.CarouselComponent = CarouselComponent;
