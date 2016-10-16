// http://almerosteyn.com/2016/04/linkup-custom-control-to-ngcontrol-ngmodel
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
var forms_1 = require('@angular/forms');
var IScroll = require('./iscroll');
var noop = function () { };
var SwitchComponent = (function () {
    function SwitchComponent(elementRef) {
        this.elementRef = elementRef;
        this.innerValue = false;
        // Placeholders for the callbacks which are later provided by the Control Value Accessor
        this.onTouchedCallback = noop;
        this.onChangeCallback = noop;
    }
    Object.defineProperty(SwitchComponent.prototype, "value", {
        // get accessor
        get: function () {
            return this.innerValue;
        },
        // set accessor including call the onchange callback
        set: function (v) {
            if (v !== this.innerValue) {
                this.innerValue = v;
                this.onChangeCallback(v);
            }
        },
        enumerable: true,
        configurable: true
    });
    ;
    // From ControlValueAccessor interface
    SwitchComponent.prototype.writeValue = function (v) {
        if (v !== this.innerValue) {
            this.innerValue = v;
            this.iscroll.goToPage(v ? 0 : 1, 0, 0);
            if (v) {
                this.elementRef.nativeElement.classList.add('active');
            }
            else {
                this.elementRef.nativeElement.classList.remove('active');
            }
        }
    };
    // From ControlValueAccessor interface
    SwitchComponent.prototype.registerOnChange = function (fn) {
        this.onChangeCallback = fn;
    };
    // From ControlValueAccessor interface
    SwitchComponent.prototype.registerOnTouched = function (fn) {
        this.onTouchedCallback = fn;
    };
    SwitchComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.elementRef.nativeElement.addEventListener('click', function () {
            _this.iscroll.goToPage(_this.value ? 1 : 0, 0);
        });
        this.iscroll = new IScroll(this.elementRef.nativeElement.querySelector(".scroller"), this.elementRef.nativeElement, {
            scrollX: true,
            scrollY: false,
            freeScroll: false,
            momentum: false,
            snap: true,
            snapSpeed: 500,
            bounce: false,
            eventPassthrough: 'vertical'
        });
        this.iscroll.on('scrollEnd', function () {
            _this.value = !_this.iscroll.currentPage.pageX;
            if (_this.value) {
                _this.elementRef.nativeElement.classList.add('active');
            }
            else {
                _this.elementRef.nativeElement.classList.remove('active');
            }
        });
    };
    SwitchComponent.prototype.ngOnDestroy = function () {
        this.iscroll.destroy();
        this.iscroll = null;
    };
    SwitchComponent = __decorate([
        core_1.Component({
            selector: 'switch',
            template: "\n    <div class=\"scroller\" style=\"position:absolute;height:26px;width:62px;top:0;left:0\">\n      <div style=\"height:26px;width:17px;top:0;left:0;position:absolute;\"></div>\n      <div class=\"handle\" style=\"height:28px;width:28px;background: #fff;border:1px solid #ddd;border-radius: 100px;top:-1px;left:17px;position:absolute;\"></div>\n      <div style=\"height:26px;width:17px;top:0;left:45px;position:absolute;\"></div>\n    </div>\n  ",
            providers: [
                {
                    provide: forms_1.NG_VALUE_ACCESSOR,
                    useExisting: core_1.forwardRef(function () { return SwitchComponent; }),
                    multi: true
                }
            ]
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], SwitchComponent);
    return SwitchComponent;
}());
exports.SwitchComponent = SwitchComponent;
