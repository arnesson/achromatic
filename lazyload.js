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
var LazyloadDirective = (function () {
    function LazyloadDirective(elementRef) {
        this.elementRef = elementRef;
    }
    LazyloadDirective.prototype.ngOnInit = function () {
        var width = this.width || 'auto';
        var height = this.height || 'auto';
        // TODO: maybe have a nicer placeholder that looks cool with the blur filter
        var placeholder = this.placeholder || 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
        Object.assign(this.elementRef.nativeElement.style, {
            width: typeof width === 'number' ? width + "px" : width,
            height: typeof height === 'number' ? height + "px" : height,
            display: 'block',
            backgroundSize: 'cover',
            backgroundColor: 'rgba(0,0,0,0.05)'
        });
        this.blur(this.placeholder);
        this.lazyload(this.file);
    };
    LazyloadDirective.prototype.blur = function (file) {
        var _this = this;
        if (file) {
            var img_1 = new Image();
            img_1.onload = function () {
                var svg = btoa("\n<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" width=\"" + img_1.width + "\" height=\"" + img_1.height + "\" viewBox=\"0 0 " + img_1.width + " " + img_1.height + "\">\n  <filter id=\"blur\" filterUnits=\"userSpaceOnUse\" color-interpolation-filters=\"sRGB\">\n    <feGaussianBlur stdDeviation=\"20 20\" edgeMode=\"duplicate\" />\n    <feComponentTransfer>\n      <feFuncA type=\"discrete\" tableValues=\"1 1\" />\n    </feComponentTransfer>\n  </filter>\n  <image filter=\"url(#blur)\" xlink:href=\"" + img_1.src + "\" x=\"0\" y=\"0\" height=\"100%\" width=\"100%\"/>\n</svg>");
                Object.assign(_this.elementRef.nativeElement.style, {
                    backgroundImage: "url(data:image/svg+xml;charset=utf-8," + svg + ")"
                });
            };
            img_1.src = this.base64(file);
        }
    };
    LazyloadDirective.prototype.lazyload = function (file) {
        var _this = this;
        if (file) {
            var img_2 = new Image();
            img_2.onload = function () {
                Object.assign(_this.elementRef.nativeElement.style, {
                    backgroundImage: "url(" + img_2.src + ")"
                });
            };
            img_2.src = this.base64(file);
        }
    };
    LazyloadDirective.prototype.base64 = function (url) {
        var base64 = /^(?:[A-Z0-9+\/]{4})*(?:[A-Z0-9+\/]{2}==|[A-Z0-9+\/]{3}=|[A-Z0-9+\/]{4})$/i;
        if (base64.test(url)) {
            return 'data:application/octet-stream;base64,' + url;
        }
        else {
            return url;
        }
    };
    LazyloadDirective.prototype.update = function (file) {
        this.file = file;
        this.lazyload(file);
    };
    __decorate([
        core_1.Input('lazyload'), 
        __metadata('design:type', String)
    ], LazyloadDirective.prototype, "file", void 0);
    __decorate([
        core_1.Input('placeholder'), 
        __metadata('design:type', String)
    ], LazyloadDirective.prototype, "placeholder", void 0);
    __decorate([
        core_1.Input('width'), 
        __metadata('design:type', Object)
    ], LazyloadDirective.prototype, "width", void 0);
    __decorate([
        core_1.Input('height'), 
        __metadata('design:type', Object)
    ], LazyloadDirective.prototype, "height", void 0);
    LazyloadDirective = __decorate([
        core_1.Directive({
            selector: '[lazyload]'
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], LazyloadDirective);
    return LazyloadDirective;
}());
exports.LazyloadDirective = LazyloadDirective;
