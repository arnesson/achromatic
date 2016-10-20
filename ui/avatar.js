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
var AvatarDirective = (function () {
    function AvatarDirective(elementRef) {
        this.elementRef = elementRef;
    }
    AvatarDirective.prototype.ngOnInit = function () {
        Object.assign(this.elementRef.nativeElement.style, {
            width: (this.size || 50) + "px",
            height: (this.size || 50) + "px",
            display: 'block',
            borderRadius: '50%',
            backgroundColor: 'rgba(0,0,0,.1)',
            backgroundSize: 'cover',
            backgroundImage: "url(" + this.url() + ")"
        });
    };
    AvatarDirective.prototype.url = function () {
        var base64 = /^(?:[A-Z0-9+\/]{4})*(?:[A-Z0-9+\/]{2}==|[A-Z0-9+\/]{3}=|[A-Z0-9+\/]{4})$/i;
        if (!this.avatar) {
            return 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
        }
        if (base64.test(this.avatar)) {
            return 'data:application/octet-stream;base64,' + this.avatar;
        }
        else {
            return this.avatar;
        }
    };
    AvatarDirective.prototype.update = function (avatar) {
        this.avatar = avatar;
        Object.assign(this.elementRef.nativeElement.style, {
            backgroundImage: "url(" + this.url() + ")"
        });
    };
    __decorate([
        core_1.Input('avatar'), 
        __metadata('design:type', String)
    ], AvatarDirective.prototype, "avatar", void 0);
    __decorate([
        core_1.Input('size'), 
        __metadata('design:type', Number)
    ], AvatarDirective.prototype, "size", void 0);
    AvatarDirective = __decorate([
        core_1.Directive({
            selector: '[avatar]'
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], AvatarDirective);
    return AvatarDirective;
}());
exports.AvatarDirective = AvatarDirective;
