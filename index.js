"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var actionsheet_1 = require("./actionsheet");
var lazyload_1 = require("./lazyload");
var loading_1 = require("./loading");
var scroll_1 = require("./scroll");
var switch_1 = require("./switch");
var statusbar_1 = require("./statusbar");
var textarea_1 = require("./textarea");
var day_1 = require("./day");
var name_1 = require("./name");
var distance_1 = require("./distance");
var tooltip_1 = require("./tooltip");
var AchromaticModule = /** @class */ (function () {
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
                scroll_1.ScrollDirective,
                switch_1.SwitchComponent,
                statusbar_1.StatusbarComponent,
                textarea_1.TextareaDirective,
                day_1.DayPipe,
                name_1.NamePipe,
                distance_1.DistancePipe,
                tooltip_1.Tooltip,
                tooltip_1.TooltipContent
            ],
            exports: [
                actionsheet_1.ActionsheetComponent,
                lazyload_1.LazyloadDirective,
                loading_1.LoadingComponent,
                scroll_1.ScrollDirective,
                switch_1.SwitchComponent,
                statusbar_1.StatusbarComponent,
                textarea_1.TextareaDirective,
                day_1.DayPipe,
                name_1.NamePipe,
                distance_1.DistancePipe,
                tooltip_1.Tooltip,
                tooltip_1.TooltipContent
            ],
            entryComponents: [
                tooltip_1.TooltipContent
            ]
        })
    ], AchromaticModule);
    return AchromaticModule;
}());
exports.AchromaticModule = AchromaticModule;
