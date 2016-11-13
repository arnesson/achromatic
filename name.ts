import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'name'
})
export class NamePipe implements PipeTransform {
  transform(input: any): string {
    if (!input) {
      return '';
    }
    return input.split(" ")[0];
  }
}
