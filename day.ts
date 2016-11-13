import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
	name: 'day'
})
export class DayPipe implements PipeTransform {
  private datePipe: DatePipe = new DatePipe('en-US');
  private timezone = new Date().getTimezoneOffset() * 60 * 1000;  // timezone offset in ms
  private today: number = (Math.floor((Date.now() - this.timezone) / 86400000) * 86400000) + this.timezone + 86400000;  // today's timestamp at 00:00 UTC, in ms + 1 day
  private tomorrow: number = this.today + 86400000;

  transform(input: any, pattern?: string): string {
    if (!input) {
      return '';
    }
    if (!pattern) {
      pattern = 'd MMM';
    }
    if (input < 1000000000000) {
      input *= 1000;  // convert to ms
    }
    if (input < this.today) {
      return 'Today, ' + this.datePipe.transform(new Date(input), pattern);
    }
    if (input < this.tomorrow) {
      return 'Tomorrow, ' + this.datePipe.transform(new Date(input), pattern);
    }

    return this.datePipe.transform(new Date(input), 'EEE, ' + pattern);
  }
}
