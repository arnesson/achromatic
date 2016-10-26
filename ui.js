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
var actionsheet_1 = require('./ui/actionsheet');
var avatar_1 = require('./ui/avatar');
var cover_1 = require('./ui/cover');
var loading_1 = require('./ui/loading');
var notify_1 = require('./ui/notify');
var scroll_1 = require('./ui/scroll');
var carousel_1 = require('./ui/carousel');
var switch_1 = require('./ui/switch');
var statusbar_1 = require('./ui/statusbar');
var UIModule = (function () {
    function UIModule() {
    }
    UIModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule
            ],
            declarations: [
                actionsheet_1.ActionsheetComponent,
                avatar_1.AvatarDirective,
                cover_1.CoverDirective,
                loading_1.LoadingComponent,
                notify_1.NotifyComponent,
                scroll_1.ScrollDirective,
                carousel_1.CarouselComponent,
                switch_1.SwitchComponent,
                statusbar_1.StatusbarComponent
            ],
            exports: [
                actionsheet_1.ActionsheetComponent,
                avatar_1.AvatarDirective,
                cover_1.CoverDirective,
                loading_1.LoadingComponent,
                notify_1.NotifyComponent,
                scroll_1.ScrollDirective,
                carousel_1.CarouselComponent,
                switch_1.SwitchComponent,
                statusbar_1.StatusbarComponent
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], UIModule);
    return UIModule;
}());
exports.UIModule = UIModule;
