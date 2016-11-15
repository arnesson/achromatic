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
var common_1 = require('@angular/common');
var actionsheet_1 = require('./actionsheet');
var lazyload_1 = require('./lazyload');
var loading_1 = require('./loading');
var notify_1 = require('./notify');
var scroll_1 = require('./scroll');
var carousel_1 = require('./carousel');
var switch_1 = require('./switch');
var statusbar_1 = require('./statusbar');
var textarea_1 = require('./textarea');
var day_1 = require('./day');
var name_1 = require('./name');
var AchromaticModule = (function () {
    function AchromaticModule() {
    }
    AchromaticModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule
            ],
            declarations: [
                actionsheet_1.ActionsheetComponent,
                lazyload_1.LazyloadDirective,
                loading_1.LoadingComponent,
                notify_1.NotifyComponent,
                scroll_1.ScrollDirective,
                carousel_1.CarouselComponent,
                switch_1.SwitchComponent,
                statusbar_1.StatusbarComponent,
                textarea_1.TextareaDirective,
                day_1.DayPipe,
                name_1.NamePipe
            ],
            exports: [
                actionsheet_1.ActionsheetComponent,
                lazyload_1.LazyloadDirective,
                loading_1.LoadingComponent,
                notify_1.NotifyComponent,
                scroll_1.ScrollDirective,
                carousel_1.CarouselComponent,
                switch_1.SwitchComponent,
                statusbar_1.StatusbarComponent,
                textarea_1.TextareaDirective,
                day_1.DayPipe,
                name_1.NamePipe
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], AchromaticModule);
    return AchromaticModule;
}());
exports.AchromaticModule = AchromaticModule;
