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
var TooltipContent = /** @class */ (function () {
    // -------------------------------------------------------------------------
    // Constructor
    // -------------------------------------------------------------------------
    function TooltipContent(element, cdr) {
        this.element = element;
        this.cdr = cdr;
        this.placement = "bottom";
        this.animation = true;
        // -------------------------------------------------------------------------
        // Properties
        // -------------------------------------------------------------------------
        this.top = -100000;
        this.left = -100000;
        this.isShow = false;
        this.isFade = true;
    }
    // -------------------------------------------------------------------------
    // Lifecycle callbacks
    // -------------------------------------------------------------------------
    TooltipContent.prototype.ngAfterViewInit = function () {
        this.show();
        this.cdr.detectChanges();
    };
    // -------------------------------------------------------------------------
    // Public Methods
    // -------------------------------------------------------------------------
    TooltipContent.prototype.show = function () {
        if (!this.hostElement)
            return;
        var p = this.positionElements(this.hostElement, this.element.nativeElement.children[0], this.placement);
        this.top = p.top;
        this.left = p.left;
        this.isShow = true;
        if (this.animation)
            this.isFade = true;
    };
    TooltipContent.prototype.hide = function () {
        this.top = -100000;
        this.left = -100000;
        this.isShow = false;
        if (this.animation)
            this.isFade = false;
    };
    // -------------------------------------------------------------------------
    // Private Methods
    // -------------------------------------------------------------------------
    TooltipContent.prototype.positionElements = function (hostEl, targetEl, positionStr, appendToBody) {
        if (appendToBody === void 0) { appendToBody = false; }
        var positionStrParts = positionStr.split("-");
        var pos0 = positionStrParts[0];
        var pos1 = positionStrParts[1] || "center";
        var hostElPos = appendToBody ? this.offset(hostEl) : this.position(hostEl);
        var targetElWidth = targetEl.offsetWidth;
        var targetElHeight = targetEl.offsetHeight;
        var shiftWidth = {
            center: function () {
                return hostElPos.left + hostElPos.width / 2 - targetElWidth / 2;
            },
            left: function () {
                return hostElPos.left;
            },
            right: function () {
                return hostElPos.left + hostElPos.width;
            }
        };
        var shiftHeight = {
            center: function () {
                return hostElPos.top + hostElPos.height / 2 - targetElHeight / 2;
            },
            top: function () {
                return hostElPos.top;
            },
            bottom: function () {
                return hostElPos.top + hostElPos.height;
            }
        };
        var targetElPos;
        switch (pos0) {
            case "right":
                targetElPos = {
                    top: shiftHeight[pos1](),
                    left: shiftWidth[pos0]()
                };
                break;
            case "left":
                targetElPos = {
                    top: shiftHeight[pos1](),
                    left: hostElPos.left - targetElWidth
                };
                break;
            case "bottom":
                targetElPos = {
                    top: shiftHeight[pos0](),
                    left: shiftWidth[pos1]()
                };
                break;
            default:
                targetElPos = {
                    top: hostElPos.top - targetElHeight,
                    left: shiftWidth[pos1]()
                };
                break;
        }
        return targetElPos;
    };
    TooltipContent.prototype.position = function (nativeEl) {
        var offsetParentBCR = { top: 0, left: 0 };
        var elBCR = this.offset(nativeEl);
        var offsetParentEl = this.parentOffsetEl(nativeEl);
        if (offsetParentEl !== window.document) {
            offsetParentBCR = this.offset(offsetParentEl);
            offsetParentBCR.top += offsetParentEl.clientTop - offsetParentEl.scrollTop;
            offsetParentBCR.left += offsetParentEl.clientLeft - offsetParentEl.scrollLeft;
        }
        var boundingClientRect = nativeEl.getBoundingClientRect();
        return {
            width: boundingClientRect.width || nativeEl.offsetWidth,
            height: boundingClientRect.height || nativeEl.offsetHeight,
            top: elBCR.top - offsetParentBCR.top,
            left: elBCR.left - offsetParentBCR.left
        };
    };
    TooltipContent.prototype.offset = function (nativeEl) {
        var boundingClientRect = nativeEl.getBoundingClientRect();
        return {
            width: boundingClientRect.width || nativeEl.offsetWidth,
            height: boundingClientRect.height || nativeEl.offsetHeight,
            top: boundingClientRect.top + (window.pageYOffset || window.document.documentElement.scrollTop),
            left: boundingClientRect.left + (window.pageXOffset || window.document.documentElement.scrollLeft)
        };
    };
    TooltipContent.prototype.getStyle = function (nativeEl, cssProp) {
        if (nativeEl.currentStyle)
            return nativeEl.currentStyle[cssProp];
        if (window.getComputedStyle)
            return window.getComputedStyle(nativeEl)[cssProp];
        // finally try and get inline style
        return nativeEl.style[cssProp];
    };
    TooltipContent.prototype.isStaticPositioned = function (nativeEl) {
        return (this.getStyle(nativeEl, "position") || "static") === "static";
    };
    TooltipContent.prototype.parentOffsetEl = function (nativeEl) {
        var offsetParent = nativeEl.offsetParent || window.document;
        while (offsetParent && offsetParent !== window.document && this.isStaticPositioned(offsetParent)) {
            offsetParent = offsetParent.offsetParent;
        }
        return offsetParent || window.document;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], TooltipContent.prototype, "hostElement", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], TooltipContent.prototype, "content", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], TooltipContent.prototype, "placement", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], TooltipContent.prototype, "animation", void 0);
    TooltipContent = __decorate([
        core_1.Component({
            selector: "tooltip-content",
            template: "\n<div class=\"tooltip tooltip-{{ placement }}\"\n     [style.top]=\"top + 'px'\"\n     [style.left]=\"left + 'px'\"\n     [class.show]=\"isShow\"\n     [class.fade]=\"isFade\"\n     role=\"tooltip\">\n    <div class=\"tooltip-inner\">\n        <ng-content></ng-content>\n        {{ content }}\n    </div> \n</div>\n"
        }),
        __metadata("design:paramtypes", [core_1.ElementRef,
            core_1.ChangeDetectorRef])
    ], TooltipContent);
    return TooltipContent;
}());
exports.TooltipContent = TooltipContent;
var Tooltip = /** @class */ (function () {
    // -------------------------------------------------------------------------
    // Constructor
    // -------------------------------------------------------------------------
    function Tooltip(viewContainerRef, resolver) {
        this.viewContainerRef = viewContainerRef;
        this.resolver = resolver;
        this.tooltipAnimation = true;
        this.tooltipPlacement = "bottom";
    }
    // -------------------------------------------------------------------------
    // Public Methods
    // -------------------------------------------------------------------------
    Tooltip.prototype.show = function () {
        if (this.tooltipDisabled || this.visible)
            return;
        this.visible = true;
        if (typeof this.content === "string") {
            var factory = this.resolver.resolveComponentFactory(TooltipContent);
            if (!this.visible)
                return;
            this.tooltip = this.viewContainerRef.createComponent(factory);
            this.tooltip.instance.hostElement = this.viewContainerRef.element.nativeElement;
            this.tooltip.instance.content = this.content;
            this.tooltip.instance.placement = this.tooltipPlacement;
            this.tooltip.instance.animation = this.tooltipAnimation;
        }
        else {
            var tooltip = this.content;
            tooltip.hostElement = this.viewContainerRef.element.nativeElement;
            tooltip.placement = this.tooltipPlacement;
            tooltip.animation = this.tooltipAnimation;
            tooltip.show();
        }
    };
    Tooltip.prototype.hide = function () {
        if (!this.visible)
            return;
        this.visible = false;
        if (this.tooltip)
            this.tooltip.destroy();
        if (this.content instanceof TooltipContent)
            this.content.hide();
    };
    __decorate([
        core_1.Input("tooltip"),
        __metadata("design:type", Object)
    ], Tooltip.prototype, "content", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], Tooltip.prototype, "tooltipDisabled", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], Tooltip.prototype, "tooltipAnimation", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], Tooltip.prototype, "tooltipPlacement", void 0);
    __decorate([
        core_1.HostListener("focusin"),
        core_1.HostListener("mouseenter"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Tooltip.prototype, "show", null);
    __decorate([
        core_1.HostListener("focusout"),
        core_1.HostListener("mouseleave"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Tooltip.prototype, "hide", null);
    Tooltip = __decorate([
        core_1.Directive({
            selector: "[tooltip]"
        }),
        __metadata("design:paramtypes", [core_1.ViewContainerRef,
            core_1.ComponentFactoryResolver])
    ], Tooltip);
    return Tooltip;
}());
exports.Tooltip = Tooltip;
