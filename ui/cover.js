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
var CoverDirective = (function () {
    function CoverDirective(elementRef) {
        this.elementRef = elementRef;
    }
    CoverDirective.prototype.ngOnInit = function () {
        Object.assign(this.elementRef.nativeElement.style, {
            width: 'auto',
            height: (this.size || 50) + "px",
            display: 'block',
            borderRadius: '50%',
            backgroundColor: 'rgba(0,0,0,.1)',
            backgroundSize: 'cover',
            backgroundImage: "url(" + (this.cover || 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7') + ")"
        });
    };
    CoverDirective.prototype.update = function (cover) {
        this.cover = cover;
        Object.assign(this.elementRef.nativeElement.style, {
            backgroundImage: "url(" + (this.cover || 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7') + ")"
        });
    };
    __decorate([
        core_1.Input('cover'), 
        __metadata('design:type', String)
    ], CoverDirective.prototype, "cover", void 0);
    __decorate([
        core_1.Input('size'), 
        __metadata('design:type', Number)
    ], CoverDirective.prototype, "size", void 0);
    CoverDirective = __decorate([
        core_1.Directive({
            selector: '[cover]'
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], CoverDirective);
    return CoverDirective;
}());
exports.CoverDirective = CoverDirective;
