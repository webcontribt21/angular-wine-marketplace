import {Pipe, PipeTransform} from '@angular/core';
import {KEYS_OF_TYPES} from '../constants';
import {ItemDetailType} from '../interfaces/Item-detail-type.interface';

@Pipe({
  name: 'sortByKeys',
})

export class SortByKeys implements PipeTransform {

  transform(value: ItemDetailType[], keys: any[] = []): ItemDetailType[] {
    if (value) {
      const result = [];
      KEYS_OF_TYPES.wines.forEach((el, index) => {
        const foundItem = value.find(item => item.description.toLowerCase() === el.toLowerCase());
        if (foundItem) {
          result[index] = foundItem;
        }
      });
      return result;
    } else {
      return [];
    }
  }

}
