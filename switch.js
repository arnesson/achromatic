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
var noop = function () { };
var SwitchComponent = (function () {
    function SwitchComponent(elementRef) {
        this.elementRef = elementRef;
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
        var fn = function () {
            _this.value = !_this.value;
            if (_this.value) {
                _this.elementRef.nativeElement.classList.add('active');
            }
            else {
                _this.elementRef.nativeElement.classList.remove('active');
            }
        };
        this.elementRef.nativeElement.addEventListener('click', fn);
        this.cleanup = function () {
            _this.elementRef.nativeElement.removeEventListener('click', fn);
        };
    };
    SwitchComponent.prototype.ngOnDestroy = function () {
        if (this.cleanup) {
            this.cleanup();
        }
    };
    SwitchComponent = __decorate([
        core_1.Component({
            selector: 'switch',
            template: "\n    <div class=\"scroller\" style=\"position:absolute;height:28px;width:62px;top:0;left:0\">\n      <div style=\"height:28px;width:17px;top:0;left:0;position:absolute;\"></div>\n      <div class=\"handle\" style=\"height:28px;width:28px;background: #fff;border:1px solid #ddd;border-radius: 100px;top:0;left:0px;position:absolute;-webkit-transition: all .2s ease;transition: all .2s ease;\"></div>\n      <div style=\"height:28px;width:17px;top:0;left:45px;position:absolute;\"></div>\n    </div>\n  ",
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
