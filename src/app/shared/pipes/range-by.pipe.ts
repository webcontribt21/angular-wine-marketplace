import {Pipe, PipeTransform} from '@angular/core';
import {Item} from '../interfaces/item.interface';

@Pipe({
  name: 'rangeBy',
})

export class RangeByPipe implements PipeTransform {

  transform(items: Item[], rangeValues: number[]): Item[] {
    const [min, max] = rangeValues;

    if (items) {
      return items.filter((item: Item) => item.price >= min && item.price <= max)
    }

    return [];
  }

}
