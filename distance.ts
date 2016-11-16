import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'distance'
})
export class DistancePipe implements PipeTransform {
  private unpack(object_or_array: Array<number> | Object): Object {
    let lat: number;
    let lng: number;

    for (let i in object_or_array) {
      if (!lat) {
        lat = (<any>object_or_array)[i];
      } else if (!lng) {
        lng = (<any>object_or_array)[i];
      } else {
        break;
      }
    }

    return {
      lat: lat || 0,
      lng: lng || 0
    };
  }

  private calculate(from: any, to: any) {
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

  transform(from: Array<number> | Object, to: Array<string | number> | Object): string {
    let distance = this.calculate(this.unpack(from), this.unpack(to));

    return `${distance} miles away`;
  }
}
