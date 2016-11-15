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
        Object.assign(this.elementRef.nativeElement.style, {
            width: typeof width === 'number' ? width + "px" : width,
            height: typeof height === 'number' ? height + "px" : height,
            display: 'block',
            backgroundColor: 'rgba(0,0,0,.1)',
            backgroundSize: 'cover',
            backgroundImage: "url(" + this.url() + ")"
        });
    };
    LazyloadDirective.prototype.url = function () {
        var base64 = /^(?:[A-Z0-9+\/]{4})*(?:[A-Z0-9+\/]{2}==|[A-Z0-9+\/]{3}=|[A-Z0-9+\/]{4})$/i;
        if (!this.file) {
            return 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
        }
        if (base64.test(this.file)) {
            return 'data:application/octet-stream;base64,' + this.file;
        }
        else {
            return this.file;
        }
    };
    LazyloadDirective.prototype.update = function (file) {
        this.file = file;
        Object.assign(this.elementRef.nativeElement.style, {
            backgroundImage: "url(" + this.url() + ")"
        });
    };
    __decorate([
        core_1.Input('lazyload'), 
        __metadata('design:type', String)
    ], LazyloadDirective.prototype, "file", void 0);
    __decorate([
        core_1.Input('preview'), 
        __metadata('design:type', String)
    ], LazyloadDirective.prototype, "preview", void 0);
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
