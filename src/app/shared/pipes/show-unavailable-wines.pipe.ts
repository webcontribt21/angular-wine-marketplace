import { Pipe, PipeTransform } from '@angular/core';
import { Item } from '../interfaces/item.interface';

@Pipe({
  name: 'showUnavailableWines'
})
export class ShowUnavailableWinesPipe implements PipeTransform {
  transform(items: Item[], isShowUnavailableWines: boolean): Item[] {
    // if (items) {
    //   return items.filter((item: Item) => isShowAvailableVintages ? item : !!item.supplier.stockQty !== isShowAvailableVintages)
    // }

    if (items) {
      return items.filter((item: Item) => (isShowUnavailableWines ? true : item.supplier.stockQty > 0));
    }

    return [];
  }
}
