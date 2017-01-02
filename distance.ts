import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'distance'
})
export class DistancePipe implements PipeTransform {
  private unpack(object: any): any {
    let lat: number;
    let lng: number;

    if (object) {
      if (object["lat"] && object["lng"]) {
        lat = object["lat"];
        lng = object["lng"];
      } else if (object["latitude"] && object["longitude"]) {
        lat = object["latitude"];
        lng = object["longitude"];
      }
    }

    return {
      lat: lat || 0,
      lng: lng || 0
    };
  }

  private distance(from: any, to: any) {
    // Converts numeric degrees to radians
    let toRad = (value: number) => {
      return value * Math.PI / 180;
    };

    let R = 6371; // km
    let dLat = toRad(to.lat - from.lat);
    let dLng = toRad(to.lng - from.lng);

    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(toRad(from.lat)) * Math.cos(toRad(to.lat));
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = R * c;
    return d.toFixed(0);
  }

  transform(from: any, to: any): string {
    let f = this.unpack(from);
    let t = this.unpack(to);

    if ((!f.lat && !f.lng) || (!t.lat && !t.lng)) {
      return "";
    }

    let d = this.distance(f, t);

    return `${d} miles away`;
  }
}
