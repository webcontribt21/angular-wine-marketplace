import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'valueDescription'
})
export class ValueDescriptionPipe implements PipeTransform {

  transform(itemDetails: any, ...args: any[]): any {
    const item = (itemDetails || []).find(f => f.itemDetailTypeNo === args[0]);
    return item && item.valueFromType && item.valueFromType.description;
  }

}
