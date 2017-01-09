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
        this.loaded = false;
    }
    LazyloadDirective.prototype.ngOnInit = function () {
        var width = this.width || 'auto';
        var height = this.height || 'auto';
        Object.assign(this.elementRef.nativeElement.style, {
            width: typeof width === 'number' ? width + "px" : width,
            height: typeof height === 'number' ? height + "px" : height,
            display: 'block',
            overflow: 'hidden',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundImage: 'url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7)'
        });
        if (this.placeholder) {
            this.blur(this.placeholder);
        }
        if (this.file) {
            this.lazyload(this.file);
        }
    };
    LazyloadDirective.prototype.blur = function (file) {
        var _this = this;
        var img = new Image();
        img.onload = function () {
            var svg = btoa("\n<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" width=\"" + img.width + "\" height=\"" + img.height + "\" viewBox=\"0 0 " + img.width + " " + img.height + "\">\n<filter id=\"blur\" filterUnits=\"userSpaceOnUse\" color-interpolation-filters=\"sRGB\">\n<feGaussianBlur stdDeviation=\"5 5\" edgeMode=\"duplicate\" />\n<feComponentTransfer>\n  <feFuncA type=\"discrete\" tableValues=\"1 1\" />\n</feComponentTransfer>\n</filter>\n<image filter=\"url(#blur)\" xlink:href=\"" + img.src + "\" x=\"0\" y=\"0\" height=\"100%\" width=\"100%\"/>\n</svg>");
            if (!_this.loaded) {
                Object.assign(_this.elementRef.nativeElement.style, {
                    backgroundImage: "url(data:image/svg+xml;charset=utf-8;base64," + svg + ")"
                });
            }
        };
        img.src = this.base64(file);
    };
    LazyloadDirective.prototype.lazyload = function (file) {
        var _this = this;
        var img = new Image();
        img.onload = function () {
            _this.loaded = true;
            Object.assign(_this.elementRef.nativeElement.style, {
                backgroundImage: "url(" + img.src + ")"
            });
        };
        img.src = this.base64(file);
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
        if (file) {
            this.lazyload(file);
        }
        else {
            Object.assign(this.elementRef.nativeElement.style, {
                backgroundImage: 'url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7)'
            });
        }
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
