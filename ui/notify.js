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
var NotifyComponent = (function () {
    function NotifyComponent() {
        this.queue = [];
    }
    NotifyComponent.prototype.publish = function (message, options, default_classname) {
        var max_slots = 5;
        var slot = 0;
        var expires = options && options.expires || 0;
        var notification = {
            message: message,
            active: true,
            classname: options && options.classname || default_classname,
            timeout: 0
        };
        if (expires) {
            notification.timeout = setTimeout(function () {
                notification.active = false;
            }, (expires) + 500);
        }
        for (slot = 0; slot < max_slots; slot++) {
            if (this.queue[slot] && this.queue[slot].active && this.queue[slot].message === notification.message) {
                return; // duplicate notification
            }
        }
        for (slot = 0; slot < max_slots; slot++) {
            if (!this.queue[slot] || !this.queue[slot].active) {
                this.queue[slot] = notification;
                return this.queue[slot];
            }
        }
    };
    NotifyComponent.prototype.success = function (message, options) {
        this.publish(message, options, "btn-block");
    };
    NotifyComponent.prototype.info = function (message, options) {
        this.publish(message, options, "btn-block");
    };
    NotifyComponent.prototype.warning = function (message, options) {
        this.publish(message, options, "btn-block");
    };
    NotifyComponent.prototype.error = function (message, options) {
        this.publish(message, options, "btn-block");
    };
    NotifyComponent.prototype.clear = function () {
        this.queue = [];
    };
    NotifyComponent = __decorate([
        core_1.Component({
            selector: 'notify',
            template: "\n    <div *ngFor=\"let notification of queue\" [ngClass]=\"{active: notification.active}\" class=\"notify alert {{notification.classname}}\">{{notification.message}}</div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], NotifyComponent);
    return NotifyComponent;
}());
exports.NotifyComponent = NotifyComponent;
