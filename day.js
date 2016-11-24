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
var DayPipe = (function () {
    function DayPipe() {
        this.datePipe = new common_1.DatePipe('en-US');
        this.timezone = new Date().getTimezoneOffset() * 60 * 1000; // timezone offset in ms
        this.today = (Math.floor((Date.now() - this.timezone) / 86400000) * 86400000) + this.timezone + 86400000; // today's timestamp at 00:00 UTC, in ms + 1 day
        this.tomorrow = this.today + 86400000;
    }
    DayPipe.prototype.transform = function (input, pattern) {
        if (!input) {
            return '';
        }
        if (!pattern) {
            pattern = 'd MMM';
        }
        if (input < 1000000000000) {
            input *= 1000; // convert to ms
        }
        if (input < this.today) {
            return 'Today, ' + this.datePipe.transform(new Date(input), pattern);
        }
        if (input < this.tomorrow) {
            return 'Tomorrow, ' + this.datePipe.transform(new Date(input), pattern);
        }
        return this.datePipe.transform(new Date(input), 'EEE, ' + pattern);
    };
    DayPipe = __decorate([
        core_1.Pipe({
            name: 'day'
        }), 
        __metadata('design:paramtypes', [])
    ], DayPipe);
    return DayPipe;
}());
exports.DayPipe = DayPipe;
