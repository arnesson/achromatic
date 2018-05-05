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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var TextareaDirective = /** @class */ (function () {
    function TextareaDirective(element, renderer) {
        this.element = element;
        this.renderer = renderer;
        if (!this.element.nativeElement.getAttribute("rows")) {
            this.element.nativeElement.setAttribute("rows", 1);
        }
    }
    TextareaDirective.prototype.input = function () {
        this.renderer.setElementStyle(this.element.nativeElement, 'overflow', 'hidden');
        this.renderer.setElementStyle(this.element.nativeElement, 'height', 'auto');
        var scrollHeight = this.element.nativeElement.scrollHeight;
        if (scrollHeight > 0) {
            this.renderer.setElementStyle(this.element.nativeElement, 'height', scrollHeight + 'px');
        }
    };
    __decorate([
        core_1.HostListener('input'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], TextareaDirective.prototype, "input", null);
    TextareaDirective = __decorate([
        core_1.Directive({
            selector: 'textarea'
        }),
        __metadata("design:paramtypes", [core_1.ElementRef,
            core_1.Renderer])
    ], TextareaDirective);
    return TextareaDirective;
}());
exports.TextareaDirective = TextareaDirective;
