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
var DistancePipe = (function () {
    function DistancePipe() {
    }
    DistancePipe.prototype.unpack = function (object) {
        var lat;
        var lng;
        if (object) {
            if (object["lat"] && object["lng"]) {
                lat = object["lat"];
                lng = object["lng"];
            }
            else if (object["latitude"] && object["longitude"]) {
                lat = object["latitude"];
                lng = object["longitude"];
            }
        }
        return {
            lat: lat || 0,
            lng: lng || 0
        };
    };
    DistancePipe.prototype.distance = function (from, to) {
        // Converts numeric degrees to radians
        var toRad = function (value) {
            return value * Math.PI / 180;
        };
        var R = 6371; // km
        var dLat = toRad(to.lat - from.lat);
        var dLng = toRad(to.lng - from.lng);
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(toRad(from.lat)) * Math.cos(toRad(to.lat));
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
        return d.toFixed(0);
    };
    DistancePipe.prototype.transform = function (from, to) {
        var f = this.unpack(from);
        var t = this.unpack(to);
        if ((!f.lat && !f.lng) || (!t.lat && !t.lng)) {
            return "";
        }
        var d = this.distance(f, t);
        return d + " miles";
    };
    DistancePipe = __decorate([
        core_1.Pipe({
            name: 'distance'
        }), 
        __metadata('design:paramtypes', [])
    ], DistancePipe);
    return DistancePipe;
}());
exports.DistancePipe = DistancePipe;
