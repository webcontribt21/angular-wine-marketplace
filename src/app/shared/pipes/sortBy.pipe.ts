import { Pipe, PipeTransform } from '@angular/core';
import { orderBy } from 'lodash';

import {Item} from '../interfaces/item.interface';

@Pipe({ name: 'sortBy' })
export class SortByPipe implements PipeTransform {

  transform(value: any[], column: string, order: any = 'asc'): Item[] {
    if (!value || !column || column === '') { return value; } // no array
    if (value.length <= 1) { return value; } // array with only one item
    return orderBy(value, [column], [order]);
  }
}

